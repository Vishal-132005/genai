'use server';

/**
 * @fileOverview A study plan generation AI agent.
 *
 * - generateStudyPlan - A function that handles the study plan generation process.
 * - GenerateStudyPlanInput - The input type for the generateStudyPlan function.
 * - GenerateStudyPlanOutput - The return type for the generateStudyPlan function.
 * - StudyPlanItem - The type for a single item in the study plan.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStudyPlanInputSchema = z.object({
  learningObjectives: z
    .string()
    .describe('The learning objectives of the user.'),
  availableTime: z
    .string()
    .describe('The amount of time the user has available to study.'),
  resources: z
    .string()
    .describe('The resources the user has available to study.'),
});
export type GenerateStudyPlanInput = z.infer<typeof GenerateStudyPlanInputSchema>;

const StudyPlanItemSchema = z.object({
  day: z.string().describe("Day of the week or date for this study item (e.g., 'Monday', 'Day 1', '2024-07-29')."),
  timeSlot: z.string().describe("Time slot for the activity (e.g., '9:00 AM - 11:00 AM', 'Morning')."),
  activity: z.string().describe("The specific task or activity to be performed."),
  topic: z.string().optional().describe("The subject or topic covered during this activity (e.g., 'Algebra', 'Photosynthesis')."),
  duration: z.string().optional().describe("Estimated duration for the activity (e.g., '2 hours', '45 minutes')."),
  notes: z.string().optional().describe("Any additional notes or comments for this study item."),
});
export type StudyPlanItem = z.infer<typeof StudyPlanItemSchema>;

const GenerateStudyPlanOutputSchema = z.object({
  planTitle: z.string().describe("A suitable title for the generated study plan (e.g., 'Calculus Exam Prep Plan')."),
  planItems: z.array(StudyPlanItemSchema).describe('The structured list of study plan items, like a chart or table.'),
});
export type GenerateStudyPlanOutput = z.infer<typeof GenerateStudyPlanOutputSchema>;

export async function generateStudyPlan(
  input: GenerateStudyPlanInput
): Promise<GenerateStudyPlanOutput> {
  return generateStudyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudyPlanPrompt',
  input: {schema: GenerateStudyPlanInputSchema},
  output: {schema: GenerateStudyPlanOutputSchema},
  prompt: `You are an AI study plan generator. You will generate a structured study plan for the user based on their learning objectives, available time, and resources.
The plan should be organized like a chart or table, with clear items for each day/time slot.

Return the plan as a JSON object with the following structure:
{
  "planTitle": "Name of the Study Plan",
  "planItems": [
    {
      "day": "e.g., Monday or Day 1",
      "timeSlot": "e.g., 9:00 AM - 11:00 AM",
      "activity": "e.g., Read Chapter 1: Introduction to Algebra",
      "topic": "e.g., Algebra Fundamentals",
      "duration": "e.g., 2 hours",
      "notes": "e.g., Focus on core concepts"
    },
    // ... more items
  ]
}

Ensure the "planItems" array contains a list of all study activities. Each item in the array should be an object with "day", "timeSlot", "activity", and optionally "topic", "duration", and "notes". Make sure to include relevant topics for each activity.

User Inputs:
Learning Objectives: {{{learningObjectives}}}
Available Time: {{{availableTime}}}
Resources: {{{resources}}}

Generate the study plan now.
`,
});

const generateStudyPlanFlow = ai.defineFlow(
  {
    name: 'generateStudyPlanFlow',
    inputSchema: GenerateStudyPlanInputSchema,
    outputSchema: GenerateStudyPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
