
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { generateQuizQuestions, type GenerateQuizQuestionsInput, type GenerateQuizQuestionsOutput } from '@/ai/flows/generate-quiz-questions';
import type { Question as OriginalQuestion } from '@/ai/flows/generate-quiz-questions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, XCircle, RotateCcw, Sparkles, History, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { saveQuizAttempt, getQuizAttempts, type StoredQuizAttempt } from '@/lib/firestoreService';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export interface Question extends OriginalQuestion {}

export type UserAnswer = {
  questionIndex: number;
  selectedOptionIndex: number;
  isCorrect: boolean;
};

export default function QuizPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [quizState, setQuizState] = useState<'generating' | 'taking' | 'results'>('generating');
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const [historicalAttempts, setHistoricalAttempts] = useState<StoredQuizAttempt[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isReattending, setIsReattending] = useState(false);


  const fetchHistoricalAttempts = useCallback(async () => {
    if (!user) return;
    setIsLoadingHistory(true);
    try {
      const attempts = await getQuizAttempts(user.uid);
      setHistoricalAttempts(attempts);
    } catch (error) {
      console.error('Error fetching quiz history:', error);
      toast({ title: 'Error Fetching History', description: 'Could not load your quiz history.', variant: 'destructive' });
    } finally {
      setIsLoadingHistory(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (user) {
      fetchHistoricalAttempts();
    } else {
      setHistoricalAttempts([]);
    }
  }, [user, fetchHistoricalAttempts]);

  useEffect(() => {
    const topicParam = searchParams.get('topic');
    const numQuestionsParam = searchParams.get('numQuestions');

    if (topicParam && numQuestionsParam) {
      setTopic(topicParam);
      const numQ = parseInt(numQuestionsParam, 10);
      if (!isNaN(numQ) && numQ > 0) {
        setNumQuestions(numQ);
      }
      // Automatically start generating quiz if params are present
      // Create a dummy event for handleGenerateQuiz
      const dummyEvent = { preventDefault: () => {} } as React.FormEvent<HTMLFormElement>;
      // Use a timeout to ensure state updates are processed before generating
      setTimeout(() => {
         handleGenerateQuiz(dummyEvent, topicParam, numQ);
      }, 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // Add handleGenerateQuiz if it's memoized with useCallback and dependencies are stable

  const handleGenerateQuiz = async (e: React.FormEvent<HTMLFormElement> | null, presetTopic?: string, presetNumQuestions?: number) => {
    e?.preventDefault();
    const currentTopic = presetTopic || topic;
    const currentNumQuestions = presetNumQuestions || numQuestions;

    if (!currentTopic) {
      toast({ title: 'Missing Topic', description: 'Please enter a topic for the quiz.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setIsReattending(false);

    try {
      const input: GenerateQuizQuestionsInput = { topic: currentTopic, numQuestions: currentNumQuestions };
      const result: GenerateQuizQuestionsOutput = await generateQuizQuestions(input);
      if (result.questions && result.questions.length > 0) {
        setQuestions(result.questions as Question[]);
        setQuizState('taking');
      } else {
        toast({ title: 'No Questions Generated', description: 'The AI could not generate questions for this topic. Please try a different topic.', variant: 'destructive' });
        setQuizState('generating');
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      toast({ title: 'Error', description: 'Failed to generate quiz. Please try again.', variant: 'destructive' });
      setQuizState('generating');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAnswerSubmit = async () => {
    if (selectedOption === null) {
      toast({ title: 'No Answer Selected', description: 'Please select an option.', variant: 'destructive' });
      return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
    
    const newUserAnswers = [
      ...userAnswers,
      { questionIndex: currentQuestionIndex, selectedOptionIndex: selectedOption, isCorrect },
    ];
    setUserAnswers(newUserAnswers);
    setShowFeedback(true);

    // If this is the last question and user is logged in, save the attempt
    if (user && currentQuestionIndex === questions.length - 1 && !isReattending) {
      try {
        const score = newUserAnswers.filter(ans => ans.isCorrect).length;
        const attemptData = {
          topic,
          numQuestions: questions.length,
          questions,
          userAnswers: newUserAnswers,
          score,
        };
        await saveQuizAttempt(user.uid, attemptData);
        toast({ title: 'Quiz Saved', description: 'Your quiz attempt has been saved to history.'});
        fetchHistoricalAttempts(); // Refresh history
      } catch (error) {
        console.error("Error saving quiz attempt:", error);
        toast({ title: 'Save Error', description: 'Could not save your quiz attempt.', variant: 'destructive' });
      }
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizState('results');
    }
  };

  const restartQuiz = () => {
    setQuizState('generating');
    setTopic('');
    setNumQuestions(5);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setShowFeedback(false);
    setIsReattending(false);
    router.replace('/quiz', undefined); // Clear query params
  };

  const handleReattendQuiz = (attempt: StoredQuizAttempt) => {
    setTopic(attempt.topic);
    setNumQuestions(attempt.numQuestions);
    setQuestions(attempt.questions as Question[]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setQuizState('taking');
    setIsReattending(true); // Flag that this is a re-attend, so don't save again
    toast({ title: "Re-attending Quiz", description: `Loading quiz on ${attempt.topic}. Results for this attempt won't be saved to history.`})
  };
  
  const score = userAnswers.filter(ans => ans.isCorrect).length;
  const progressPercentage = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const formatFirestoreTimestamp = (timestampInput: string | Date | undefined): string => {
    if (!timestampInput) return 'N/A';
    try {
      const dateObj = new Date(timestampInput);
      if (isNaN(dateObj.getTime())) {
        return 'Invalid Date';
      }
      return dateObj.toLocaleString(); // Use toLocaleString for date and time
    } catch {
      return 'Invalid Date';
    }
  };


  if (quizState === 'generating') {
    return (
      <div className="space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold font-headline text-primary">AI Quiz Generator</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Test your knowledge on any subject with AI-powered quizzes.
          </p>
        </header>
        <Card className="max-w-lg mx-auto shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Generate a New Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleGenerateQuiz(e)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., World History, Quantum Physics"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numQuestions">Number of Questions</Label>
                <Input
                  id="numQuestions"
                  type="number"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Math.max(1, parseInt(e.target.value)))}
                  min="1"
                  max="50" 
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Quiz
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {user && (
          <Card className="max-w-2xl mx-auto shadow-xl bg-card/80 backdrop-blur-sm mt-8">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center"><History className="mr-2 h-6 w-6" />Quiz History</CardTitle>
              <CardDescription>Review your past quiz attempts.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingHistory && <div className="flex justify-center py-4"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
              {!isLoadingHistory && historicalAttempts.length === 0 && <p className="text-muted-foreground text-center py-4">No quiz history found.</p>}
              {!isLoadingHistory && historicalAttempts.length > 0 && (
                <ul className="space-y-3 max-h-96 overflow-y-auto">
                  {historicalAttempts.map((attempt) => (
                    <li key={attempt.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-md hover:bg-muted/50 transition-colors gap-2">
                      <div>
                        <p className="font-medium">{attempt.topic}</p>
                        <p className="text-xs text-muted-foreground">
                          Score: {attempt.score}/{attempt.numQuestions} | Date: {formatFirestoreTimestamp(attempt.createdAt)}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleReattendQuiz(attempt)} className="mt-2 sm:mt-0">
                        <RefreshCw className="mr-2 h-4 w-4" /> Re-attend
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  if (quizState === 'taking' && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="text-center">
            <h1 className="text-3xl font-bold font-headline text-primary">Quiz: {topic}</h1>
            <p className="text-md text-muted-foreground mt-1">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </header>
        <Progress value={progressPercentage} className="w-full h-2" />
        <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-body">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedOption !== null ? selectedOption.toString() : undefined}
              onValueChange={(value) => setSelectedOption(parseInt(value))}
              disabled={showFeedback}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <Label
                  key={index}
                  htmlFor={`option-${index}`}
                  className={cn(
                    "flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all",
                    "hover:border-primary hover:bg-primary/5",
                    showFeedback && index === currentQuestion.correctAnswerIndex && "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400",
                    showFeedback && index === selectedOption && index !== currentQuestion.correctAnswerIndex && "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400",
                    !showFeedback && selectedOption === index && "border-primary bg-primary/10"
                  )}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <span>{option}</span>
                  {showFeedback && index === currentQuestion.correctAnswerIndex && <CheckCircle className="ml-auto h-5 w-5 text-green-500" />}
                  {showFeedback && index === selectedOption && index !== currentQuestion.correctAnswerIndex && <XCircle className="ml-auto h-5 w-5 text-red-500" />}
                </Label>
              ))}
            </RadioGroup>
            {showFeedback && (
              <div className={cn(
                "mt-4 p-3 rounded-md text-sm",
                selectedOption === currentQuestion.correctAnswerIndex ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
              )}>
                {selectedOption === currentQuestion.correctAnswerIndex ? "Correct!" : `Incorrect. The correct answer was: ${currentQuestion.options[currentQuestion.correctAnswerIndex]}`}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={showFeedback ? handleNextQuestion : handleAnswerSubmit} className="w-full" disabled={selectedOption === null && !showFeedback}>
              {showFeedback ? (currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Show Results') : 'Submit Answer'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (quizState === 'results') {
    const accuracy = questions.length > 0 ? (score / questions.length) * 100 : 0;
    return (
      <div className="max-w-lg mx-auto text-center space-y-6">
        <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-headline text-primary">Quiz Results</CardTitle>
            <CardDescription>Topic: {topic}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant={accuracy >= 70 ? "default" : "destructive"} className={cn(accuracy >=70 ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30")}>
              {accuracy >= 70 ? <CheckCircle className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-600" />}
              <AlertTitle className={cn("font-headline", accuracy >=70 ? "text-green-700" : "text-red-700")}>
                {accuracy >= 70 ? "Great Job!" : "Needs Improvement"}
              </AlertTitle>
              <AlertDescription className={cn(accuracy >=70 ? "text-green-600/80" : "text-red-600/80")}>
                You scored {score} out of {questions.length} ({accuracy.toFixed(0)}%).
              </AlertDescription>
            </Alert>
            
            <div className="pt-4">
              <h3 className="text-xl font-headline mb-2">Review Your Answers:</h3>
              <div className="text-left space-y-2 max-h-60 overflow-y-auto p-2 border rounded-md bg-muted/30">
                {questions.map((q, idx) => {
                  const userAnswer = userAnswers.find(ua => ua.questionIndex === idx);
                  return (
                    <div key={idx} className="text-sm p-2 rounded-md bg-background/50">
                      <p><strong>Q{idx + 1}:</strong> {q.question}</p>
                      <p>Your answer: <span className={cn(userAnswer?.isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400", "font-semibold")}>
                        {userAnswer ? q.options[userAnswer.selectedOptionIndex] : "Not answered"}
                        {userAnswer?.isCorrect ? <CheckCircle className="inline ml-1 h-4 w-4" /> : <XCircle className="inline ml-1 h-4 w-4" />}
                      </span></p>
                      {!userAnswer?.isCorrect && <p className="text-xs text-muted-foreground">Correct: {q.options[q.correctAnswerIndex]}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={restartQuiz} className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" /> Try Another Quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return null; 
}
