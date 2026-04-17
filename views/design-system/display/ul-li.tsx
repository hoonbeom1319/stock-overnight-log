import { Li, Ul } from '@/design-system/display/ul-li';

import { readDesignSystemComponentSource } from '../lib/helper.server';
import { ComponentDocument, ComponentDocumentHeader, ComponentDocumentPlayground, ComponentDocumentSource, ComponentDocumentUsage } from '../ui';

const ITEMS = [
    'Components must be responsive and accessible by default.',
    'Depth is achieved through tonal layering, not shadows.',
    'Colors follow the Material Design 3 naming conventions.'
];

export const DisplayUnorderedList = async () => {
    const category = 'display';
    const component = 'ul-li';
    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title="ul-li"
                filePath={source.filePath}
                description="Display Showcase의 Unordered List 블록을 기준으로, 간격/불릿 크기/문장 밀도를 일관되게 맞춘 리스트 컴포넌트입니다."
            />
            <ComponentDocumentPlayground>
                <div className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6">
                            <div className="mb-3 text-xs font-bold tracking-[0.12em] text-slate-500 uppercase">Default Bullet</div>
                            <Ul>
                                {ITEMS.map((item) => (
                                    <Li key={item}>{item}</Li>
                                ))}
                            </Ul>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-6">
                            <div className="mb-3 text-xs font-bold tracking-[0.12em] text-slate-500 uppercase">Muted Bullet</div>
                            <Ul>
                                {ITEMS.map((item) => (
                                    <Li key={item} className="text-slate-600 text-[50px]" markerClassName="bg-slate-400">
                                        {item}
                                    </Li>
                                ))}
                            </Ul>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
                        <div className="text-sm font-semibold text-indigo-800">List Collections</div>
                        <p className="mt-1 text-sm text-indigo-700">Display 영역에서 문장이 길어도 불릿과 텍스트의 시작선이 안정적으로 맞춰집니다.</p>
                    </div>
                </div>
            </ComponentDocumentPlayground>
            <ComponentDocumentUsage>
                <div className="space-y-3 text-sm leading-relaxed">
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="text-xs font-semibold tracking-wide">기본 패턴</div>
                        <div className="mt-1 text-slate-600">
                            항목 그룹에는 <code className="rounded bg-black/5 px-1 py-0.5">Ul</code>, 각 줄에는{' '}
                            <code className="rounded bg-black/5 px-1 py-0.5">Li</code>를 사용해 구조와 표현을 분리합니다.
                        </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="text-xs font-semibold tracking-wide">문장 길이 대응</div>
                        <div className="mt-1 text-slate-600">
                            여러 줄로 줄바꿈될 때도 불릿이 위쪽 기준점에 고정되도록 설계되어, 문단형 리스트에서 가독성이 유지됩니다.
                        </div>
                    </div>
                </div>
            </ComponentDocumentUsage>
            <ComponentDocumentSource source={source.text} />
        </ComponentDocument>
    );
};
