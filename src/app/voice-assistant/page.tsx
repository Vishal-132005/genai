
'use client';

import { useState, type FormEvent, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { voiceAssistant, type VoiceAssistantInput, type VoiceAssistantOutput } from '@/ai/flows/voice-assistant-flow';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mic, Send, Sparkles, MicOff, Volume2, StopCircle, User, Bot } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from '@/contexts/AuthContext';
import { saveChatMessage, getChatHistory, type ChatMessage as StoredChatMessage } from '@/lib/firestoreService';
import { Timestamp } from 'firebase/firestore';
import { ScrollArea } from '@/components/ui/scroll-area';

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface DisplayMessage {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  timestamp?: string;
}

export default function VoiceAssistantPage() {
  const { user } = useAuth();
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [chatMessages, setChatMessages] = useState<DisplayMessage[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechApiSupported, setSpeechApiSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (user) {
      fetchHistory();
    } else {
      setChatMessages([]); // Clear history if user logs out
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const formatFirestoreTimestamp = (timestamp: Timestamp | Date | undefined): string => {
    if (!timestamp) return '';
    let date: Date;
    if (timestamp instanceof Timestamp) {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      // Try to parse if it's a string or number, though Firestore usually gives Timestamps
      try {
        date = new Date(timestamp as any);
      } catch {
        return 'Invalid Date';
      }
    }
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


  const fetchHistory = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const history = await getChatHistory(user.uid);
      const formattedHistory: DisplayMessage[] = history.flatMap(msg => [
        { id: `${msg.id}-user`, type: 'user', text: msg.userInput, timestamp: formatFirestoreTimestamp(msg.timestamp) },
        { id: `${msg.id}-assistant`, type: 'assistant', text: msg.assistantResponse, timestamp: formatFirestoreTimestamp(msg.timestamp) }
      ]);
      setChatMessages(formattedHistory);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      toast({ title: 'Error', description: 'Could not load chat history.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthesisRef.current = window.speechSynthesis;
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognitionAPI) {
        setSpeechApiSupported(false);
        toast({
          title: 'Speech Recognition Not Supported',
          description: 'Your browser does not support speech recognition. You can still type your messages.',
          variant: 'destructive',
        });
        return;
      }

      if (!recognitionRef.current) {
        const recognitionInstance = new SpeechRecognitionAPI();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;

        recognitionInstance.onstart = () => setIsRecording(true);

        recognitionInstance.onresult = (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript.trim();
          setUserInput(transcript);
          if (transcript) {
            void handleSubmit(undefined, transcript);
          }
        };

        recognitionInstance.onerror = (event) => {
          if (event.error !== 'network' && event.error !== 'no-speech' && event.error !== 'aborted') {
             console.error('Speech recognition error:', event.error, event.message);
          }
          let errorMsg = 'An error occurred during speech recognition.';
          if (event.error === 'no-speech') errorMsg = 'No speech was detected. Please try speaking louder or clearer.';
          else if (event.error === 'audio-capture') errorMsg = 'Microphone problem. Ensure it is connected and enabled.';
          else if (event.error === 'not-allowed') errorMsg = 'Microphone access denied. Please enable permissions.';
          else if (event.error === 'network') errorMsg = 'Network error during speech recognition. Check connection.';
          else if (event.error !== 'aborted') errorMsg = `Speech recognition error: ${event.error}. Please try again.`;
          
          if (event.error !== 'aborted') { // Don't toast on manual abort
            toast({ title: 'Speech Error', description: errorMsg, variant: 'destructive' });
          }
          setIsRecording(false);
        };
        recognitionInstance.onend = () => setIsRecording(false);
        recognitionRef.current = recognitionInstance;
      }
    }
    return () => {
      if (synthesisRef.current) synthesisRef.current.cancel();
      if (recognitionRef.current) recognitionRef.current.abort();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const speakResponse = (text: string) => {
    if (synthesisRef.current && speechApiSupported && text) {
      synthesisRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        toast({ title: 'Speech Error', description: 'Could not play assistant response.', variant: 'destructive' });
        setIsSpeaking(false);
      };
      synthesisRef.current.speak(utterance);
    }
  };

  const handleMicClick = async () => {
    if (!speechApiSupported || !user) {
      toast({ title: !user ? 'Not Logged In' : 'Speech API Issue', description: !user ? 'Please log in to use voice assistant.' : 'Speech recognition not supported or not ready.', variant: 'destructive' });
      return;
    }
    if (!recognitionRef.current) {
      toast({ title: 'Initialization Error', description: 'Speech recognition service is not ready.', variant: 'destructive' });
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setUserInput('');
      if (synthesisRef.current) synthesisRef.current.cancel();
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Error starting recognition:", error);
        let message = 'Could not start voice recording. Check permissions and ensure mic is not in use.';
         if (error instanceof DOMException) {
            if (error.name === 'NotAllowedError') message = 'Microphone access denied. Please enable permissions.';
            else if (error.name === 'InvalidStateError') message = 'Voice recognition is already active. Please try again.';
        }
        toast({ title: 'Mic Start Error', description: message, variant: 'destructive' });
        setIsRecording(false);
      }
    }
  };

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>, textOverride?: string) => {
    if (e) e.preventDefault();
    const currentInput = textOverride || userInput;

    if (!user) {
      toast({ title: 'Not Authenticated', description: 'Please log in to use the voice assistant.', variant: 'destructive' });
      return;
    }
    if (!currentInput.trim()) {
      if (!textOverride) toast({ title: 'Empty Input', description: 'Please type or say something.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    const newUserMessage: DisplayMessage = { id: `temp-user-${Date.now()}`, type: 'user', text: currentInput, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, newUserMessage]);
    setUserInput(''); // Clear input after sending

    try {
      const input: VoiceAssistantInput = { userInput: currentInput };
      const result: VoiceAssistantOutput = await voiceAssistant(input);
      
      speakResponse(result.assistantResponse);
      await saveChatMessage(user.uid, currentInput, result.assistantResponse);
      // Fetch history again to get the actual stored message with its ID and server timestamp
      // Or, for optimistic update, create assistant message with temp ID and update later
      const newAssistantMessage: DisplayMessage = { id: `temp-assistant-${Date.now()}`, type: 'assistant', text: result.assistantResponse, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setChatMessages(prev => [...prev.filter(m => m.id !== newUserMessage.id), // remove temp user message if we want to replace with server one
                                  {...newUserMessage, id: `user-${Date.now()}`}, // make user id more permanent for key
                                  newAssistantMessage]);
      // For a more robust solution, you'd fetch history or get the saved doc ID back
      // For now, simple optimistic update and local display. Let's fetch history to be robust.
      fetchHistory();


    } catch (error) {
      console.error('Error with voice assistant:', error);
      toast({ title: 'Assistant Error', description: 'Failed to get a response. Please try again.', variant: 'destructive' });
      setChatMessages(prev => [...prev, { id: `error-${Date.now()}`, type: 'assistant', text: "Sorry, I couldn't process that." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] space-y-4"> {/* Adjust height as needed */}
      <header className="text-center shrink-0">
        <h1 className="text-4xl font-bold font-headline text-primary">Voice Assistant</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Talk to your AI assistant. Click the mic to speak.
        </p>
      </header>

      {!speechApiSupported && (
         <Alert variant="destructive" className="max-w-2xl mx-auto shrink-0">
            <MicOff className="h-5 w-5" />
            <AlertTitle>Speech API Not Supported</AlertTitle>
            <AlertDescription>
              Your browser does not support the Speech APIs. Voice interaction is disabled.
            </AlertDescription>
        </Alert>
      )}

      <Card className="flex-grow flex flex-col shadow-xl bg-card/80 backdrop-blur-sm overflow-hidden">
        <CardHeader className="shrink-0">
          <CardTitle className="font-headline text-2xl flex items-center">
            {isRecording ? <MicOff className="mr-2 h-6 w-6 text-red-500 animate-pulse" /> : <Mic className="mr-2 h-6 w-6" />}
            Chat
          </CardTitle>
        </CardHeader>
        <CardContent ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-4">
          <ScrollArea className="h-full w-full pr-4">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={cn("flex mb-3", msg.type === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={cn(
                  "max-w-[70%] p-3 rounded-xl shadow",
                  msg.type === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted text-muted-foreground rounded-bl-none'
                )}>
                  <div className="flex items-center gap-2 mb-1">
                    {msg.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    <span className="text-xs opacity-80">{msg.timestamp}</span>
                  </div>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
             {isLoading && chatMessages.length > 0 && (
              <div className="flex justify-start mb-3">
                  <div className="max-w-[70%] p-3 rounded-xl shadow bg-muted text-muted-foreground rounded-bl-none">
                      <div className="flex items-center gap-2 mb-1">
                          <Bot className="h-4 w-4" />
                          <span className="text-xs opacity-80">Typing...</span>
                      </div>
                      <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
              </div>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t shrink-0">
          <form onSubmit={handleSubmit} className="w-full flex gap-2 items-center">
            <Input
              id="userInput"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={isRecording ? "Listening..." : "Type or click mic..."}
              required
              className="flex-grow"
              disabled={(isLoading && !isRecording) || !user}
            />
            <Button
              type="button"
              onClick={handleMicClick}
              disabled={!speechApiSupported || (isLoading && !isRecording) || !user || isSpeaking}
              size="icon"
              variant={isRecording ? "destructive" : "outline"}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              {isRecording ? <StopCircle className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Button type="submit" disabled={isLoading || isRecording || !user || !userInput.trim()} size="icon" aria-label="Send message">
              {(isLoading && !isRecording) ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
