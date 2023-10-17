import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { openai } from '~/lib/openai';
import { ratelimit } from '~/lib/redis';

type Message = {
  role: 'system' | 'user' | 'assistant' | 'function';
  content: string | null;
};

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const id = req.ip ?? 'anonymous';

  const limit = await ratelimit.limit(id ?? 'anonymous');

  if (!limit.success) {
    return NextResponse.json(limit, { status: 429 });
  }

  const bodySchema = z.object({
    messages: z.array(
      z.object({
        role: z.enum(['system', 'user', 'assistant', 'function']),
        content: z.string().nullable(),
      })
    ),
    schema: z.string(),
  });

  const validated = bodySchema.safeParse(await req.json());

  if (!validated.success) {
    return NextResponse.json(validated.error, { status: 400 });
  }

  const { messages, schema } = validated.data;

  const systemMessage: Message = {
    role: 'system',
    content:
      'Only answer questions about PostgreSQL and the user provided database schema if any. Return only SQL code with no explanation. prefix the response with -- unless it is SQL code before and after code',
  };

  const userSchema: Message = { role: 'user', content: `database schema: ${schema}` };

  const prompt = messages[messages.length - 1];

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [systemMessage, userSchema, prompt],
    max_tokens: 1000,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
