
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { generateStudyPlan, type GenerateStudyPlanInput, type StudyPlanItem as OriginalStudyPlanItem, type GenerateStudyPlanOutput as OriginalGenerateStudyPlanOutput } from '@/ai/flows/generate-study-plan';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lightbulb, TableIcon, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from '@/lib/utils';

interface StudyPlanItem extends OriginalStudyPlanItem {
  isCompleted?: boolean;
}

interface GenerateStudyPlanOutput extends OriginalGenerateStudyPlanOutput {
  planItems: StudyPlanItem[];
}

export default function StudyPlanPage() {
  const [formData, setFormData] = useState<GenerateStudyPlanInput>({
    learningObjectives: '',
    availableTime: '',
    resources: '',
  });
  const [studyPlanOutput, setStudyPlanOutput] = useState<GenerateStudyPlanOutput | null>(null);
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
    setStudyPlanOutput(null);
    try {
      const result: OriginalGenerateStudyPlanOutput = await generateStudyPlan(formData);
      const itemsWithCompletion = result.planItems.map(item => ({ ...item, isCompleted: false }));
      setStudyPlanOutput({ ...result, planItems: itemsWithCompletion });
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

  const toggleTaskCompletion = (index: number) => {
    if (!studyPlanOutput) return;
    const updatedPlanItems = studyPlanOutput.planItems.map((item, i) => 
      i === index ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setStudyPlanOutput({ ...studyPlanOutput, planItems: updatedPlanItems });
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
              <Label htmlFor="resources">Overall Available Resources (Optional)</Label>
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

      {studyPlanOutput && studyPlanOutput.planItems && (
        <Card className="max-w-6xl mx-auto shadow-xl mt-8 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary flex items-center">
              <TableIcon className="mr-2 h-6 w-6" /> 
              {studyPlanOutput.planTitle || "Your Custom Study Plan"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 bg-primary/10 border-primary/30">
              <Lightbulb className="h-5 w-5 text-primary" />
              <AlertTitle className="font-headline text-primary">Study Plan Generated!</AlertTitle>
              <AlertDescription className="text-primary/80">
                Here is your AI-generated study plan. Mark tasks as complete to track your progress!
              </AlertDescription>
            </Alert>
            
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Status</TableHead>
                    <TableHead className="min-w-[100px]">Day</TableHead>
                    <TableHead className="min-w-[130px]">Time Slot</TableHead>
                    <TableHead className="min-w-[200px]">Activity</TableHead>
                    <TableHead className="min-w-[150px]">Topic</TableHead>
                    <TableHead className="min-w-[80px]">Duration</TableHead>
                    <TableHead className="min-w-[200px]">Resources</TableHead>
                    <TableHead className="min-w-[250px]">Explanation/Focus</TableHead>
                    <TableHead className="min-w-[180px]">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studyPlanOutput.planItems.map((item: StudyPlanItem, index: number) => (
                    <TableRow key={index} className={cn(item.isCompleted && "bg-muted/40")}>
                      <TableCell className="align-top">
                        <Checkbox
                          checked={item.isCompleted}
                          onCheckedChange={() => toggleTaskCompletion(index)}
                          aria-label={item.isCompleted ? "Mark task as not complete" : "Mark task as complete"}
                          className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        />
                      </TableCell>
                      <TableCell className={cn("font-medium align-top", item.isCompleted && "line-through text-muted-foreground")}>{item.day}</TableCell>
                      <TableCell className={cn("align-top", item.isCompleted && "line-through text-muted-foreground")}>{item.timeSlot}</TableCell>
                      <TableCell className={cn("align-top", item.isCompleted && "line-through text-muted-foreground")}>{item.activity}</TableCell>
                      <TableCell className={cn("align-top", item.isCompleted && "line-through text-muted-foreground")}>{item.topic || '-'}</TableCell>
                      <TableCell className={cn("align-top", item.isCompleted && "line-through text-muted-foreground")}>{item.duration || '-'}</TableCell>
                      <TableCell className={cn("align-top", item.isCompleted && "line-through text-muted-foreground")}>
                        {item.resources && item.resources.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1">
                            {item.resources.map((res, i) => <li key={i}>{res}</li>)}
                          </ul>
                        ) : '-'}
                      </TableCell>
                      <TableCell className={cn("align-top whitespace-pre-wrap", item.isCompleted && "line-through text-muted-foreground")}>{item.explanation || '-'}</TableCell>
                      <TableCell className={cn("align-top whitespace-pre-wrap", item.isCompleted && "line-through text-muted-foreground")}>{item.notes || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {studyPlanOutput.planItems.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No items found in the study plan.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
