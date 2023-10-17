'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import { cn } from '~/lib/utils/cn';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn(className)} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex items-center justify-between rounded-md transition-all hover:text-muted-high-contrast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-hover focus-visible:ring-offset-2 focus-visible:ring-offset-muted-app [&[data-state=open]>.icon]:rotate-90',
        className
      )}
      {...props}
    >
      <ChevronRightIcon className="icon mr-2 h-3.5 w-3.5 flex-1 transition-transform duration-200" />
      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden transition-all',
      className
    )}
    {...props}
  >
    <div>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
