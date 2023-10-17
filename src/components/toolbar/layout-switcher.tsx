'use client';
import { ViewHorizontalIcon, ViewVerticalIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { cn } from '~/lib/utils/cn';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const LayoutSwitcher = ({
  nestedLayoutDirection,
}: {
  nestedLayoutDirection: 'horizontal' | 'vertical';
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center space-x-6 rounded-md border border-muted px-4 py-2.5">
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button
            onClick={() => {
              document.cookie = `react-resizable-panels:nestedLayoutDirection=${JSON.stringify(
                'horizontal'
              )}`;
              router.refresh(); // this feels very hacky, but it works
            }}
            className={cn(
              'focus-visible:ring-offset-app rounded-sm hover:text-muted-high-contrast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-hover focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              nestedLayoutDirection === 'horizontal' &&
                'text-muted-high-contrast hover:text-muted-high-contrast'
            )}
          >
            <ViewVerticalIcon className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Horizonal layout</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button
            onClick={() => {
              document.cookie = `react-resizable-panels:nestedLayoutDirection=${JSON.stringify(
                'vertical'
              )}`;
              router.refresh();
            }}
            className={cn(
              'focus-visible:ring-offset-app rounded-sm hover:text-muted-high-contrast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-hover focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              nestedLayoutDirection === 'vertical' &&
                'text-muted-high-contrast hover:text-muted-high-contrast'
            )}
          >
            <ViewHorizontalIcon className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Vertical layout</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
