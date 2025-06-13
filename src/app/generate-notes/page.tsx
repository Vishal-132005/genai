
'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { generateNotes, type GenerateNotesInput, type GenerateNotesOutput } from '@/ai/flows/generate-notes-flow';
import { useToast } from '@/hooks/use-toast';
import { Loader2, NotebookText, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function GenerateNotesPage() {
  const [topicOrPlanDetails, setTopicOrPlanDetails] = useState('');
  const [generatedNotes, setGeneratedNotes] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    try {
      const input: GenerateNotesInput = { topicOrPlanDetails };
      const result: GenerateNotesOutput = await generateNotes(input);
      setGeneratedNotes(result.generatedNotes);
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

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">AI Note Generator</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Provide topics or your study plan details, and let AI craft comprehensive notes for you.
        </p>
      </header>

      <Card className="max-w-2xl mx-auto shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Generate Study Notes</CardTitle>
          <CardDescription>Enter the topics or content you want notes for.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topicOrPlanDetails">Topics / Plan Details</Label>
              <Textarea
                id="topicOrPlanDetails"
                value={topicOrPlanDetails}
                onChange={(e) => setTopicOrPlanDetails(e.target.value)}
                placeholder="e.g., Key concepts of Photosynthesis, Chapter 1-3 of World History, My study plan for Calculus..."
                required
                className="min-h-[200px]"
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate Notes
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg text-muted-foreground">Generating notes...</p>
        </div>
      )}

      {generatedNotes && (
        <Card className="max-w-3xl mx-auto shadow-xl mt-8 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Generated Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 bg-primary/10 border-primary/30">
              <NotebookText className="h-5 w-5 text-primary" />
              <AlertTitle className="font-headline text-primary">Notes Ready!</AlertTitle>
              <AlertDescription className="text-primary/80">
                Here are your AI-generated study notes.
              </AlertDescription>
            </Alert>
            <div className="prose dark:prose-invert max-w-none p-4 bg-muted/50 rounded-md border">
              <ReactMarkdown>{generatedNotes}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
