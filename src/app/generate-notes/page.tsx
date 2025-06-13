
'use client';

import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { generateNotes, type GenerateNotesInput, type GenerateNotesOutput } from '@/ai/flows/generate-notes-flow';
import { useToast } from '@/hooks/use-toast';
import { Loader2, NotebookText, Sparkles, Download } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function GenerateNotesPage() {
  const [topicOrPlanDetails, setTopicOrPlanDetails] = useState('');
  const [generatedNotes, setGeneratedNotes] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const { toast } = useToast();
  const notesContentRef = useRef<HTMLDivElement>(null);

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
      const canvas = await html2canvas(element, { scale: 2 }); // Increase scale for better quality
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight; // Equivalent to position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
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
            <Button type="submit" disabled={isLoading || isDownloadingPdf} className="w-full">
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
                Here are your AI-generated study notes. You can also download them as a PDF.
              </AlertDescription>
            </Alert>
            <div ref={notesContentRef} className="prose dark:prose-invert max-w-none p-4 bg-muted/50 rounded-md border">
              <ReactMarkdown>{generatedNotes}</ReactMarkdown>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleDownloadPdf} disabled={isDownloadingPdf || isLoading} className="w-full mt-4">
              {isDownloadingPdf ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
              Download as PDF
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
