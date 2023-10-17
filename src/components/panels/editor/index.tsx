'use client';
import { defaultKeymap } from '@codemirror/commands';
import { PostgreSQL, sql } from '@codemirror/lang-sql';
import { EditorView, keymap } from '@codemirror/view';
import { PlayIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CodeMirror from '@uiw/react-codemirror';
import { useAtom } from 'jotai';
import { useTheme } from 'next-themes';
import { Button } from '~/components/ui/button';
import { useToast } from '~/components/ui/toast/use-toast';
import { useHasMounted } from '~/lib/hooks/use-has-mounted';

import { CopyButton } from '~/components/copy-button';
import {
  connectionStringAtom,
  editorSchemaAtom,
  hasConfiguredDatabaseAtom,
  queryAtom,
  queryResultAtom,
  showChatAtom,
} from '~/lib/utils/atoms';
import { runQuery } from '~/lib/utils/query';
import { theme } from './theme';

type RunQuery = {
  query: string;
  connectionString: string;
};
export const Editor = () => {
  const { toast } = useToast();
  const { resolvedTheme } = useTheme();
  const [connectionString] = useAtom(connectionStringAtom);
  const [queryResult, setQueryResult] = useAtom(queryResultAtom);
  const [query, setQuery] = useAtom(queryAtom);
  const [editorSchema] = useAtom(editorSchemaAtom);

  const [showChat, setshowChat] = useAtom(showChatAtom);
  const [hasConfiguredDatabase] = useAtom(hasConfiguredDatabaseAtom);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async ({ query, connectionString }: RunQuery) => {
      return await runQuery({ query, connectionString });
    },
    {
      onSuccess: (data) => {
        setQueryResult(data);
        queryClient.invalidateQueries({ queryKey: ['schema'] });
      },
      onError: (error) => {
        return toast({
          title: `Error running query`,
          description: `${error}`,
          action: <CopyButton text={`${error}`} />,
          duration: 8000,
        });
      },
    }
  );

  const executeQuery = () => {
    if (query.trimEnd() === '' || !connectionString) return;
    mutate({ query, connectionString });
  };

  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return <div className="bg-muted-app h-[93vh] relative" />;
  }

  return (
    <>
      <CodeMirror
        theme={resolvedTheme === 'dark' ? theme.dark : theme.light}
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
                if (hasConfiguredDatabase && query.trimEnd() !== '') {
                  executeQuery();
                }
                return true;
              },
              ...defaultKeymap,
            },
            {
              key: 'Mod-k',
              run: () => {
                if (hasConfiguredDatabase) {
                  setshowChat(true);
                }
                return true;
              },
              ...defaultKeymap,
            },
          ]),
          sql({
            dialect: PostgreSQL,
            upperCaseKeywords: true,
            schema: editorSchema?.schema,
            tables: editorSchema?.tables,
          }),
        ]}
        height="93vh"
      />
      <div className="sticky bottom-10 mx-5 float-right">
        <Button onClick={executeQuery} disabled={query.trimEnd() === '' || !hasConfiguredDatabase}>
          <PlayIcon className="mr-1 h-4 w-4" />
          {isLoading ? 'Running...' : 'Run query'}
        </Button>
      </div>
    </>
  );
};
