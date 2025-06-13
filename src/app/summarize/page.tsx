'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { summarizeDocument, type SummarizeDocumentInput, type SummarizeDocumentOutput } from '@/ai/flows/summarize-document';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SummarizePage() {
  const [documentText, setDocumentText] = useState('');
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!documentText.trim()) {
      toast({
        title: 'Empty Document',
        description: 'Please paste some text to summarize.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setSummary(null);
    try {
      const input: SummarizeDocumentInput = { documentText };
      const result: SummarizeDocumentOutput = await summarizeDocument(input);
      setSummary(result.summary);
    } catch (error) {
      console.error('Error summarizing document:', error);
      toast({
        title: 'Error',
        description: 'Failed to summarize document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Document Summarizer</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Paste your document text below and let AI extract the key points for you.
        </p>
      </header>

      <Card className="max-w-2xl mx-auto shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Summarize Your Text</CardTitle>
          <CardDescription>Enter the document content you want to summarize.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="documentText">Document Text</Label>
              <Textarea
                id="documentText"
                value={documentText}
                onChange={(e) => setDocumentText(e.target.value)}
                placeholder="Paste your long article, notes, or any text here..."
                required
                className="min-h-[200px]"
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Summarize Text
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg text-muted-foreground">Summarizing...</p>
        </div>
      )}

      {summary && (
        <Card className="max-w-3xl mx-auto shadow-xl mt-8 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Generated Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 bg-primary/10 border-primary/30">
              <FileText className="h-5 w-5 text-primary" />
              <AlertTitle className="font-headline text-primary">Summary Ready!</AlertTitle>
              <AlertDescription className="text-primary/80">
                Here's a concise summary of your document.
              </AlertDescription>
            </Alert>
            <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap p-4 bg-muted/50 rounded-md">
              {summary}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
