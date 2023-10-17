import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { Button } from '~/components/ui/button';
import { Textarea, TextareaProps } from '~/components/ui/textarea';

export const Prompt = (props: TextareaProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Textarea
        autoFocus
        rows={1}
        className="resize-none"
        placeholder="Ask AI a question"
        {...props}
      />
      <Button type="submit" size="icon">
        <PaperPlaneIcon />
      </Button>
    </div>
  );
};
