import { Ol, Li } from '@/design-system/display/ol-li';

import { readDesignSystemComponentSource } from '../lib/helper.server';
import { ComponentDocument, ComponentDocumentHeader, ComponentDocumentPlayground, ComponentDocumentSource, ComponentDocumentUsage } from '../ui';

const ITEMS = [
    'Define the semantic layer of your application first.',
    'Apply typography scale consistently across views.',
    'Review contrast ratios for accessibility compliance.'
];

export const DisplayOrderedList = async () => {
    const category = 'display';
    const component = 'ol-li';
    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title="ol-li"
                filePath={source.filePath}
                description="Display Showcase의 Ordered List 패턴을 컴포넌트화한 버전으로, 단계형 안내에 맞는 번호 강조 스타일을 제공합니다."
            />
            <ComponentDocumentPlayground>
                <div className="space-y-5">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <div className="mb-3 text-xs font-bold tracking-[0.12em] text-slate-500 uppercase">Ordered List</div>
                        <Ol>
                            {ITEMS.map((item, index) => (
                                <Li key={item} order={index + 1}>
                                    {item}
                                </Li>
                            ))}
                        </Ol>
                    </div>
                    <Ol direction="horizontal">
                        {ITEMS.map((item, index) => (
                            <Li key={item} order={index + 1}>
                                {item}
                            </Li>
                        ))}
                    </Ol>
                </div>
            </ComponentDocumentPlayground>
            <ComponentDocumentUsage>
                <div className="space-y-3 text-sm leading-relaxed">
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="text-xs font-semibold tracking-wide">순서가 중요한 목록</div>
                        <div className="mt-1 text-slate-600">
                            단계/절차 안내처럼 순번이 의미를 가지는 경우 <code className="rounded bg-black/5 px-1 py-0.5">OlLi order</code>로 번호를 명시해
                            주세요.
                        </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="text-xs font-semibold tracking-wide">시맨틱 유지</div>
                        <div className="mt-1 text-slate-600">
                            표현은 커스텀 번호 배지로 바꾸더라도 루트는 <code className="rounded bg-black/5 px-1 py-0.5">ol</code>을 유지해 스크린리더가 순서를
                            인식하게 합니다.
                        </div>
                    </div>
                </div>
            </ComponentDocumentUsage>
            <ComponentDocumentSource source={source.text} />
        </ComponentDocument>
    );
};
