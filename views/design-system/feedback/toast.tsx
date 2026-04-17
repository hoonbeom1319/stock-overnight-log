import { readDesignSystemComponentSource } from '../lib/helper.server';
import { ComponentDocument, ComponentDocumentHeader, ComponentDocumentPlayground, ComponentDocumentSource, ComponentDocumentUsage } from '../ui';

import { Playground } from './toast/ui/playground';

export const FeedbackToast = async () => {
    const category = 'feedback';
    const component = 'toast';
    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title="toast"
                filePath={source.filePath}
                description="Radix Toast primitive 기반으로 상태별 알림 스타일을 조합하고, 사용자 액션으로 등장하는 실제 토스트 흐름을 playground에서 검증합니다."
            />
            <ComponentDocumentPlayground>
                <Playground />
            </ComponentDocumentPlayground>
            <ComponentDocumentUsage>
                <div className="space-y-3 text-sm leading-relaxed">
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="text-xs font-semibold tracking-wide">Primitive 책임 분리</div>
                        <div className="mt-1 text-slate-600">
                            접근성 동작(노출/닫기/viewport)은 <code className="rounded bg-black/5 px-1 py-0.5">primitive/toast</code>에 두고,{' '}
                            <code className="rounded bg-black/5 px-1 py-0.5">feedback/toast</code>는 variant와 스타일 조합만 담당합니다.
                        </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="text-xs font-semibold tracking-wide">액션 기반 표시</div>
                        <div className="mt-1 text-slate-600">
                            playground는 버튼 클릭 시 토스트가 나타나도록 구성해 실제 사용자 흐름(트리거 → 노출 → 액션/닫기)을 확인할 수 있습니다.
                        </div>
                    </div>
                </div>
            </ComponentDocumentUsage>
            <ComponentDocumentSource source={source.text} />
        </ComponentDocument>
    );
};
