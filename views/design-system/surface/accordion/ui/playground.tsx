'use client';

import { Accordion as AccordionPrimitive, AccordionContent, AccordionItem, AccordionTrigger } from '@/design-system/surface/accordion';

const ITEMS = [
    {
        value: 'a',
        title: 'ACCORDION TITLE1',
        content: 'ACCORDION CONTENT1'
    },
    {
        value: 'b',
        title: 'ACCORDION TITLE2',
        content: 'ACCORDION CONTENT2'
    },
    {
        value: 'c',
        title: 'ACCORDION TITLE3',
        content: 'ACCORDION CONTENT3'
    }
];

export const Playground = () => {
    return (
        <div className="space-y-3">
            <AccordionPrimitive type="single" collapsible defaultValue="a" className="space-y-2">
                {ITEMS.map((item) => (
                    <AccordionItem key={item.value} value={item.value}>
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>{item.content}</AccordionContent>
                    </AccordionItem>
                ))}
            </AccordionPrimitive>
        </div>
    );
};
