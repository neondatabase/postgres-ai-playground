import type { Message } from 'ai';
import { useEffect, useRef } from 'react';
import { ScrollArea } from '~/components/ui/scroll-area';
import { cn } from '~/lib/utils/cn';
import { Code } from './code';

type Props = {
  messages: Message[];
};

export const Messages = ({ messages }: Props) => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);

  return (
    <>
      <ScrollArea className="flex-grow">
        {messages.length === 0 ? (
          <div className="border border-primary bg-primary-element text-muted-high-contrast p-5 rounded-md">
            <p>
              You can start a conversation here and experiment with different prompts depending on
              your schema. Here are a few examples:
            </p>
            <ul className="space-y-2 mt-3 ml-8 list-disc">
              <li>Create a database schema for a podcast app</li>
              <li>Get me employees whose salary is less than 50000</li>
              <li>Total amount of orders for each customer </li>
            </ul>
          </div>
        ) : (
          messages.map((message) => (
            <ul
              ref={listRef}
              key={message.id}
              className={cn(
                '',
                message.role === 'user'
                  ? 'rounded-md bg-primary-element text-muted-high-contrast py-1.5 px-3 max-w-max overflow ml-auto mb-3'
                  : 'bg-muted-element'
              )}
            >
              <li>
                {message.role === 'user'
                  ? message.content
                  : message.role === 'assistant' && <Code response={message.content} />}
              </li>
            </ul>
          ))
        )}
      </ScrollArea>
    </>
  );
};
