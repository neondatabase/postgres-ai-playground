'use client';
import CodeMirror from '@uiw/react-codemirror';
import { sql, PostgreSQL } from '@codemirror/lang-sql';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import { keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { EditorView } from '@codemirror/view';
import {
  connectionStringAtom,
  editorSchemaAtom,
  queryAtom,
  queryResultAtom,
  schemaAtom,
  showCommandPaletteAtom,
} from '@/utils/atoms';
import { useAtom } from 'jotai';
import { Button } from './shared/button';
import { runQuery } from '@/utils/query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import { toast } from 'react-hot-toast';
import { Icon } from './shared/icon';
import createTheme from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

const myTheme = createTheme({
  theme: 'dark',
  settings: {
    background: '#151718',
    foreground: '#c9d1d9',
    caret: '#c9d1d9',
    selection: '#003d73',
    selectionMatch: '#003d73',
    lineHighlight: '#36334280',

    gutterBackground: 'transparent',
    gutterForeground: 'rgb(155, 161, 166,0.6)',
  },
  styles: [
    { tag: [t.standard(t.tagName), t.tagName], color: '#7ee787' },
    { tag: [t.comment, t.bracket], color: '#8b949e' },
    { tag: [t.className, t.propertyName], color: '#d2a8ff' },
    {
      tag: [t.variableName, t.attributeName, t.number, t.operator],
      color: '#79c0ff',
    },
    {
      tag: [t.keyword, t.typeName, t.typeOperator, t.typeName],
      color: '#ff7b72',
    },
    { tag: [t.string, t.meta, t.regexp], color: '#a5d6ff' },
    { tag: [t.name, t.quote], color: '#7ee787' },
    { tag: [t.heading], color: '#d2a8ff', fontWeight: 'bold' },
    { tag: [t.emphasis], color: '#d2a8ff', fontStyle: 'italic' },
    { tag: [t.deleted], color: '#ffdcd7', backgroundColor: 'ffeef0' },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#ffab70' },
    { tag: t.link, textDecoration: 'underline' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.invalid, color: '#f97583' },
  ],
});

export const Editor = () => {
  const { resolvedTheme } = useTheme();
  const [connectionString] = useAtom(connectionStringAtom);
  const [queryResult, setQueryResult] = useAtom(queryResultAtom);
  const [showCommandPalette, setShowCommandPalette] = useAtom(
    showCommandPaletteAtom
  );
  const [hasConfiguredDatabase] = useAtom(connectionStringAtom);
  const [editorSchema] = useAtom(editorSchemaAtom);
  const [schema, setSchema] = useAtom(schemaAtom);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    // @ts-ignore
    async (query: string) => await runQuery({ query, connectionString }),
    {
      onSuccess: (data) => {
        // @ts-ignore
        setQueryResult(data);
        setSchema(data.databaseSchema);
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
        theme={resolvedTheme === 'dark' ? myTheme : githubLight}
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
                if (hasConfiguredDatabase) {
                  setShowCommandPalette(true);
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
        height="92vh"
      />
      <div className="sticky bottom-10 mx-5 float-right">
        <Button
          onClick={() => {
            mutate(query);
          }}
          loading={isLoading}
          disabled={query.trimEnd() === '' || !hasConfiguredDatabase}
        >
          <Icon name="Play" className="mr-1 h-4 w-4" />
          Run query{' '}
        </Button>
      </div>
    </>
  );
};
