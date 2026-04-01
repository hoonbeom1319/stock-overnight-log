'use client';

import { useState } from 'react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardTitle,
    Collapse,
    CollapseContent,
    CollapseTrigger,
    Container,
    Input,
    Menu,
    MenuClose,
    MenuContent,
    MenuTrigger,
    RadioGroup,
    RadioGroupItem,
    Icon,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Typography
} from '@/design-system';

export default function DesignSystemPage() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Container className="space-y-4 py-6">
            <Card>
                <CardTitle>Design System Playground</CardTitle>
                <CardDescription>Radix UI 기반 컴포넌트 미리보기</CardDescription>
                <CardContent className="mt-4 space-y-3">
                    <div className="flex gap-2">
                        <Button>Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="ghost">Ghost</Button>
                    </div>
                    <Input placeholder="종목명을 입력해보세요" />
                    <RadioGroup defaultValue="buy" className="flex items-center gap-3">
                        <label htmlFor="trade-buy" className="flex cursor-pointer items-center gap-2 text-sm text-secondary-900">
                            <RadioGroupItem id="trade-buy" value="buy" />
                            매수
                        </label>
                        <label htmlFor="trade-sell" className="flex cursor-pointer items-center gap-2 text-sm text-secondary-900">
                            <RadioGroupItem id="trade-sell" value="sell" />
                            매도
                        </label>
                    </RadioGroup>
                    <Select defaultValue="single">
                        <SelectTrigger>
                            <SelectValue placeholder="전략 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="single">시간외 단일가</SelectItem>
                            <SelectItem value="scalp">단타</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex items-center gap-2">
                        <Icon name="PlusIcon" className="text-primary-700" />
                        <Typography variant="label-100-B" className="text-primary-700">
                            icon + typography token example
                        </Typography>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardTitle>Tabs / Accordion / Collapse</CardTitle>
                <CardContent className="space-y-4">
                    <Tabs defaultValue="tab-1">
                        <TabsList>
                            <TabsTrigger value="tab-1">기본</TabsTrigger>
                            <TabsTrigger value="tab-2">확장</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tab-1" className="text-sm text-primary-700">
                            모바일 우선 토큰 적용 예시
                        </TabsContent>
                        <TabsContent value="tab-2" className="text-sm text-primary-700">
                            Radix primitive 조합 예시
                        </TabsContent>
                    </Tabs>

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>아코디언 열기</AccordionTrigger>
                            <AccordionContent>컨텐츠 블록을 확장해 보여줍니다.</AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Collapse open={isOpen} onOpenChange={setIsOpen}>
                        <CollapseTrigger asChild>
                            <Button variant="secondary">{isOpen ? '접기' : '펼치기'}</Button>
                        </CollapseTrigger>
                        <CollapseContent className="pt-2 text-sm text-primary-700">
                            Collapsible 기반의 간단한 collapse 컴포넌트입니다.
                        </CollapseContent>
                    </Collapse>
                </CardContent>
            </Card>

            <Card>
                <CardTitle>Mobile Menu</CardTitle>
                <CardContent>
                    <Menu>
                        <MenuTrigger asChild>
                            <Button size="lg" className="w-full">
                                메뉴 열기
                            </Button>
                        </MenuTrigger>
                        <MenuContent>
                            <div className="space-y-3">
                                <p className="text-sm text-primary-900">모바일 하단 시트 스타일 메뉴 예시입니다.</p>
                                <MenuClose asChild>
                                    <Button variant="secondary" className="w-full">
                                        닫기
                                    </Button>
                                </MenuClose>
                            </div>
                        </MenuContent>
                    </Menu>
                </CardContent>
            </Card>
        </Container>
    );
}
