
'use server';

/**
 * @fileOverview AI agent that answers questions based on provided notes.
 *
 * - chatWithNotes - A function that handles the question answering process.
 * - ChatWithNotesInput - The input type for the chatWithNotes function.
 * - ChatWithNotesOutput - The return type for the chatWithNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithNotesInputSchema = z.object({
  notesContent: z.string().describe('The content of the study notes.'),
  userQuestion: z.string().describe("The user's question about the notes."),
});
export type ChatWithNotesInput = z.infer<typeof ChatWithNotesInputSchema>;

const ChatWithNotesOutputSchema = z.object({
  answer: z.string().describe("The AI's answer to the user's question, based solely on the provided notes."),
});
export type ChatWithNotesOutput = z.infer<typeof ChatWithNotesOutputSchema>;

export async function chatWithNotes(
  input: ChatWithNotesInput
): Promise<ChatWithNotesOutput> {
  return chatWithNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatWithNotesPrompt',
  input: {schema: ChatWithNotesInputSchema},
  output: {schema: ChatWithNotesOutputSchema},
  prompt: `You are a helpful AI assistant. You have been provided with a set of study notes.
Your task is to answer the user's question based *solely* on the information contained within these notes.
Do not use any external knowledge or make assumptions beyond what is written in the notes.
If the answer cannot be found in the notes, clearly state that the information is not available in the provided text or that you cannot answer based on the notes.

Provided Notes:
---
{{{notesContent}}}
---

User's Question:
{{{userQuestion}}}

Answer:
`,
});

const chatWithNotesFlow = ai.defineFlow(
  {
    name: 'chatWithNotesFlow',
    inputSchema: ChatWithNotesInputSchema,
    outputSchema: ChatWithNotesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
