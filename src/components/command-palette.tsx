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
import useClipboard from 'react-use-clipboard';
import { cn } from '@/utils/cn';

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

  const [isCopied, setCopied] = useClipboard(response!, {
    successDuration: 1000,
  });

  return (
    <Dialog open={showCommandPalette} onOpenChange={setShowCommandPalette}>
      <>
        <DialogTrigger asChild>
          <Button
            className="relative group"
            appearance="outlined"
            leadingIcon={<Icon name="Sparkles" className="mr-1 h-4 w-4" />}
          >
            <span>Ask AI</span>
            <span className="group-hover:text-gray-high-contrast hidden lg:inline-flex bg-element text-xs px-1.5 py-0.5 items-center ml-2 text-gray-base -mr-1 rounded ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="align-middle"
              >
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
              </svg>{' '}
              + <span className="font-mono">k</span>
            </span>
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
          <>
            <div
              className="prose-sm rounded-md bg-app-subtle p-5"
              dangerouslySetInnerHTML={{
                __html: response,
              }}
            />

            <button
              type="button"
              className={cn(
                'ml-auto overflow-hidden rounded-full py-1 pl-2 pr-3 text-xs font-medium backdrop-blur transition hover:text-gray-high-contrast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-hover focus-visible:ring-offset-2 focus-visible:ring-offset-app',
                isCopied ? '' : ''
              )}
              onClick={setCopied}
            >
              <span
                aria-hidden={isCopied}
                className={cn(
                  'pointer-events-none flex items-center gap-1 transition duration-300',
                  isCopied && '-translate-y-1.5 opacity-0'
                )}
              >
                <Icon name="Copy" className="h-4 w-4 transition-colors" />
                Copy
              </span>
              <span
                aria-hidden={!isCopied}
                className={cn(
                  'pointer-events-none absolute inset-0 flex items-center justify-center transition duration-300',
                  !isCopied && 'translate-y-1.5 opacity-0'
                )}
              >
                Copied!
              </span>
            </button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
