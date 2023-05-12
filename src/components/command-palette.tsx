'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shared/dialog';
import { Button } from './shared/button';
import { Icon } from './shared/icon';
import { useForm } from 'react-hook-form';
import { TextInput } from './shared/text-input';
import { useAtom } from 'jotai';
import { responseAtom, showCommandPaletteAtom } from '@/utils/atoms';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useHotkeys } from 'react-hotkeys-hook';

type FormValues = {
  prompt: string;
};

export const CommandPalette = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [showCommandPalette, setShowCommandPalette] = useAtom(
    showCommandPaletteAtom
  );
  const [response, setResponse] = useAtom(responseAtom);

  const { mutate, isLoading } = useMutation(
    async ({ prompt }: FormValues) => {
      setResponse('');
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Format the response \n\nQ: ${prompt}\n A:`,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // This data is a ReadableStream
      const data = response.body;

      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setResponse((prev) => prev + chunkValue);
      }
    },
    {
      onSuccess: (data) => {},

      onError: (error) => {
        toast.error(`Something went wrong: ${error}`);
      },
    }
  );

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  useHotkeys('meta+k', () => {
    setShowCommandPalette(true);
  });

  return (
    <Dialog open={showCommandPalette} onOpenChange={setShowCommandPalette}>
      <>
        <DialogTrigger asChild>
          <Button
            className="relative"
            appearance="outlined"
            leadingIcon={<Icon name="Sparkles" className="mr-1 h-4 w-4" />}
          >
            <span>Ask AI</span>
          </Button>
        </DialogTrigger>
      </>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ask AI</DialogTitle>

          <DialogDescription>
            Ask AI a question about Postgres and SQL{' '}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            disabled={isLoading}
            {...register('prompt', {
              required: true,
            })}
            id="prompt"
            name="prompt"
            type="text"
            placeholder={'your question...'}
          />
        </form>

        {response && (
          <div
            className="prose-sm rounded-md bg-app-subtle p-5"
            dangerouslySetInnerHTML={{
              __html: response,
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
