
'use client';

import { useState, type FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { voiceAssistant, type VoiceAssistantInput, type VoiceAssistantOutput } from '@/ai/flows/voice-assistant-flow';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mic, Send, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function VoiceAssistantPage() {
  const [userInput, setUserInput] = useState('');
  const [assistantResponse, setAssistantResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim()) {
      toast({
        title: 'Empty Input',
        description: 'Please type your message for the assistant.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setAssistantResponse(null);
    try {
      const input: VoiceAssistantInput = { userInput };
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
    }
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Voice Assistant</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Interact with our AI assistant. (Text input for now)
        </p>
      </header>

      <Card className="max-w-2xl mx-auto shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Mic className="mr-2 h-6 w-6" /> Ask the Assistant
          </CardTitle>
          <CardDescription>
            Type your question or command below. Full voice integration coming soon!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userInput">Your Message</Label>
              <div className="flex gap-2">
                <Input
                  id="userInput"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="e.g., What's the capital of France?"
                  required
                  className="flex-grow"
                />
                <Button type="submit" disabled={isLoading} size="icon">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span className="sr-only">Send</span>
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
              <Sparkles className="mr-2 h-5 w-5" /> Assistant&apos;s Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="bg-primary/10 border-primary/30">
                <Mic className="h-5 w-5 text-primary" />
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
