'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider, useAtom } from 'jotai';
import { ThemeProvider } from 'next-themes';
import { useHotkeys } from 'react-hotkeys-hook';
import { Toaster } from '~/components/ui/toast/toaster';
import { queryClient } from '~/lib/query-client';
import { showChatAtom } from '~/lib/utils/atoms';
import { TooltipProvider } from './ui/tooltip';

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  const [showChat, setshowChat] = useAtom(showChatAtom);

  useHotkeys('meta+k', () => setshowChat(true), [showChat]);

  return (
    <ThemeProvider attribute="data-theme">
      <Provider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            {children}
          </TooltipProvider>
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}
