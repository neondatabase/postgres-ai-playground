'use client';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useLocalStorage } from 'usehooks-ts';
import { Drawer } from 'vaul';
import { cn } from '~/lib/utils/cn';
import { Button } from '../ui/button';

export const Banner = () => {
  const [showBanner, setShowBanner] = useLocalStorage('showBanner', true);
  const { resolvedTheme } = useTheme();

  return (
    <Drawer.Root
      open={showBanner}
      onOpenChange={setShowBanner}
      onClose={() => setShowBanner(false)}
      shouldScaleBackground
    >
      <Drawer.Trigger asChild>
        <Button variant="ghost">
          How it works <QuestionMarkCircledIcon className="ml-2" />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="border border-muted z-10 bg-muted-element flex flex-col rounded-t-[10px] h-[70%] mt-24 fixed bottom-0 left-0 right-0 focus-visible:border-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-muted-app
            transition-colors outline-none "
        >
          <div className="p-4 mb-5 bg-muted-element rounded-t-[10px] flex-1 overflow-y-auto">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted-solid mb-8" />

            <div className={cn('mx-auto prose', resolvedTheme === 'dark' && 'prose-invert')}>
              <Drawer.Title className="font-medium mb-10 text-lg text-center">
                How the playground works
              </Drawer.Title>
              <p>
                This playground enables you to connect to a Neon Postgres database directly from
                your browser. That&apos;s because it uses the{' '}
                <a
                  className="focus-visible:border-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-muted-app transition-colors outline-none rounded-md"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/neondatabase/serverless"
                >
                  Neon Serverless driver
                </a>
                , a low-latency Postgres driver for JavaScript and TypeScript that allows you to
                query data from serverless and edge environments over HTTP or WebSockets in place of
                TCP.
              </p>

              <p>
                If you don&apos;t have a Neon database, you can{' '}
                <a
                  className="focus-visible:border-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-muted-app transition-colors outline-none rounded-md"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://console.neon.tech/?utm_source=sql-playground&utm_medium=banner"
                >
                  create one for free
                </a>
                . Once you have a database, click connect in top right and enter the connection
                details.
              </p>
              <form
                action="https://console.neon.tech/?utm_source=sql-playground&utm_medium=banner"
                className="flex justify-center pt-10"
              >
                <Button type="submit" size={'lg'}>
                  Sign Up
                </Button>
              </form>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
