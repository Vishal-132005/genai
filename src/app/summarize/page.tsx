
'use client';

import { useState, type ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { summarizeDocument, type SummarizeDocumentInput, type SummarizeDocumentOutput } from '@/ai/flows/summarize-document';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText, Sparkles, Upload } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SummarizePage() {
  const [documentDataUri, setDocumentDataUri] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setSelectedFileName(null);
      setDocumentDataUri(null);
      return;
    }

    setSelectedFileName(file.name);
    setSummary(null); // Clear previous summary
    setDocumentDataUri(null); // Clear previous data URI

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      setDocumentDataUri(dataUri);
      toast({
        title: "File Ready",
        description: `${file.name} has been loaded and is ready for summarization.`,
      });
    };
    reader.onerror = () => {
      toast({
        title: 'Error Reading File',
        description: `Could not read ${file.name}.`,
        variant: 'destructive',
      });
      setSelectedFileName(null);
    };
    reader.readAsDataURL(file);

    // Reset file input value to allow re-uploading the same file
    event.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!documentDataUri) {
      toast({
        title: 'No File Selected',
        description: 'Please upload a PDF or DOC file to summarize.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setSummary(null);
    try {
      const input: SummarizeDocumentInput = { documentDataUri };
      const result: SummarizeDocumentOutput = await summarizeDocument(input);
      setSummary(result.summary);
    } catch (error) {
      console.error('Error summarizing document:', error);
      let description = 'Failed to summarize document. Please try again.';
      if (error instanceof Error && error.message.includes("MEDIA_PROCESSING_FAILED_NO_TEXT_CONTENT")) {
        description = 'Could not extract text from the uploaded document. The document might be image-based or heavily formatted. Try a different document.';
      } else if (error instanceof Error && error.message.includes("Schema validation failed")) {
        description = 'The AI returned an unexpected format. Please try again or with a different document.';
      }
      toast({
        title: 'Error Summarizing',
        description,
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
          Upload your PDF or DOC file, and let AI extract the key points for you.
        </p>
      </header>

      <Card className="max-w-2xl mx-auto shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Upload Your Document</CardTitle>
          <CardDescription>
            Select a PDF or DOC file to be summarized by our AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fileUpload" className="flex items-center cursor-pointer text-base">
                <Upload className="mr-2 h-5 w-5" />
                Select PDF or DOC File
              </Label>
              <Input
                id="fileUpload"
                type="file"
                accept="application/pdf,application/msword" // Only PDF and DOC
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
            <Button type="submit" disabled={isLoading || !documentDataUri} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Summarize File
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
