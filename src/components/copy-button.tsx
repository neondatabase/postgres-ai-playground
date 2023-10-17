import { CopyIcon } from '@radix-ui/react-icons';
import useClipboard from 'react-use-clipboard';
import { cn } from '~/lib/utils/cn';
import { Button } from './ui/button';

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setCopied] = useClipboard(text, {
    successDuration: 1000,
  });

  return (
    <Button
      onClick={setCopied}
      variant="outline"
      className="overflow-hidden backdrop-blur transition"
    >
      <span
        aria-hidden={isCopied}
        className={cn(
          'pointer-events-none flex items-center gap-1 transition duration-300',
          isCopied && '-translate-y-1.5 opacity-0'
        )}
      >
        <CopyIcon name="Copy" className="h-4 w-4 transition-colors" />
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
    </Button>
  );
};
