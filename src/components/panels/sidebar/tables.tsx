import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';

import { TableIcon } from '@radix-ui/react-icons';

type Props = {
  name: 'tables' | 'views';
  tables: Table[];
};

type Trigger = {
  trigger_name: string;
  trigger_type: string;
  table_name: string;
  function_name: string;
};

type Table = {
  table_name: string;
  columns: {
    column_name: string;
    data_type: string;
  }[];
  indexes: string[];
  triggers: Trigger[];
};

export const Tables = ({ name, tables }: Props) => {
  if (tables.length === 0) {
    return null;
  }

  return (
    <Accordion className="text-sm" type="multiple">
      <AccordionItem value={name}>
        <AccordionTrigger className="my-1.5 flex items-center">
          <TableIcon className="mr-1 h-4 w-4" /> <span className="capitalize">{name}</span>
          <span className="ml-2 text-xs">{tables.length}</span>
        </AccordionTrigger>
        <AccordionContent className="ml-3">
          {tables.map((item) => (
            <Accordion key={item.table_name} type="multiple">
              <AccordionItem value={item.table_name}>
                <AccordionTrigger className="my-1.5">{item.table_name}</AccordionTrigger>
                <AccordionContent>
                  <Accordion type="multiple">
                    <AccordionItem value="columns">
                      <AccordionTrigger className="relative my-1.5 ml-6">
                        Columns
                        <span className="ml-2 text-xs">{item.columns.length}</span>
                      </AccordionTrigger>
                      <AccordionContent className="ml-12">
                        <div className="mb-3 space-y-4">
                          {item.columns.map((column: any) => (
                            <div key={column.column_name} className="flex items-center space-x-3">
                              <span className="flex-1">{column.column_name}</span>
                              <span className="text-xs inline-flex items-center whitespace-nowrap rounded-full bg-primary-element text-primary-high-contrast px-2.5 py-0.5">
                                {column.data_type}
                              </span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    {item.indexes.length > 0 && (
                      <AccordionItem value="indexes">
                        <AccordionTrigger className="mb-3 ml-6">
                          Indexes <span className="ml-2 text-xs">{item.indexes.length}</span>
                        </AccordionTrigger>
                        <AccordionContent className="ml-12">
                          <div className="mb-3 space-y-3">
                            {item.indexes.map((index) => (
                              <div key={index} className="flex space-x-3">
                                <span className="flex-1">{index}</span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )}

                    {item.triggers.length > 0 && (
                      <AccordionItem value="triggers">
                        <AccordionTrigger className="mb-3 ml-6">
                          Triggers <span className="ml-2 text-xs">{item.triggers.length}</span>
                        </AccordionTrigger>
                        <AccordionContent className="ml-12">
                          <div className="mb-3 space-y-3">
                            {item.triggers.map((trigger) => (
                              <div key={trigger.trigger_name} className="flex space-x-3">
                                <span className="flex-1">
                                  {trigger.trigger_name} {trigger.trigger_type}
                                </span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
