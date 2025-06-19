
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateNotes, type GenerateNotesInput, type GenerateNotesOutput } from '@/ai/flows/generate-notes-flow';
import { chatWithNotes, type ChatWithNotesInput, type ChatWithNotesOutput } from '@/ai/flows/chatWithNotesFlow';
import { useToast } from '@/hooks/use-toast';
import { Loader2, NotebookText, Sparkles, Download, MessageCircle, Send, History, Eye, MessageSquarePlus, Quote } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useAuth } from '@/contexts/AuthContext';
import { saveGeneratedNote, getGeneratedNotesHistory, type StoredGeneratedNote } from '@/lib/firestoreService';
import { cn } from '@/lib/utils';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function GenerateNotesPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [topicOrPlanDetails, setTopicOrPlanDetails] = useState('');
  const [generatedNotes, setGeneratedNotes] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const notesContentRef = useRef<HTMLDivElement>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentChatMessage, setCurrentChatMessage] = useState('');
  const [isChatting, setIsChatting] = useState(false);
  const chatScrollAreaRef = useRef<HTMLDivElement>(null);

  const [historicalNotes, setHistoricalNotes] = useState<StoredGeneratedNote[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [currentViewedNoteId, setCurrentViewedNoteId] = useState<string | null>(null);

  const [selectedTextFromNote, setSelectedTextFromNote] = useState<string | null>(null);


  const fetchHistoricalNotes = useCallback(async () => {
    if (!user) return;
    setIsLoadingHistory(true);
    try {
      const notes = await getGeneratedNotesHistory(user.uid);
      setHistoricalNotes(notes);
    } catch (error) {
      console.error('Error fetching notes history:', error);
      toast({ title: 'Error Fetching History', description: 'Could not load your notes history.', variant: 'destructive' });
    } finally {
      setIsLoadingHistory(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (user) {
      fetchHistoricalNotes();
    } else {
      setHistoricalNotes([]);
    }
  }, [user, fetchHistoricalNotes]);


  useEffect(() => {
    const topicParam = searchParams.get('topicOrPlanDetails');
    if (topicParam) {
      setTopicOrPlanDetails(decodeURIComponent(topicParam));
    }
  }, [searchParams]);

  useEffect(() => {
    if (chatScrollAreaRef.current) {
      chatScrollAreaRef.current.scrollTo({ top: chatScrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleGenerateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topicOrPlanDetails.trim()) {
      toast({
        title: 'Empty Input',
        description: 'Please enter some topics or plan details to generate notes for.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setGeneratedNotes(null);
    setChatMessages([]); 
    setCurrentViewedNoteId(null); 
    setSelectedTextFromNote(null);
    try {
      const input: GenerateNotesInput = { topicOrPlanDetails };
      const result: GenerateNotesOutput = await generateNotes(input);
      setGeneratedNotes(result.generatedNotes);
      if (user) {
        try {
          await saveGeneratedNote(user.uid, { topicOrPlanDetails, generatedNotes: result.generatedNotes });
          toast({ title: "Notes Saved", description: "Your generated notes have been saved to history."});
          fetchHistoricalNotes(); 
        } catch (saveError) {
           console.error('Error saving notes:', saveError);
           toast({ title: 'Save Error', description: 'Could not save notes to history.', variant: 'destructive' });
        }
      }
    } catch (error) {
      console.error('Error generating notes:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate notes. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!notesContentRef.current || !generatedNotes) {
      toast({
        title: 'Error',
        description: 'Notes content not found for PDF generation.',
        variant: 'destructive',
      });
      return;
    }
    setIsDownloadingPdf(true);
    try {
      const element = notesContentRef.current;
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: null, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth - 20; 
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      let currentPdfHeight = pdf.internal.pageSize.getHeight();
      let heightLeft = imgHeight;
      let position = 10; 
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= (currentPdfHeight - 20); 
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 10; 
        pdf.addPage();
        currentPdfHeight = pdf.internal.pageSize.getHeight(); 
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight); 
        heightLeft -= (currentPdfHeight - 20);
      }
      pdf.save('study-notes.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'PDF Generation Failed',
        description: 'Could not generate PDF. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentChatMessage.trim() || !generatedNotes) return;

    const newUserMessage: ChatMessage = { role: 'user', content: currentChatMessage };
    setChatMessages(prev => [...prev, newUserMessage]);
    setCurrentChatMessage('');
    setIsChatting(true);
    setSelectedTextFromNote(null); // Clear selection after sending message

    try {
      const input: ChatWithNotesInput = { notesContent: generatedNotes, userQuestion: newUserMessage.content };
      const result: ChatWithNotesOutput = await chatWithNotes(input);
      const newAssistantMessage: ChatMessage = { role: 'assistant', content: result.answer };
      setChatMessages(prev => [...prev, newAssistantMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage: ChatMessage = { role: 'assistant', content: 'Sorry, I encountered an error trying to respond.' };
      setChatMessages(prev => [...prev, errorMessage]);
      toast({ title: 'Chat Error', description: 'Failed to get a response from the assistant.', variant: 'destructive' });
    } finally {
      setIsChatting(false);
    }
  };
  
  const handleViewHistoricalNote = (note: StoredGeneratedNote) => {
    setTopicOrPlanDetails(note.topicOrPlanDetails);
    setGeneratedNotes(note.generatedNotes);
    setChatMessages([]); 
    setCurrentViewedNoteId(note.id);
    setSelectedTextFromNote(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const formatFirestoreTimestamp = (timestampInput: string | Date | undefined): string => {
    if (!timestampInput) return 'N/A';
    try {
      const dateObj = new Date(timestampInput);
      if (isNaN(dateObj.getTime())) {
        return 'Invalid Date';
      }
      return dateObj.toLocaleString();
    } catch {
      return 'Invalid Date';
    }
  };

  const handleNoteTextSelection = () => {
    if (notesContentRef.current) {
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();
      if (selectedText && selectedText.length > 0) {
        setSelectedTextFromNote(selectedText);
      } else {
        setSelectedTextFromNote(null);
      }
    }
  };

  const handleUseSelectionInChat = () => {
    if (selectedTextFromNote) {
      setCurrentChatMessage(prevMessage => 
        `Regarding the selection: "${selectedTextFromNote}"\n\n${prevMessage}`.trim()
      );
      // Programmatically focus the input field
      const chatInput = document.getElementById('chat-input');
      if(chatInput) chatInput.focus();
      setSelectedTextFromNote(null); // Hide the button after use
    }
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">AI Note Generator</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Provide topics, get notes, chat about selections, and review your note history.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        <Card className="md:col-span-1 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Generate Study Notes</CardTitle>
            <CardDescription>Enter topics or plan details. You can also start from a study plan item.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerateSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topicOrPlanDetails">Topics / Plan Details</Label>
                <Textarea
                  id="topicOrPlanDetails"
                  value={topicOrPlanDetails}
                  onChange={(e) => setTopicOrPlanDetails(e.target.value)}
                  placeholder="e.g., Key concepts of Photosynthesis, Chapter 1-3 of World History..."
                  required
                  className="min-h-[150px]"
                />
              </div>
              <Button type="submit" disabled={isLoading || isDownloadingPdf || !user} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {user ? "Generate & Save Notes" : "Login to Generate Notes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {user && (
          <Card className="md:col-span-2 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center"><History className="mr-2 h-6 w-6" />Notes History</CardTitle>
              <CardDescription>Review your previously generated notes.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingHistory && <div className="flex justify-center py-4"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
              {!isLoadingHistory && historicalNotes.length === 0 && <p className="text-muted-foreground text-center py-4">No notes history found.</p>}
              {!isLoadingHistory && historicalNotes.length > 0 && (
                <ScrollArea className="h-72">
                  <ul className="space-y-3 pr-4">
                    {historicalNotes.map((note) => (
                      <li key={note.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-md hover:bg-muted/50 transition-colors gap-2">
                        <div>
                          <p className="font-medium truncate max-w-xs" title={note.topicOrPlanDetails}>{note.topicOrPlanDetails}</p>
                          <p className="text-xs text-muted-foreground">
                            Date: {formatFirestoreTimestamp(note.createdAt)}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleViewHistoricalNote(note)} className="mt-2 sm:mt-0 shrink-0">
                          <Eye className="mr-2 h-4 w-4" /> View Note
                        </Button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        )}
      </div>


      {isLoading && !generatedNotes && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg text-muted-foreground">Generating notes...</p>
        </div>
      )}

      {generatedNotes && (
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Card className="shadow-xl bg-card/80 backdrop-blur-sm md:col-span-1">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">
                {currentViewedNoteId ? "Viewing Historical Note" : "Generated Notes"}
              </CardTitle>
               {currentViewedNoteId && historicalNotes.find(n=>n.id === currentViewedNoteId) && (
                <CardDescription>Topic: {historicalNotes.find(n=>n.id === currentViewedNoteId)?.topicOrPlanDetails}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <Alert className="mb-6 bg-primary/10 border-primary/30">
                <NotebookText className="h-5 w-5 text-primary" />
                <AlertTitle className="font-headline text-primary">Notes Ready!</AlertTitle>
                <AlertDescription className="text-primary/80">
                  Select text in the notes below and click "Use Selection" to focus your chat questions.
                </AlertDescription>
              </Alert>
              <ScrollArea className="h-[500px] pr-4">
                <div 
                  ref={notesContentRef} 
                  className="prose dark:prose-invert max-w-none p-4 bg-muted/50 rounded-md border select-text"
                  onMouseUp={handleNoteTextSelection}
                >
                  <ReactMarkdown>{generatedNotes}</ReactMarkdown>
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button onClick={handleDownloadPdf} disabled={isDownloadingPdf || isLoading} className="w-full mt-4">
                {isDownloadingPdf ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                Download as PDF
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-xl bg-card/80 backdrop-blur-sm md:col-span-1 flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-accent flex items-center">
                <MessageSquarePlus className="mr-2 h-6 w-6" /> Chat with Your Notes
              </CardTitle>
              <CardDescription>Ask questions. Select text from notes and click "Use Selection" to add context.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col space-y-4 overflow-hidden">
              <ScrollArea className="flex-grow h-0 min-h-[300px] border rounded-md p-4 bg-muted/30" ref={chatScrollAreaRef}>
                {chatMessages.length === 0 && <p className="text-muted-foreground text-center py-4">No messages yet. Ask a question below!</p>}
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "mb-3 p-3 rounded-lg max-w-[85%] break-words",
                      msg.role === 'user' 
                        ? 'bg-primary/90 text-primary-foreground ml-auto rounded-br-none shadow-md' 
                        : 'bg-accent/80 text-accent-foreground mr-auto rounded-bl-none shadow-md'
                    )}
                  >
                    <ReactMarkdown
                      components={{ 
                        p: ({node, ...props}) => <p className="mb-0 text-sm" {...props} />
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                ))}
                {isChatting && (
                  <div className="flex justify-start items-center p-2">
                    <Loader2 className="h-5 w-5 animate-spin text-accent" /> 
                    <span className="ml-2 text-sm text-accent">Assistant is typing...</span>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 border-t flex flex-col items-start gap-2">
              {selectedTextFromNote && (
                <div className="w-full flex items-center gap-2 mb-2 p-2 border rounded-md bg-primary/10">
                    <Quote className="h-5 w-5 text-primary shrink-0" />
                    <p className="text-sm text-primary/90 truncate flex-grow italic">Selected: "{selectedTextFromNote}"</p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleUseSelectionInChat}
                        className="shrink-0"
                    >
                        <MessageCircle className="mr-2 h-4 w-4" /> Use Selection
                    </Button>
                </div>
              )}
              <form onSubmit={handleChatSubmit} className="w-full flex gap-2 items-center">
                <Input
                  id="chat-input"
                  type="text"
                  placeholder="Ask about the notes..."
                  value={currentChatMessage}
                  onChange={(e) => setCurrentChatMessage(e.target.value)}
                  disabled={isChatting || !user}
                  className="flex-grow"
                />
                <Button type="submit" disabled={isChatting || !currentChatMessage.trim() || !user} size="icon" className="bg-accent hover:bg-accent/90">
                  {isChatting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}

