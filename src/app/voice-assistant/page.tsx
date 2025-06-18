
'use client';

import { useState, type FormEvent, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { voiceAssistant, type VoiceAssistantInput, type VoiceAssistantOutput } from '@/ai/flows/voice-assistant-flow';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mic, Send, Sparkles, MicOff, Volume2, StopCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function VoiceAssistantPage() {
  const [userInput, setUserInput] = useState('');
  const [assistantResponse, setAssistantResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechApiSupported, setSpeechApiSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognitionAPI) {
        setSpeechApiSupported(false);
        toast({
          title: 'Speech Recognition Not Supported',
          description: 'Your browser does not support speech recognition.',
          variant: 'destructive',
        });
        return;
      }

      if (!recognitionRef.current) {
        const recognitionInstance = new SpeechRecognitionAPI();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;

        recognitionInstance.onstart = () => {
          setIsRecording(true);
        };

        recognitionInstance.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setUserInput(transcript);
          // Automatically submit after result
          void handleSubmit(undefined, transcript); 
        };

        recognitionInstance.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          let errorMsg = 'An error occurred during speech recognition.';
          if (event.error === 'no-speech') {
            errorMsg = 'No speech was detected. Please try again.';
          } else if (event.error === 'audio-capture') {
            errorMsg = 'Microphone problem. Ensure it is connected and enabled.';
          } else if (event.error === 'not-allowed') {
            errorMsg = 'Microphone access denied. Please enable microphone permissions in your browser settings.';
          }
          toast({
            title: 'Speech Error',
            description: errorMsg,
            variant: 'destructive',
          });
          setIsRecording(false);
        };

        recognitionInstance.onend = () => {
          setIsRecording(false);
        };
        recognitionRef.current = recognitionInstance;
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        speechSynthesis.cancel();
      }
      recognitionRef.current?.abort(); // Abort any ongoing recognition
      recognitionRef.current = null; // Clean up
    };
  }, [toast]);

  useEffect(() => {
    if (assistantResponse && typeof window !== 'undefined' && speechApiSupported) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(assistantResponse);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        toast({
          title: 'Speech Error',
          description: 'Could not play assistant response.',
          variant: 'destructive',
        });
        setIsSpeaking(false);
      };
      speechSynthesis.speak(utterance);
    }
  }, [assistantResponse, speechApiSupported, toast]);

  const handleMicClick = async () => {
    if (!speechApiSupported) {
      toast({
        title: 'Speech Recognition Not Supported',
        description: 'Your browser does not support speech recognition.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!recognitionRef.current) {
        toast({
          title: 'Initialization Error',
          description: 'Speech recognition service is not ready. Please refresh the page.',
          variant: 'destructive',
        });
        return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setUserInput('');
      setAssistantResponse(null);
      speechSynthesis.cancel();
      try {
        // Check for permissions before starting, or let the browser handle it.
        // For simplicity, we let the browser prompt if not already granted.
        // More robust handling involves navigator.permissions.query({ name: 'microphone' })
        recognitionRef.current.start();
      } catch (error) {
        console.error("Error starting recognition:", error);
        // This catch handles immediate errors if .start() fails synchronously
        if ((error as DOMException).name === 'NotAllowedError') {
             toast({
                title: 'Microphone Access Denied',
                description: 'Please enable microphone permissions in your browser settings.',
                variant: 'destructive',
            });
        } else {
            toast({
                title: 'Mic Error',
                description: 'Could not start voice recording. Please check microphone permissions and ensure it is not in use by another application.',
                variant: 'destructive',
            });
        }
        setIsRecording(false); // Ensure state consistency
      }
    }
  };

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>, textOverride?: string) => {
    if (e) e.preventDefault();
    const currentInput = textOverride || userInput;

    if (!currentInput.trim()) {
      if (!textOverride) { // Only toast for manual empty submits
        toast({
          title: 'Empty Input',
          description: 'Please type or say something for the assistant.',
          variant: 'destructive',
        });
      }
      return;
    }

    setIsLoading(true);
    setAssistantResponse(null); 

    try {
      const input: VoiceAssistantInput = { userInput: currentInput };
      const result: VoiceAssistantOutput = await voiceAssistant(input);
      setAssistantResponse(result.assistantResponse);
    } catch (error) {
      console.error('Error with voice assistant:', error);
      toast({
        title: 'Assistant Error',
        description: 'Failed to get a response from the assistant. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setUserInput(''); // Clear input after submission for "live talk" feel
    }
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Voice Assistant</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Talk to your AI assistant. Click the mic to speak.
        </p>
      </header>

      {!speechApiSupported && (
         <Alert variant="destructive" className="max-w-2xl mx-auto">
            <MicOff className="h-5 w-5" />
            <AlertTitle>Speech API Not Supported</AlertTitle>
            <AlertDescription>
              Your browser does not support the necessary Speech Recognition or Synthesis APIs. 
              Please try a different browser like Chrome or Edge. Voice interaction will be disabled.
            </AlertDescription>
        </Alert>
      )}

      <Card className="max-w-2xl mx-auto shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            {isRecording ? <MicOff className="mr-2 h-6 w-6 text-red-500 animate-pulse" /> : <Mic className="mr-2 h-6 w-6" />} 
            Chat with AI
          </CardTitle>
          <CardDescription>
            Click the microphone to speak, or type your message and press Send/Enter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userInput">Your Message</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="userInput"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={isRecording ? "Listening..." : "Type or click mic to speak..."}
                  required
                  className="flex-grow"
                  disabled={isRecording || isLoading}
                />
                <Button 
                  type="button" 
                  onClick={handleMicClick} 
                  disabled={!speechApiSupported || isLoading} 
                  size="icon" 
                  variant={isRecording ? "destructive" : "outline"}
                  aria-label={isRecording ? "Stop recording" : "Start recording"}
                >
                  {isRecording ? <StopCircle className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                <Button type="submit" disabled={isLoading || isRecording} size="icon" aria-label="Send message">
                  {isLoading && !isRecording ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg text-muted-foreground">Assistant is thinking...</p>
        </div>
      )}

      {assistantResponse && (
        <Card className="max-w-2xl mx-auto shadow-xl mt-8 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline text-xl text-primary flex items-center">
              {isSpeaking ? <Volume2 className="mr-2 h-5 w-5 animate-pulse" /> : <Sparkles className="mr-2 h-5 w-5" />} 
              Assistant&apos;s Response
            </CardTitle>
          </CardHeader>
          <CardContent>
             <Alert className="bg-primary/10 border-primary/30">
                <Mic className="h-5 w-5 text-primary opacity-70" /> {/* Static icon here or could be ChatBubble */}
                <AlertDescription className="text-primary/90 whitespace-pre-wrap">
                    {assistantResponse}
                </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

