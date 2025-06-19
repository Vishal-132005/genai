
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateStudyPlan, type GenerateStudyPlanInput, type StudyPlanItem as OriginalStudyPlanItem, type GenerateStudyPlanOutput as OriginalGenerateStudyPlanOutput } from '@/ai/flows/generate-study-plan';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lightbulb, TableIcon, History, Eye, BookOpen, ListChecks, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { saveStudyPlan, getStudyPlans, type StoredStudyPlan, getUserProfile, type UserProfile } from '@/lib/firestoreService';
import { getDepartments, getSemestersForDepartment, getSubjectsForSemester, getTopicsForSubject, type Topic as AcademicTopic } from '@/lib/academicData';

interface StudyPlanItem extends OriginalStudyPlanItem {
  isCompleted?: boolean;
}

interface GenerateStudyPlanOutput extends OriginalGenerateStudyPlanOutput {
  planItems: StudyPlanItem[];
}

export default function StudyPlanPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]); 

  const [availableSemesters, setAvailableSemesters] = useState<{value: string, label: string}[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<{value: string, label: string, topics: AcademicTopic[]}[]>([]);
  const [availableTopics, setAvailableTopics] = useState<{value: string, label: string}[]>([]);

  const [customLearningObjectives, setCustomLearningObjectives] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [userResources, setUserResources] = useState('');

  const [studyPlanOutput, setStudyPlanOutput] = useState<GenerateStudyPlanOutput | StoredStudyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const { toast } = useToast();
  const [historicalPlans, setHistoricalPlans] = useState<StoredStudyPlan[]>([]);

  const departmentOptions = getDepartments();

  useEffect(() => {
    const fetchProfileAndPlans = async () => {
      if (user) {
        setIsLoadingProfile(true);
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
          if (profile?.department) setSelectedDepartment(profile.department);
          if (profile?.semester) setSelectedSemester(profile.semester);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          toast({ title: "Profile Error", description: "Could not load your profile.", variant: "destructive" });
        } finally {
          setIsLoadingProfile(false);
        }
        fetchHistoricalPlans();
      } else {
        setUserProfile(null);
        setSelectedDepartment('');
        setSelectedSemester('');
        setHistoricalPlans([]);
        setStudyPlanOutput(null);
        setIsLoadingProfile(false);
      }
    };
    fetchProfileAndPlans();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (selectedDepartment) {
      setAvailableSemesters(getSemestersForDepartment(selectedDepartment));
      if (userProfile?.department !== selectedDepartment) setSelectedSemester(''); 
    } else {
      setAvailableSemesters([]);
    }
    setSelectedSubject('');
    setSelectedTopics([]);
  }, [selectedDepartment, userProfile?.department]);

  useEffect(() => {
    if (selectedDepartment && selectedSemester) {
      setAvailableSubjects(getSubjectsForSemester(selectedDepartment, selectedSemester));
    } else {
      setAvailableSubjects([]);
    }
    setSelectedSubject('');
    setSelectedTopics([]);
  }, [selectedDepartment, selectedSemester]);

  useEffect(() => {
    if (selectedDepartment && selectedSemester && selectedSubject) {
      setAvailableTopics(getTopicsForSubject(selectedDepartment, selectedSemester, selectedSubject));
    } else {
      setAvailableTopics([]);
    }
    setSelectedTopics([]);
  }, [selectedDepartment, selectedSemester, selectedSubject]);

  const fetchHistoricalPlans = async () => {
    if (!user) return;
    setIsLoadingHistory(true);
    try {
      const plans = await getStudyPlans(user.uid);
      setHistoricalPlans(plans);
    } catch (error) {
      console.error('Error fetching historical plans:', error);
      toast({ title: 'Error Fetching History', description: 'Could not load your past study plans.', variant: 'destructive' });
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleTopicChange = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast({ title: 'Not Authenticated', description: 'Please log in to generate and save study plans.', variant: 'destructive' });
      return;
    }
    
    let learningObjectives = customLearningObjectives;
    if (selectedDepartment && selectedSemester) {
      const deptName = departmentOptions.find(d => d.value === selectedDepartment)?.label || selectedDepartment;
      const semName = availableSemesters.find(s => s.value === selectedSemester)?.label || `Semester ${selectedSemester}`;
      let academicContext = `Academic Focus: ${deptName}, ${semName}.`;

      if (selectedSubject) {
        const subjName = availableSubjects.find(s => s.value === selectedSubject)?.label || selectedSubject;
        academicContext += ` Subject: ${subjName}.`;
        if (selectedTopics.length > 0) {
          const topicNames = selectedTopics.map(tid => availableTopics.find(t => t.value === tid)?.label || tid).join(', ');
          academicContext += ` Specific Topics: ${topicNames}.`;
        }
      }
      learningObjectives = academicContext + (customLearningObjectives ? ` Additional Objectives: ${customLearningObjectives}` : '');
    }

    if (!learningObjectives && !availableTime) {
       toast({ title: 'Missing Information', description: 'Please specify academic focus or custom objectives, and available time.', variant: 'destructive' });
       return;
    }
     if (!availableTime) {
       toast({ title: 'Missing Information', description: 'Please specify available time.', variant: 'destructive' });
       return;
    }

    setIsLoading(true);
    setStudyPlanOutput(null); 
    try {
      const input: GenerateStudyPlanInput = {
        learningObjectives,
        availableTime,
        resources: userResources,
      };
      const resultFromAI: OriginalGenerateStudyPlanOutput = await generateStudyPlan(input);
      
      const itemsWithCompletionStatus = resultFromAI.planItems.map(item => ({ ...item, isCompleted: false }));
      const newPlanToSaveAndDisplay: GenerateStudyPlanOutput & { userId?: string, createdAt?: string } = { 
        planTitle: resultFromAI.planTitle, 
        planItems: itemsWithCompletionStatus 
      };
      
      await saveStudyPlan(user.uid, newPlanToSaveAndDisplay);
      setStudyPlanOutput(newPlanToSaveAndDisplay); 
      toast({ title: 'Plan Saved', description: 'Your new study plan has been generated and saved.' });
      fetchHistoricalPlans(); 
    } catch (error) {
      console.error('Error generating study plan:', error);
      toast({ title: 'Error', description: 'Failed to generate study plan. Please try again.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTaskCompletion = (index: number) => {
    if (!studyPlanOutput || !('planItems' in studyPlanOutput)) return; 
    const currentPlanItems = studyPlanOutput.planItems || [];
    const updatedPlanItems = currentPlanItems.map((item, i) =>
      i === index ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setStudyPlanOutput({ ...studyPlanOutput, planItems: updatedPlanItems });
  };

  const viewHistoricalPlan = (plan: StoredStudyPlan) => {
    const itemsWithCompletion = plan.planItems.map(item => ({ ...item, isCompleted: item.isCompleted || false }));
    setStudyPlanOutput({ ...plan, planItems: itemsWithCompletion });
  };
  
  const formatFirestoreTimestamp = (timestampInput: string | Date | undefined): string => {
    if (!timestampInput) return 'N/A';
    try {
      const dateObj = new Date(timestampInput);
      if (isNaN(dateObj.getTime())) {
        return 'Invalid Date';
      }
      return dateObj.toLocaleDateString();
    } catch {
      return 'Invalid Date';
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

      <div className="grid md:grid-cols-3 gap-8 items-start">
        <Card className="md:col-span-1 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Study Plan Generator</CardTitle>
            <CardDescription>Fill in the details below to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingProfile && <div className="flex justify-center py-4"><Loader2 className="h-6 w-6 animate-spin text-primary" /> <span className="ml-2">Loading profile...</span></div>}
            {!isLoadingProfile && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment} disabled={!user}>
                  <SelectTrigger id="department"><SelectValue placeholder="Select Department" /></SelectTrigger>
                  <SelectContent>{departmentOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="semester">Semester</Label>
                <Select value={selectedSemester} onValueChange={setSelectedSemester} disabled={!user || !selectedDepartment || availableSemesters.length === 0}>
                  <SelectTrigger id="semester"><SelectValue placeholder="Select Semester" /></SelectTrigger>
                  <SelectContent>{availableSemesters.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject">Subject (Optional)</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject} disabled={!user || !selectedSemester || availableSubjects.length === 0}>
                  <SelectTrigger id="subject"><SelectValue placeholder="Select Subject" /></SelectTrigger>
                  <SelectContent>{availableSubjects.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              
              {selectedSubject && availableTopics.length > 0 && (
                <div className="space-y-2">
                  <Label>Specific Topics for {availableSubjects.find(s=>s.value === selectedSubject)?.label}</Label>
                  <div className="max-h-40 overflow-y-auto space-y-1 rounded-md border p-2 bg-muted/30">
                    {availableTopics.map(topic => (
                      <div key={topic.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`topic-${topic.value}`}
                          checked={selectedTopics.includes(topic.value)}
                          onCheckedChange={() => handleTopicChange(topic.value)}
                        />
                        <Label htmlFor={`topic-${topic.value}`} className="font-normal cursor-pointer">{topic.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="customLearningObjectives">Other Learning Objectives (Optional)</Label>
                <Textarea id="customLearningObjectives" value={customLearningObjectives} onChange={(e) => setCustomLearningObjectives(e.target.value)} placeholder="e.g., Prepare for a specific certification, improve problem-solving skills" className="min-h-[80px]" />
              </div>
              <div>
                <Label htmlFor="availableTime">Available Time</Label>
                <Input id="availableTime" value={availableTime} onChange={(e) => setAvailableTime(e.target.value)} placeholder="e.g., 2 hours daily, 10 hours/week for 3 months" required />
              </div>
              <div>
                <Label htmlFor="userResources">Overall Available Resources (Optional)</Label>
                <Textarea id="userResources" value={userResources} onChange={(e) => setUserResources(e.target.value)} placeholder="e.g., Textbooks, online courses, personal notes" className="min-h-[80px]" />
              </div>
              <Button type="submit" disabled={isLoading || !user} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BookOpen className="mr-2 h-4 w-4" />}
                {user ? 'Generate & Save Plan' : 'Login to Generate Plan'}
              </Button>
            </form>
            )}
          </CardContent>
        </Card>

        {user && (
          <Card className="md:col-span-2 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center"><History className="mr-2 h-6 w-6" />Study Plan History</CardTitle>
              <CardDescription>View your previously generated study plans.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingHistory && <div className="flex justify-center py-4"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
              {!isLoadingHistory && historicalPlans.length === 0 && <p className="text-muted-foreground text-center py-4">No past study plans found.</p>}
              {!isLoadingHistory && historicalPlans.length > 0 && (
                <ul className="space-y-3 max-h-96 overflow-y-auto">
                  {historicalPlans.map((plan) => (
                    <li key={plan.id} className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors">
                      <div>
                        <p className="font-medium">{plan.planTitle || "Untitled Plan"}</p>
                        <p className="text-xs text-muted-foreground">Created: {formatFirestoreTimestamp(plan.createdAt)}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => viewHistoricalPlan(plan)}><Eye className="mr-2 h-4 w-4" /> View</Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {isLoading && !studyPlanOutput && (
        <div className="flex justify-center items-center py-8 mt-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" /><p className="ml-4 text-lg text-muted-foreground">Generating your plan...</p>
        </div>
      )}

      {studyPlanOutput && studyPlanOutput.planItems && (
        <Card className="w-full mx-auto shadow-xl mt-8 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary flex items-center"><TableIcon className="mr-2 h-6 w-6" />{studyPlanOutput.planTitle || "Your Custom Study Plan"}</CardTitle>
            <CardDescription>Currently viewing: {('id' in studyPlanOutput && studyPlanOutput.id && studyPlanOutput.createdAt) ? `Historical plan from ${formatFirestoreTimestamp(studyPlanOutput.createdAt)}` : 'Newly Generated Plan'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 bg-primary/10 border-primary/30">
              <ListChecks className="h-5 w-5 text-primary" />
              <AlertTitle className="font-headline text-primary">Study Plan Details</AlertTitle>
              <AlertDescription className="text-primary/80">Mark tasks as complete to track your progress. Click on an explanation to generate a quiz!</AlertDescription>
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
                    <TableHead className="min-w-[250px]">Explanation/Focus & Quiz</TableHead>
                    <TableHead className="min-w-[180px]">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studyPlanOutput.planItems.map((item: StudyPlanItem, index: number) => (
                    <TableRow key={index} className={cn(item.isCompleted && "bg-green-500/10 dark:bg-green-700/20")}>
                      <TableCell className="align-top">
                        <Checkbox checked={!!item.isCompleted} onCheckedChange={() => toggleTaskCompletion(index)} aria-label={item.isCompleted ? "Mark task as not complete" : "Mark task as complete"} />
                      </TableCell>
                      <TableCell className={cn("font-medium align-top", item.isCompleted && "line-through text-muted-foreground")}>{item.day}</TableCell>
                      <TableCell className={cn("align-top", item.isCompleted && "line-through text-muted-foreground")}>{item.timeSlot}</TableCell>
                      <TableCell className={cn("align-top", item.isCompleted && "line-through text-muted-foreground")}>{item.activity}</TableCell>
                      <TableCell className={cn("align-top", item.isCompleted && "line-through text-muted-foreground")}>{item.topic || '-'}</TableCell>
                      <TableCell className={cn("align-top", item.isCompleted && "line-through text-muted-foreground")}>{item.duration || '-'}</TableCell>
                      <TableCell className={cn("align-top", item.isCompleted && "line-through text-muted-foreground")}>
                        {item.resources && item.resources.length > 0 ? (<ul className="list-disc list-inside space-y-1">{item.resources.map((res, i) => <li key={i}>{res}</li>)}</ul>) : '-'}
                      </TableCell>
                      <TableCell className={cn("align-top whitespace-pre-wrap", item.isCompleted && "line-through text-muted-foreground")}>
                        <p className="mb-2">{item.explanation || '-'}</p>
                        {(item.topic || item.activity) && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-primary text-primary hover:bg-primary/10"
                            onClick={() => {
                              const quizTopic = item.topic || item.activity;
                              router.push(`/quiz?topic=${encodeURIComponent(quizTopic)}&numQuestions=30&sourceActivity=${encodeURIComponent(item.activity)}`);
                            }}
                          >
                            <Zap className="mr-2 h-4 w-4" /> Generate Quiz
                          </Button>
                        )}
                      </TableCell>
                      <TableCell className={cn("align-top whitespace-pre-wrap", item.isCompleted && "line-through text-muted-foreground")}>{item.notes || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {studyPlanOutput.planItems.length === 0 && <p className="text-center text-muted-foreground py-4">No items found in this study plan.</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
