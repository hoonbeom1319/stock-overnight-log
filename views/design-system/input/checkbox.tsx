import { Checkbox } from '@/design-system/input/checkbox';

import { readDesignSystemComponentSource } from '../lib/helper.server';
import { ComponentDocument, ComponentDocumentHeader, ComponentDocumentPlayground, ComponentDocumentSource, ComponentDocumentUsage } from '../ui';

export const InputCheckbox = async () => {
    const category = 'input';
    const component = 'checkbox';
    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title={component}
                filePath={source.filePath}
                description="독립 선택이 필요한 옵션 세트를 위한 체크박스 입력 컴포넌트입니다."
            />
            <ComponentDocumentPlayground>
                <div className="space-y-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                    <label className="flex items-center gap-3 text-sm text-on-surface">
                        <Checkbox className="mt-0.5 shrink-0" defaultChecked />
                        <span className="min-w-0 leading-relaxed wrap-break-word">asdfsdaf sdaf asdf ds</span>
                    </label>
                    <label className="flex items-center gap-3 text-sm text-on-surface">
                        <Checkbox className="mt-0.5 shrink-0" />
                        <span className="min-w-0 leading-relaxed wrap-break-word">Marketing updates</span>
                    </label>
                    <label className="flex items-center gap-3 text-sm text-on-surface-variant">
                        <Checkbox className="mt-0.5 shrink-0" disabled />
                        <span className="min-w-0 leading-relaxed wrap-break-word">Disabled option</span>
                    </label>
                </div>
            </ComponentDocumentPlayground>
            <ComponentDocumentUsage>
                <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4 text-sm leading-relaxed text-on-surface-variant">
                    체크박스는 다중 선택 맥락에서 사용하고, 단일 선택 맥락에서는 radio-group을 사용합니다.
                </div>
            </ComponentDocumentUsage>
            <ComponentDocumentSource source={source.text} />
        </ComponentDocument>
    );
};
