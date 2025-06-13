'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { generateQuizQuestions, type GenerateQuizQuestionsInput, type GenerateQuizQuestionsOutput } from '@/ai/flows/generate-quiz-questions';
import type { Question } from '@/ai/flows/generate-quiz-questions'; // This type might need to be explicitly defined or imported if not exported by the flow file.
// Assuming Question type is: { question: string; options: string[]; correctAnswerIndex: number; }

import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, XCircle, RotateCcw, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type UserAnswer = {
  questionIndex: number;
  selectedOptionIndex: number;
  isCorrect: boolean;
};

// Explicitly define Question type if not properly exported or for clarity
interface QuizQuestion extends Question {}


export default function QuizPage() {
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [quizState, setQuizState] = useState<'generating' | 'taking' | 'results'>('generating');
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();

  const handleGenerateQuiz = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topic) {
      toast({ title: 'Missing Topic', description: 'Please enter a topic for the quiz.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);

    try {
      const input: GenerateQuizQuestionsInput = { topic, numQuestions };
      const result: GenerateQuizQuestionsOutput = await generateQuizQuestions(input);
      if (result.questions && result.questions.length > 0) {
        setQuestions(result.questions as QuizQuestion[]); // Cast if necessary
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

  const handleAnswerSubmit = () => {
    if (selectedOption === null) {
      toast({ title: 'No Answer Selected', description: 'Please select an option.', variant: 'destructive' });
      return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
    
    setUserAnswers([
      ...userAnswers,
      { questionIndex: currentQuestionIndex, selectedOptionIndex: selectedOption, isCorrect },
    ]);
    setShowFeedback(true);
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
  };
  
  const score = userAnswers.filter(ans => ans.isCorrect).length;
  const progressPercentage = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

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
            <form onSubmit={handleGenerateQuiz} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., World History, Quantum Physics, Shakespearean Plays"
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
                  max="20"
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
            <p className="text-5xl font-bold">{score} / {questions.length}</p>
            <p className="text-2xl text-muted-foreground">Accuracy: {accuracy.toFixed(0)}%</p>
            <div className="pt-4">
              <h3 className="text-xl font-headline mb-2">Review Your Answers:</h3>
              <ul className="text-left space-y-2 max-h-60 overflow-y-auto p-2 border rounded-md bg-muted/30">
                {questions.map((q, idx) => {
                  const userAnswer = userAnswers.find(ua => ua.questionIndex === idx);
                  return (
                    <li key={idx} className="text-sm p-2 rounded-md bg-background/50">
                      <strong>Q{idx + 1}:</strong> {q.question}
                      <br />
                      Your answer: <span className={cn(userAnswer?.isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
                        {userAnswer ? q.options[userAnswer.selectedOptionIndex] : "Not answered"}
                        {userAnswer?.isCorrect ? <CheckCircle className="inline ml-1 h-4 w-4" /> : <XCircle className="inline ml-1 h-4 w-4" />}
                      </span>
                      {!userAnswer?.isCorrect && <span className="text-xs block">Correct: {q.options[q.correctAnswerIndex]}</span>}
                    </li>
                  );
                })}
              </ul>
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

