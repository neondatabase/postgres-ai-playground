'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shared/dialog';
import { Button, CopyButton } from './shared/button';
import { Icon } from './shared/icon';
import { useForm } from 'react-hook-form';
import { TextInput } from './shared/text-input';
import { useAtom } from 'jotai';
import {
  schemaAtom,
  hasConfiguredDatabaseAtom,
  queryAtom,
  responseAtom,
  showCommandPaletteAtom,
} from '@/utils/atoms';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useHotkeys } from 'react-hotkeys-hook';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { PostgreSQL, sql } from '@codemirror/lang-sql';
import { useTheme } from 'next-themes';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { Spinner } from './shared/spinner';

type FormValues = {
  prompt: string;
};

export const CommandPalette = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [isOpen, setIsOpen] = useAtom(showCommandPaletteAtom);
  const [response, setResponse] = useAtom(responseAtom);
  const [hasConfiguredDatabase] = useAtom(hasConfiguredDatabaseAtom);
  const [schema] = useAtom(schemaAtom);
  const [query, setQuery] = useAtom(queryAtom);
  const { resolvedTheme } = useTheme();

  useHotkeys('meta+k', () => {
    if (hasConfiguredDatabase) {
      setIsOpen(true);
    }
  });

  const { mutate, isLoading } = useMutation(
    async ({ prompt }: FormValues) => {
      setResponse('');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            schema,
          }),
        }
      );

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
      onError: (error) => {
        toast.error(`Something went wrong: ${error}`);
      },
    }
  );

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <>
        <DialogTrigger asChild>
          <Button
            disabled={!hasConfiguredDatabase}
            className="relative group"
            appearance="outlined"
            leadingIcon={<Icon name="Sparkles" className="mr-1 h-4 w-4" />}
          >
            <span>Ask AI</span>
            <span className="group-hover:text-gray-high-contrast hidden lg:inline-flex bg-element px-1.5 items-center ml-2 text-gray-base -mr-1 rounded text-xs">
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
              + <span className="font-mono text-xs">k</span>
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
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <TextInput
            disabled={isLoading}
            {...register('prompt', {
              required: true,
            })}
            id="prompt"
            name="prompt"
            type="text"
            placeholder={'create a user table'}
          />
          {isLoading && <Spinner className="absolute right-2 top-2" />}
        </form>

        {response && (
          <>
            <CodeMirror
              basicSetup={{
                lineNumbers: false,
                foldGutter: false,
                highlightActiveLine: false,
              }}
              theme={resolvedTheme === 'dark' ? githubDark : githubLight}
              extensions={[
                EditorView.lineWrapping,
                sql({
                  dialect: PostgreSQL,
                  upperCaseKeywords: true,
                }),
              ]}
              editable={false}
              className="prose-sm rounded-md editor border-gray-subtle border overflow-auto max-h-96"
              value={response}
            />
            <div className="flex justify-end space-x-2">
              <CopyButton text={response} />
              <Button
                appearance="outlined"
                onClick={() => {
                  setQuery(query + response);
                  setIsOpen(false);
                }}
              >
                Append result
              </Button>
              <Button
                appearance="primary"
                onClick={() => {
                  setQuery(response);
                  setIsOpen(false);
                }}
              >
                Replace code
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
