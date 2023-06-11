import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './shared/accordion';
import {Icon, type IconProps} from './shared/icon';

type ObjectPropName = IconProps['name']

interface ObjectProps {
  name: ObjectPropName
  data: any
}
export const Object = ({ name, data }: ObjectProps) => {
  return (
    <Accordion className="text-sm" type="multiple">
      <AccordionItem value={name}>
        <AccordionTrigger className="my-1.5 flex items-center">
          <Icon className="mr-1 h-4 w-4" name={name} /> <span>{name} </span>
          <span className="ml-2 text-xs">{data.length}</span>
        </AccordionTrigger>
        <AccordionContent className="ml-3">
          {
            data.map((item: any) => (
              <Accordion key={item.table_name} type="multiple">
                <AccordionItem value={item.table_name}>
                  <AccordionTrigger className="my-1.5">
                    {item.table_name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Accordion type="multiple">
                      <AccordionItem value="columns">
                        <AccordionTrigger className="relative my-1.5 ml-6">
                          Columns
                          <span className="ml-2 text-xs">
                            {item.columns.length}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="ml-12">
                          <div className="mb-3 space-y-4">
                            {
                              item.columns.map((column: any) => (
                                <div
                                  key={column.column_name}
                                  className="flex items-center space-x-3"
                                >
                                  <span className="flex-1">
                                    {column.column_name}
                                  </span>
                                  <span className="text-xs inline-flex items-center whitespace-nowrap rounded-full bg-element px-2.5 py-0.5">
                                    {column.data_type}
                                  </span>
                                </div>
                              ))
                            }
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="indexes">
                        <AccordionTrigger className="mb-3 ml-6">
                          Indexes{' '}
                          <span className="ml-2 text-xs">
                            {item.indexes.length}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="ml-12">
                          <div className="mb-3 space-y-3">
                            {
                              item.indexes.map((databaseIndex: any) => (
                                <div
                                  key={databaseIndex.indexname}
                                  className="flex space-x-3"
                                >
                                  <span className="flex-1">
                                    {databaseIndex.indexname}
                                  </span>
                                </div>
                              ))
                            }
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))
          }
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
