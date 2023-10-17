import { getNestedLayoutDirection } from '~/lib/utils/panels-layout';
import { Banner } from './banner';
import { Chat } from './chat';
import { ConnectDialog } from './connect-dialog';
import { LayoutSwitcher } from './layout-switcher';
import { Logo } from './logo';
import { ThemeSelect } from './theme-select';

export const Toolbar = () => {
  const nestedLayoutDirection = getNestedLayoutDirection();

  return (
    <div className="bg-app sticky top-0 flex items-center justify-between border-b border-b-muted px-4 py-4 lg:px-6">
      <div className="inline-flex items-center space-x-3">
        <a
          className="focus-visible:ring-offset-app rounded-md p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-hover focus-visible:ring-offset-2"
          href="https://neon.tech"
          rel="noopener"
          target="_blank"
        >
          <Logo />
        </a>
        <span className="ml-2 font-medium text-muted-high-contrast">AI Playground</span>
      </div>
      <div className="flex items-center space-x-3">
        <Banner />
        <ThemeSelect />
        <LayoutSwitcher nestedLayoutDirection={nestedLayoutDirection} />
        <Chat />
        <ConnectDialog />
      </div>
    </div>
  );
};
