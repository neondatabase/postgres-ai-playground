import { MagicWandIcon } from '@radix-ui/react-icons';
import { useAtom } from 'jotai';
import { Button } from '~/components/ui/button';
import { SheetTrigger as Trigger } from '~/components/ui/sheet';
import { hasConfiguredDatabaseAtom } from '~/lib/utils/atoms';

export const SheetTrigger = () => {
  const [hasConfiguredDatabase] = useAtom(hasConfiguredDatabaseAtom);

  return (
    <Trigger asChild disabled={!hasConfiguredDatabase}>
      <Button variant="outline">
        <MagicWandIcon className="w-4 h-4 mr-2" /> <span>Ask AI</span>
        <span className="group-hover:text-muted-high-contrast hidden lg:inline-flex bg-muted-element px-1.5 items-center ml-2 text-muted-base -mr-1 rounded text-xs">
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
    </Trigger>
  );
};
