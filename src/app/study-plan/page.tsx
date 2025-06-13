'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { generateStudyPlan, type GenerateStudyPlanInput, type GenerateStudyPlanOutput } from '@/ai/flows/generate-study-plan';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function StudyPlanPage() {
  const [formData, setFormData] = useState<GenerateStudyPlanInput>({
    learningObjectives: '',
    availableTime: '',
    resources: '',
  });
  const [studyPlan, setStudyPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.learningObjectives || !formData.availableTime) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in learning objectives and available time.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setStudyPlan(null);
    try {
      const result: GenerateStudyPlanOutput = await generateStudyPlan(formData);
      setStudyPlan(result.studyPlan);
    } catch (error) {
      console.error('Error generating study plan:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate study plan. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Create Your Personalized Study Plan</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Tell us your goals, and our AI will craft a tailored study schedule for you.
        </p>
      </header>

      <Card className="max-w-2xl mx-auto shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Study Plan Generator</CardTitle>
          <CardDescription>Fill in the details below to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="learningObjectives">Learning Objectives</Label>
              <Textarea
                id="learningObjectives"
                name="learningObjectives"
                value={formData.learningObjectives}
                onChange={handleChange}
                placeholder="e.g., Master calculus, learn Python for data science, prepare for history exam"
                required
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availableTime">Available Time</Label>
              <Input
                id="availableTime"
                name="availableTime"
                value={formData.availableTime}
                onChange={handleChange}
                placeholder="e.g., 2 hours daily, 10 hours a week for 3 months"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resources">Available Resources (Optional)</Label>
              <Textarea
                id="resources"
                name="resources"
                value={formData.resources}
                onChange={handleChange}
                placeholder="e.g., Textbooks (Modern Physics by Krane), online courses (Coursera Machine Learning), personal notes"
                className="min-h-[80px]"
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Generate Plan
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg text-muted-foreground">Generating your plan...</p>
        </div>
      )}

      {studyPlan && (
        <Card className="max-w-3xl mx-auto shadow-xl mt-8 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Your Custom Study Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 bg-primary/10 border-primary/30">
              <Lightbulb className="h-5 w-5 text-primary" />
              <AlertTitle className="font-headline text-primary">Study Plan Generated!</AlertTitle>
              <AlertDescription className="text-primary/80">
                Here is your AI-generated study plan. Remember, consistency is key! Adjust as needed and track your progress.
              </AlertDescription>
            </Alert>
            <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap p-4 bg-muted/50 rounded-md">
              {studyPlan}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
