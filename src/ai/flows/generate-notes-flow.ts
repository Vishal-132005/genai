
'use server';

/**
 * @fileOverview AI agent that generates study notes based on provided topics or plan details.
 *
 * - generateNotes - A function that handles the note generation process.
 * - GenerateNotesInput - The input type for the generateNotes function.
 * - GenerateNotesOutput - The return type for the generateNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateNotesInputSchema = z.object({
  topicOrPlanDetails: z.string().describe('The topics, subject matter, or details from a study plan to generate notes for.'),
});
export type GenerateNotesInput = z.infer<typeof GenerateNotesInputSchema>;

const GenerateNotesOutputSchema = z.object({
  generatedNotes: z.string().describe('Comprehensive, well-structured study notes. Formatted for readability, potentially using markdown-like structures (headings, lists, bold text).'),
});
export type GenerateNotesOutput = z.infer<typeof GenerateNotesOutputSchema>;

export async function generateNotes(
  input: GenerateNotesInput
): Promise<GenerateNotesOutput> {
  return generateNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNotesPrompt',
  input: {schema: GenerateNotesInputSchema},
  output: {schema: GenerateNotesOutputSchema},
  prompt: `You are an expert note-taking AI. Based on the following topics or study plan details, generate comprehensive, well-structured study notes.
The notes should be clear, concise, and highlight key concepts, definitions, and examples where appropriate.
Format the notes for readability. Use markdown-like structures such as headings (e.g., ## Title), bullet points (e.g., * item), and bold text (e.g., **important concept**) to organize the information effectively.

Input Details:
{{{topicOrPlanDetails}}}

Generate the detailed study notes now.
`,
});

const generateNotesFlow = ai.defineFlow(
  {
    name: 'generateNotesFlow',
    inputSchema: GenerateNotesInputSchema,
    outputSchema: GenerateNotesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
