'use client';
import { useAtom } from 'jotai';
import { selectedLayoutAtom, showResultPanelAtom } from '@/utils/atoms';
import { Icon } from './shared/icon';
import { cn } from '@/utils/cn';
import { ConfigurationDialog } from './configure';
import { ThemeSelect } from './theme-select';

export const Toolbar = () => {
  const [layout, setLayout] = useAtom(selectedLayoutAtom);
  const [showResultPanel, setShowResultPanel] = useAtom(showResultPanelAtom);

  return (
    <div className="sticky top-0 z-30 px-4 lg:px-6 flex items-center justify-between py-4 border-b border-b-gray-subtle bg-app">
      <div className="inline-flex items-center">
        <a href="https://neon.tech" rel="noopener" target="_blank">
          <Icon name="Logo" />
        </a>
        <svg
          fill="none"
          height="26"
          shapeRendering="geometricPrecision"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="ml-1.5"
        >
          <path d="M16.88 3.549L7.12 20.451"></path>
        </svg>
        <span className="ml-1 lg:text-lg font-semibold">
          Postgres AI Playground
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex space-x-3">
          <ThemeSelect />
          <div className="flex items-center justify-center space-x-5 rounded-md border border-gray-primary px-4 py-2">
            <button
              onClick={() => setLayout('horizontal')}
              className={cn(
                'rounded-sm hover:text-gray-high-contrast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-hover focus-visible:ring-offset-2 focus-visible:ring-offset-app',
                layout === 'horizontal' &&
                  'text-gray-high-contrast hover:text-gray-high-contrast'
              )}
            >
              <Icon className="h-4 w-4" name="Columns" />
            </button>

            <button
              onClick={() => setLayout('vertical')}
              className={cn(
                'rounded-sm hover:text-gray-high-contrast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-hover focus-visible:ring-offset-2 focus-visible:ring-offset-app',
                layout === 'vertical' &&
                  'text-gray-high-contrast hover:text-gray-high-contrast'
              )}
            >
              <Icon className="h-4 w-4 rotate-90" name="Columns" />
            </button>

            <button
              onClick={() => setShowResultPanel(!showResultPanel)}
              className={cn(
                'rounded-sm hover:text-gray-high-contrast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-hover focus-visible:ring-offset-2 focus-visible:ring-offset-app',
                showResultPanel &&
                  'text-gray-high-contrast hover:text-gray-high-contrast'
              )}
            >
              <Icon className="h-4 w-4" name="Square" />
            </button>
          </div>
        </div>
        <ConfigurationDialog />
      </div>{' '}
    </div>
  );
};