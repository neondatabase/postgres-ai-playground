'use client';

import { useAtom } from 'jotai';

import { Sheet, SheetContent } from '~/components/ui/sheet';
import { useToast } from '~/components/ui/toast/use-toast';

import { schemaAtom, showChatAtom } from '~/lib/utils/atoms';

import { useChat } from 'ai/react';
import { useEnterSubmit } from '~/lib/hooks/use-enter-submit';
import { Header } from './header';
import { Messages } from './messages';
import { Prompt } from './prompt';
import { SheetTrigger } from './sheet-trigger';

export const Chat = () => {
  const [showChat, setShowChat] = useAtom(showChatAtom);
  const { formRef, onKeyDown } = useEnterSubmit();
  const [schema] = useAtom(schemaAtom);
  const { toast } = useToast();

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    onError(error) {
      toast({
        title: `Error: ${error}`,
      });
    },
    body: {
      schema,
    },
  });

  return (
    <Sheet open={showChat} onOpenChange={setShowChat}>
      <SheetTrigger />
      <SheetContent className="flex flex-col space-y-5">
        <Header />
        <Messages messages={messages} />
        <form ref={formRef} onSubmit={handleSubmit}>
          <Prompt
            onKeyDown={onKeyDown}
            maxLength={500}
            disabled={isLoading}
            onChange={handleInputChange}
            value={input}
          />
        </form>
      </SheetContent>
    </Sheet>
  );
};
