'use client';
import { useAtom } from 'jotai';
import { useMemo, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { queryResultAtom } from '~/lib/utils/atoms';
import { cn } from '~/lib/utils/cn';
import { Editor } from './editor';
import { Result } from './result';
import { Sidebar } from './sidebar';

type Props = {
  mainLayout: number[];
  nestedLayout: number[];
  nestedlayoutDirection: 'horizontal' | 'vertical';
};

export const Panels = ({ mainLayout, nestedLayout, nestedlayoutDirection }: Props) => {
  const [queryResult] = useAtom(queryResultAtom);
  const [isDragging, setIsDragging] = useState(false);

  const duration = useMemo(() => {
    return queryResult ? Date.now() - Number(queryResult.startTime) : 0;
  }, [queryResult]);

  const handleMainLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:mainLayout=${JSON.stringify(sizes)}`;
  };

  const handleNestedLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:nestedLayout=${JSON.stringify(sizes)}`;
  };

  return (
    <div className="relative">
      <div className={cn('h-[93vh]')}>
        <PanelGroup direction="horizontal" onLayout={handleMainLayout}>
          <Panel maxSize={50} className="bg-app flex flex-col" defaultSize={mainLayout[0]}>
            <Sidebar />
          </Panel>
          <PanelResizeHandle
            onDragging={setIsDragging}
            className={cn(
              'w-2 border-r border-r-muted hover:border-r-muted-hover focus-visible:border-r-2 focus-visible:border-r-primary-hover focus-visible:outline-none',
              isDragging && 'border-r-muted-active'
            )}
          />
          <Panel defaultSize={mainLayout[1]}>
            <PanelGroup direction={nestedlayoutDirection} onLayout={handleNestedLayout}>
              <Panel defaultSize={nestedLayout[0]}>
                <Editor />
              </Panel>
              <PanelResizeHandle
                className={cn(
                  nestedlayoutDirection === 'horizontal'
                    ? 'w-2 border-l border-l-muted hover:border-l-muted-hover focus-visible:border-l-2 focus-visible:border-l-primary-hover'
                    : 'h-2 w-full border-t border-t-muted hover:border-b-muted-hover focus-visible:border-b-2 focus-visible:border-b-primary-hover ',
                  'focus-visible:outline-none'
                )}
              />
              <Panel
                defaultSize={nestedLayout[1]}
                className={cn(
                  'flex flex-col',
                  nestedlayoutDirection === 'horizontal' ? 'h-full' : 'h-full'
                )}
              >
                {queryResult && <p className="mx-3 mt-3 text-sm">Ran in {duration}ms</p>}
                <Result />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};
