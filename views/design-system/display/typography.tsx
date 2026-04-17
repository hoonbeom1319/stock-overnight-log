import * as OlRoot from '@/design-system/display/ol-li';
import { Typography } from '@/design-system/display/typography';
import { Li, Ul } from '@/design-system/display/ul-li';

import { readDesignSystemComponentSource } from '../lib/helper.server';
import { ComponentDocument, ComponentDocumentHeader, ComponentDocumentPlayground, ComponentDocumentSource, ComponentDocumentUsage } from '../ui';

export const DisplayTypography = async () => {
    const category = 'display';
    const component = 'typography';
    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title="typography"
                filePath={source.filePath}
                description="Stitch Display 화면의 헤딩/본문 계층을 기준으로 텍스트 스타일을 일관되게 적용합니다."
            />
            <ComponentDocumentPlayground>
                <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-12">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:col-span-8">
                            <div className="mb-4 font-mono text-xs tracking-wide text-slate-500 uppercase">H1 / Display Large</div>
                            <Typography variant="title-100-B" className="text-slate-900 md:text-[3rem]">
                                The quick brown fox jumps over the lazy dog
                            </Typography>
                        </div>
                        <div className="rounded-2xl bg-indigo-600 p-6 text-white md:col-span-4">
                            <div className="text-2xl">Tt</div>
                            <div className="mt-5 space-y-2">
                                <div className="text-lg font-bold">Editorial Scale</div>
                                <div className="text-sm text-indigo-100">Hierarchy is defined with spacing and tonal cards rather than heavy borders.</div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        <div className="border-b border-slate-200 p-5">
                            <div className="text-lg font-bold tracking-tight text-slate-900">Heading Scale</div>
                        </div>
                        <div className="divide-y divide-slate-200">
                            <div className="flex flex-col gap-2 p-5 md:flex-row md:items-center md:justify-between">
                                <Typography variant="title-50-B">
                                    H2 Secondary Display
                                </Typography>
                                <span className="font-mono text-xs text-slate-500">36px / 1.2 / -0.01em</span>
                            </div>
                            <div className="flex flex-col gap-2 p-5 md:flex-row md:items-center md:justify-between">
                                <Typography variant="subtitle-100-B" className="text-[1.875rem]">
                                    H3 Tertiary Display
                                </Typography>
                                <span className="font-mono text-xs text-slate-500">30px / 1.3 / -0.01em</span>
                            </div>
                            <div className="flex flex-col gap-2 p-5 md:flex-row md:items-center md:justify-between">
                                <Typography as="h4" variant="subtitle-100-M" className="text-[1.5rem]">
                                    H4 Small Display
                                </Typography>
                                <span className="font-mono text-xs text-slate-500">24px / 1.4 / 0</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6">
                            <div className="mb-3 text-xs font-bold tracking-[0.12em] text-slate-500 uppercase">Body & Paragraphs</div>
                            <div className="space-y-4">
                                <Typography variant="body-100-R">
                                    Lucid leverages white space as a structural element. Paragraphs should maintain a line-height of 1.6 to ensure readability.
                                </Typography>
                                <Typography as="p" variant="body-50-M" className="text-slate-600">
                                    Secondary body text uses on-surface-variant to create a natural hierarchy for metadata and supporting content.
                                </Typography>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-6">
                            <div className="mb-3 text-xs font-bold tracking-[0.12em] text-slate-500 uppercase">Monospace & Semantic</div>
                            <pre className="overflow-auto rounded-lg bg-slate-900 p-4 text-xs text-slate-100">
                                <code>{`const lucid = {
  type: 'Typography',
  font: 'Inter',
  scale: 'Editorial'
};`}</code>
                            </pre>
                            <div className="mt-4 flex flex-wrap gap-2 font-mono text-xs">
                                <span className="rounded bg-indigo-100 px-2.5 py-1 text-indigo-700">v1.0.4-stable</span>
                                <span className="rounded bg-rose-100 px-2.5 py-1 text-rose-700">error: missing_token</span>
                                <span className="rounded bg-slate-200 px-2.5 py-1 text-slate-700">0.342ms</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6">
                            <div className="mb-3 text-xs font-bold tracking-[0.12em] text-slate-500 uppercase">Unordered List</div>
                            <Ul>
                                <Li>Components must be responsive and accessible by default.</Li>
                                <Li>Depth is achieved through tonal layering, not shadows.</Li>
                                <Li>Colors follow the Material Design 3 naming conventions.</Li>
                            </Ul>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-6">
                            <div className="mb-3 text-xs font-bold tracking-[0.12em] text-slate-500 uppercase">Ordered List</div>
                            <OlRoot.Ol>
                                <OlRoot.Li order={1}>Define the semantic layer of your application first.</OlRoot.Li>
                                <OlRoot.Li order={2}>Apply typography scale consistently across views.</OlRoot.Li>
                                <OlRoot.Li order={3}>Review contrast ratios for accessibility compliance.</OlRoot.Li>
                            </OlRoot.Ol>
                        </div>
                    </div>
                </div>
            </ComponentDocumentPlayground>
            <ComponentDocumentUsage>
                <div className="space-y-3 text-sm leading-relaxed">
                    <div className="rounded-xl border bg-white p-4">
                        <div className="text-xs font-semibold tracking-wide">계층 우선</div>
                        <div className="text-muted-foreground mt-1">본문보다 제목의 대비와 굵기를 먼저 정하고, 레이아웃은 그 다음에 맞춥니다.</div>
                    </div>
                    <div className="rounded-xl border bg-white p-4">
                        <div className="text-xs font-semibold tracking-wide">역할 기반 적용</div>
                        <div className="text-muted-foreground mt-1">
                            헤딩은 <code className="rounded bg-black/5 px-1 py-0.5">title-*</code>, 일반 텍스트는{' '}
                            <code className="rounded bg-black/5 px-1 py-0.5">body-*</code>를 사용해 용도를 분리합니다.
                        </div>
                    </div>
                    <div className="rounded-xl border bg-white p-4">
                        <div className="text-xs font-semibold tracking-wide">태그 전략</div>
                        <div className="text-muted-foreground mt-1">
                            variant에 따라 기본 semantic 태그가 지정되며(예: <code className="rounded bg-black/5 px-1 py-0.5">title-100-*</code>은{' '}
                            <code className="rounded bg-black/5 px-1 py-0.5">h1</code>, <code className="rounded bg-black/5 px-1 py-0.5">title-50-*</code>은{' '}
                            <code className="rounded bg-black/5 px-1 py-0.5">h2</code>), <code className="rounded bg-black/5 px-1 py-0.5">as</code>가 전달되면
                            그 값을 우선 사용합니다.
                        </div>
                    </div>
                </div>
            </ComponentDocumentUsage>
            <ComponentDocumentSource source={source.text} />
        </ComponentDocument>
    );
};
