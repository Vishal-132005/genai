
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
    .describe('The learning objectives of the user. This may include specific department, semester, subjects, and topics (e.g., "Computer Science, Semester 1, Topics: Variables, Loops in Programming, Set Theory in Maths"). Or it can be general goals.'),
  availableTime: z
    .string()
    .describe('The amount of time the user has available to study (e.g., "2 hours daily", "10 hours/week for 3 months").'),
  resources: z 
    .string()
    .optional()
    .describe('The overall resources the user has available to study (e.g., specific textbooks, course access). This is optional.'),
});
export type GenerateStudyPlanInput = z.infer<typeof GenerateStudyPlanInputSchema>;

const StudyPlanItemSchema = z.object({
  day: z.string().describe("Day of the week or date for this study item (e.g., 'Monday', 'Day 1', '2024-07-29')."),
  timeSlot: z.string().describe("Time slot for the activity (e.g., '9:00 AM - 11:00 AM', 'Morning')."),
  activity: z.string().describe("The specific task or activity to be performed."),
  topic: z.string().optional().describe("The subject or topic covered during this activity (e.g., 'Algebra', 'Photosynthesis', 'Variables & Data Types')."),
  duration: z.string().optional().describe("Estimated duration for the activity (e.g., '2 hours', '45 minutes')."),
  resources: z.array(z.string()).optional().describe("List of specific learning resources relevant to this activity (e.g., 'Book: Chapter 3 of AI Fundamentals', 'Online: Khan Academy video on Neural Networks')."),
  explanation: z.string().optional().describe("Brief explanation of the core concepts or focus for this activity. What should the user understand after completing it?"),
  notes: z.string().optional().describe("Any additional general notes, tips, or comments for this study item."),
  isCompleted: z.boolean().optional().default(false).describe("Whether the user has completed this study item.")
});
export type StudyPlanItem = z.infer<typeof StudyPlanItemSchema>;

const GenerateStudyPlanOutputSchema = z.object({
  planTitle: z.string().describe("A suitable title for the generated study plan (e.g., 'Calculus Exam Prep Plan', 'CS Semester 1 Kickstart')."),
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
  prompt: `You are an AI study plan generator. You will generate a structured study plan for the user.
The user's learning objectives might specify a department, semester, particular subjects, and even specific topics. Prioritize these specifics when generating the plan.
If only general objectives are given, create a broad plan.
The plan should be organized like a chart or table, with clear items for each day/time slot.

For each plan item, provide:
- day: Day of the week or date (e.g., 'Monday', 'Day 1').
- timeSlot: Time slot for the activity (e.g., '9:00 AM - 11:00 AM').
- activity: The specific task or activity.
- topic: (Optional) The subject or topic covered, try to be specific based on input objectives.
- duration: (Optional) Estimated duration.
- resources: (Optional) A list of specific learning resources for THIS activity (e.g., "Chapter 3 of 'Calculus Early Transcendentals'", "Khan Academy video on Derivatives").
- explanation: (Optional) A brief explanation of what the user should focus on or understand from this activity.
- notes: (Optional) Any additional general notes or tips for this item.
- isCompleted: Always set to false initially.

Return the plan as a JSON object with the following structure. Crucially, the top-level JSON object MUST include a 'planTitle' string field and a 'planItems' array.
{
  "planTitle": "Name of the Study Plan",
  "planItems": [
    {
      "day": "e.g., Monday or Day 1",
      "timeSlot": "e.g., 9:00 AM - 11:00 AM",
      "activity": "e.g., Read Chapter 1: Introduction to Programming - Variables & Data Types",
      "topic": "e.g., Variables & Data Types",
      "duration": "e.g., 2 hours",
      "resources": ["Textbook 'CS101 Programming' Chapter 1", "Online tutorial on Python variables"],
      "explanation": "Focus on understanding different data types and how to declare variables.",
      "notes": "e.g., Focus on core concepts. Take short breaks.",
      "isCompleted": false
    },
    // ... more items
  ]
}

Ensure the "planItems" array contains a list of all study activities. Each item in the array should be an object adhering to the schema.

User Inputs:
Learning Objectives: {{{learningObjectives}}}
Available Time: {{{availableTime}}}
Overall Resources User Has: {{#if resources}}{{{resources}}}{{else}}Not specified{{/if}}

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
    // Ensure isCompleted is false for all items if not explicitly set by LLM
    if (output && output.planItems) {
        output.planItems = output.planItems.map(item => ({
            ...item,
            isCompleted: item.isCompleted === undefined ? false : item.isCompleted,
        }));
    }
    return output!;
  }
);
