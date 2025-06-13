
'use client';

import { useState, type ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { summarizeDocument, type SummarizeDocumentInput, type SummarizeDocumentOutput } from '@/ai/flows/summarize-document';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText, Sparkles, Upload } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SummarizePage() {
  const [documentText, setDocumentText] = useState('');
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setSelectedFileName(null);
      setDocumentText('');
      return;
    }

    setSelectedFileName(file.name);
    setSummary(null); // Clear previous summary

    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension === 'txt') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setDocumentText(text);
        toast({
          title: "File Loaded",
          description: `${file.name} content has been loaded into the text area.`,
        });
      };
      reader.onerror = () => {
        toast({
          title: 'Error Reading File',
          description: `Could not read ${file.name}.`,
          variant: 'destructive',
        });
        setDocumentText('');
      };
      reader.readAsText(file);
    } else if (['pdf', 'doc', 'docx'].includes(fileExtension || '')) {
      setDocumentText(''); // Clear text area for these files
      toast({
        title: 'File Type Not Directly Supported',
        description: `For ${file.name} (${fileExtension?.toUpperCase()}): Please copy the text from your document and paste it into the text area below for summarization. Direct ${fileExtension?.toUpperCase()} parsing is not yet supported.`,
        variant: 'default',
        duration: 8000, // Longer duration for important info
      });
    } else {
      setDocumentText('');
      toast({
        title: 'Unsupported File Type',
        description: `Selected file type (${fileExtension?.toUpperCase()}) is not supported. Please use .txt or copy paste content.`,
        variant: 'destructive',
      });
    }
    // Reset file input value to allow re-uploading the same file
    event.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!documentText.trim()) {
      toast({
        title: 'Empty Document',
        description: 'Please paste some text or upload a .txt file to summarize.',
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
          Paste your document text or upload a .txt file, and let AI extract the key points for you.
        </p>
      </header>

      <Card className="max-w-2xl mx-auto shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Summarize Your Text</CardTitle>
          <CardDescription>Enter text directly, or upload a file.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fileUpload" className="flex items-center cursor-pointer">
                <Upload className="mr-2 h-5 w-5" />
                Upload File (TXT, PDF, DOC, DOCX)
              </Label>
              <Input
                id="fileUpload"
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-500 dark:text-slate-400
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-full file:border-0
                           file:text-sm file:font-semibold
                           file:bg-primary/10 file:text-primary
                           dark:file:bg-primary/20 dark:file:text-primary
                           hover:file:bg-primary/20 dark:hover:file:bg-primary/30"
              />
              {selectedFileName && (
                <p className="text-sm text-muted-foreground mt-1">Selected file: {selectedFileName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentText">Document Text</Label>
              <Textarea
                id="documentText"
                value={documentText}
                onChange={(e) => setDocumentText(e.target.value)}
                placeholder="Paste your long article, notes, or any text here... or upload a .txt file above."
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
