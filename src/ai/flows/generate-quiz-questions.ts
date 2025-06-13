// Ensure this type is available for import in frontend components
'use server';

/**
 * @fileOverview AI agent that generates quiz questions based on a topic.
 *
 * - generateQuizQuestions - A function that handles the quiz question generation process.
 * - GenerateQuizQuestionsInput - The input type for the generateQuizQuestions function.
 * - GenerateQuizQuestionsOutput - The return type for the generateQuizQuestions function.
 * - Question - The type for a single quiz question.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizQuestionsInputSchema = z.object({
  topic: z.string().describe('The topic to generate quiz questions for.'),
  numQuestions: z.number().default(5).describe('The number of questions to generate.'),
});
export type GenerateQuizQuestionsInput = z.infer<typeof GenerateQuizQuestionsInputSchema>;

const QuestionSchema = z.object({
  question: z.string().describe('The quiz question.'),
  options: z.array(z.string()).describe('The possible answers to the question.'),
  correctAnswerIndex: z
    .number()
    .describe('The index of the correct answer in the options array.'),
});
export type Question = z.infer<typeof QuestionSchema>;


const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(QuestionSchema).describe('The generated quiz questions.'),
});
export type GenerateQuizQuestionsOutput = z.infer<typeof GenerateQuizQuestionsOutputSchema>;

export async function generateQuizQuestions(
  input: GenerateQuizQuestionsInput
): Promise<GenerateQuizQuestionsOutput> {
  return generateQuizQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizQuestionsPrompt',
  input: {schema: GenerateQuizQuestionsInputSchema},
  output: {schema: GenerateQuizQuestionsOutputSchema},
  prompt: `You are a quiz generator. Generate {{numQuestions}} quiz questions about {{topic}}.

Each question should have 4 possible answers, with one correct answer. Return the questions as a JSON array of objects with the following structure:

[{
  "question": "The quiz question.",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctAnswerIndex": 0 // The index of the correct answer in the options array
}]

Make sure that the correct answer is not always in the same position.

Topic: {{topic}}
Number of Questions: {{numQuestions}}`,
});

const generateQuizQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuizQuestionsFlow',
    inputSchema: GenerateQuizQuestionsInputSchema,
    outputSchema: GenerateQuizQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

