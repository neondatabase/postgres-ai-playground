'use client';
import CodeMirror from '@uiw/react-codemirror';
import { sql, PostgreSQL } from '@codemirror/lang-sql';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import { keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { EditorView } from '@codemirror/view';
import {
  connectionStringAtom,
  queryAtom,
  queryResultAtom,
  showCommandPaletteAtom,
} from '@/utils/atoms';
import { useAtom } from 'jotai';
import { Button } from './shared/button';
import { runQuery } from '@/utils/query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import { toast } from 'react-hot-toast';
import { Icon } from './shared/icon';

export const Editor = () => {
  const { resolvedTheme } = useTheme();
  const [connectionString] = useAtom(connectionStringAtom);
  const [queryResult, setQueryResult] = useAtom(queryResultAtom);
  const [showCommandPalette, setShowCommandPalette] = useAtom(
    showCommandPaletteAtom
  );

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async (query: string) => await runQuery({ query, connectionString }),
    {
      onSuccess: (data) => {
        setQueryResult(data);
        queryClient.invalidateQueries({ queryKey: ['schema'] });
      },
      onError: (error) => {
        toast.error(`Error running query: ${error}`);
      },
    }
  );

  const executeQuery = () => {
    if (query.trimEnd() === '') return;
    mutate(query);
  };

  const [query, setQuery] = useAtom(queryAtom);

  return (
    <>
      <CodeMirror
        theme={resolvedTheme === 'dark' ? githubDark : githubLight}
        value={query}
        basicSetup={{
          defaultKeymap: false,
        }}
        placeholder="Write your query here..."
        onChange={(value) => setQuery(value)}
        extensions={[
          EditorView.lineWrapping,
          keymap.of([
            {
              key: 'Mod-Enter',
              run: () => {
                executeQuery();
                return true;
              },
              ...defaultKeymap,
            },
            {
              key: 'Mod-k',
              run: () => {
                setShowCommandPalette(true);
                return true;
              },
              ...defaultKeymap,
            },
          ]),
          sql({
            dialect: PostgreSQL,
            upperCaseKeywords: true,
          }),
        ]}
        height="92vh"
      />
      <div className="sticky bottom-10 mx-5 float-right">
        <Button
          onClick={() => {
            mutate(query);
          }}
          loading={isLoading}
          disabled={query.trimEnd() === ''}
        >
          <Icon name="Play" className="mr-1 h-4 w-4" />
          Run query{' '}
        </Button>
      </div>
    </>
  );
};
