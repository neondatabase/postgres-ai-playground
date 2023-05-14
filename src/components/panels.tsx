'use client';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { useAtom } from 'jotai';
import { cn } from '@/utils/cn';
import {
  hasConfiguredDatabaseAtom,
  queryResultAtom,
  selectedLayoutAtom,
  showResultPanelAtom,
} from '@/utils/atoms';
import { Results } from './results';
import { Sidebar } from './sidebar';
import { Editor } from './editor';
import { Banner } from './banner';

export const Panels = () => {
  const [selectedLayout] = useAtom(selectedLayoutAtom);
  const [showResultPanel] = useAtom(showResultPanelAtom);
  const [hasConfiguredDatabase] = useAtom(hasConfiguredDatabaseAtom);
  const [queryResult] = useAtom(queryResultAtom);

  // @ts-ignore
  const duration = queryResult && Date.now() - queryResult?.startTime;

  return (
    <div className="relative">
      {!hasConfiguredDatabase && (
        <>
          <Banner />
        </>
      )}
      <div className={cn('h-[92vh]')}>
        <PanelGroup direction="horizontal">
          <Panel
            className="flex flex-col bg-app"
            defaultSize={12}
            minSize={12}
            maxSize={50}
          >
            <Sidebar />
          </Panel>
          <PanelResizeHandle className="w-2 focus-visible:outline-none border-r border-r-gray-subtle focus-visible:border-r-2 focus-visible:border-r-primary-hover" />
          <Panel defaultSize={88} minSize={50}>
            <PanelGroup direction={selectedLayout}>
              <Panel defaultSize={45} minSize={10}>
                <Editor />
              </Panel>
              <PanelResizeHandle
                className={cn(
                  selectedLayout === 'horizontal'
                    ? 'w-2 border-l border-l-gray-subtle focus-visible:border-l-2 focus-visible:border-l-primary-hover'
                    : 'h-2 border-t border-t-gray-subtle w-full focus-visible:border-b-2 focus-visible:border-b-primary-hover',
                  'focus-visible:outline-none'
                )}
              />
              {showResultPanel && (
                <Panel
                  defaultSize={40}
                  className={cn(
                    'flex flex-col',
                    selectedLayout === 'horizontal' ? 'h-full' : 'h-full'
                  )}
                >
                  {queryResult && (
                    <p className="mx-3 mt-3 text-sm">Ran in {duration}ms</p>
                  )}
                  <Results />
                </Panel>
              )}
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};
