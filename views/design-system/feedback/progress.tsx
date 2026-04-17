import { CircularProgress, CircularSpinner, LinearProgress } from '@/design-system/feedback/progress';

import { readDesignSystemComponentSource } from '../lib/helper.server';
import { ComponentDocument, ComponentDocumentHeader, ComponentDocumentPlayground, ComponentDocumentSource, ComponentDocumentUsage } from '../ui';

export const FeedbackProgress = async () => {
    const category = 'feedback';
    const component = 'progress';
    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title="progress"
                filePath={source.filePath}
                description="Feedback Showcase의 Progress Bars 섹션을 기준으로 determinate/indeterminate 선형 진행바와 원형 진행 표현을 구성했습니다."
            />
            <ComponentDocumentPlayground>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-5 rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                        <div className="text-xs font-semibold tracking-[0.12em] text-on-surface-variant uppercase">Linear Progress</div>
                        <div className="space-y-2">
                            <div className="flex items-end justify-between">
                                <span className="text-xs font-semibold text-on-surface">System Backup</span>
                                <span className="text-xs font-semibold text-primary">45%</span>
                            </div>
                            <LinearProgress value={70} />
                        </div>
                        <div className="space-y-2">
                            <div className="text-xs font-semibold text-on-surface">Searching archives...</div>
                            <LinearProgress indeterminate value={50}/>
                            <div className="text-[11px] text-on-surface-variant italic">This may take a few moments</div>
                        </div>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                        <div className="text-xs font-semibold tracking-[0.12em] text-on-surface-variant uppercase">Circular Progress</div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center gap-2 rounded-xl bg-surface-container-low p-4">
                                <CircularProgress value={75} />
                                <span className="text-[10px] font-bold tracking-wide text-on-surface-variant uppercase">Storage</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 rounded-xl bg-surface-container-low p-4">
                                <CircularSpinner />
                                <span className="text-[10px] font-bold tracking-wide text-on-surface-variant uppercase">Loading</span>
                            </div>
                        </div>
                    </div>
                </div>
            </ComponentDocumentPlayground>
            <ComponentDocumentUsage>
                <div className="space-y-3 text-sm leading-relaxed">
                    <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                        <div className="text-xs font-semibold tracking-wide">결정형/비결정형 분리</div>
                        <div className="mt-1 text-on-surface-variant">
                            값이 있을 때는 <code className="rounded bg-surface-container-high px-1 py-0.5">value</code>를 전달하고, 진행률을 모를 때는{' '}
                            <code className="rounded bg-surface-container-high px-1 py-0.5">indeterminate</code>를 사용해 의미를 구분합니다.
                        </div>
                    </div>
                    <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                        <div className="text-xs font-semibold tracking-wide">원형 진행률 계산</div>
                        <div className="mt-1 text-on-surface-variant">
                            <code className="rounded bg-surface-container-high px-1 py-0.5">CircularProgress</code>는 전달된 value/max를 0~100%로 보정한 뒤 SVG stroke를 계산해
                            안정적으로 렌더링합니다.
                        </div>
                    </div>
                </div>
            </ComponentDocumentUsage>
            <ComponentDocumentSource source={source.text} />
        </ComponentDocument>
    );
};
