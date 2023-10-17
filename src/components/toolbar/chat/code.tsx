import { PostgreSQL, sql } from '@codemirror/lang-sql';
import { EditorView } from '@codemirror/view';

import { githubDark, githubLight } from '@uiw/codemirror-theme-github';

import CodeMirror from '@uiw/react-codemirror';
import { useAtom } from 'jotai';
import { useTheme } from 'next-themes';
import useClipboard from 'react-use-clipboard';
import { CopyButton } from '~/components/copy-button';
import { Button } from '~/components/ui/button';
import { queryAtom, showChatAtom } from '~/lib/utils/atoms';

export const Code = ({ response }: { response: string }) => {
  const { resolvedTheme } = useTheme();
  const [query, setQuery] = useAtom(queryAtom);
  const [isCopied, setCopied] = useClipboard(response, {
    successDuration: 1000,
  });

  const [showChat, setShowChat] = useAtom(showChatAtom);

  return (
    <div className="space-y-5 mb-10">
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
        className="prose-sm rounded-md editor border-muted border overflow-auto max-h-96"
        value={response}
      />

      <div className="flex justify-end space-x-2">
        <CopyButton text={response} />
        <Button
          variant="outline"
          onClick={() => {
            setQuery(query + response);
            setShowChat(false);
          }}
        >
          Append result
        </Button>
        <Button
          onClick={() => {
            setQuery(response);
            setShowChat(false);
          }}
        >
          Replace code
        </Button>
      </div>
    </div>
  );
};
