import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';

import { CodeIcon } from '@radix-ui/react-icons';

type Props = {
  data: Function[];
};

type Function = {
  function_name: string;
};

export const Functions = ({ data }: Props) => {
  if (data.length === 0) {
    return null;
  }

  return (
    <Accordion className="text-sm" type="multiple">
      <AccordionItem value="functions">
        <AccordionTrigger className="my-1.5 flex items-center">
          <CodeIcon className="mr-1 h-4 w-4" /> <span className="capitalize">Functions</span>
          <span className="ml-2 text-xs">{data.length}</span>
        </AccordionTrigger>
        <AccordionContent className="ml-9 ">
          {data.map((item) => (
            <p className="mb-3" key={item.function_name}>
              {item.function_name}
            </p>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
