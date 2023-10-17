import { SheetDescription, SheetHeader, SheetTitle } from '~/components/ui/sheet';

export const Header = () => {
  return (
    <SheetHeader>
      <SheetTitle>AI Chatbot</SheetTitle>
      <SheetDescription>You can ask questions about Postgres and your schema</SheetDescription>
    </SheetHeader>
  );
};
