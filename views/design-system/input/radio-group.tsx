import { RadioGroup, RadioGroupItem } from '@/design-system/input/radio-group';

import { readDesignSystemComponentSource } from '../lib/helper.server';
import { ComponentDocument, ComponentDocumentHeader, ComponentDocumentPlayground, ComponentDocumentSource, ComponentDocumentUsage } from '../ui';

export const InputRadioGroup = async () => {
    const category = 'input';
    const component = 'radio-group';
    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title={component}
                filePath={source.filePath}
                description="여러 옵션 중 하나만 선택하는 단일 선택 입력 컴포넌트입니다."
            />
            <ComponentDocumentPlayground>
                <div className="space-y-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                    <RadioGroup defaultValue="system" className="space-y-3">
                        <label className="flex items-center gap-3 text-sm text-on-surface">
                            <RadioGroupItem value="system" />
                            System Default
                        </label>
                        <label className="flex items-center gap-3 text-sm text-on-surface">
                            <RadioGroupItem value="light" />
                            Always Light
                        </label>
                        <label className="flex items-center gap-3 text-sm text-on-surface">
                            <RadioGroupItem value="dark" />
                            Deep Space
                        </label>
                    </RadioGroup>
                </div>
            </ComponentDocumentPlayground>
            <ComponentDocumentUsage>
                <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4 text-sm leading-relaxed text-on-surface-variant">
                    같은 그룹의 항목에는 동일한 선택 맥락(예: 테마 선호)을 부여해 의미를 분명하게 유지합니다.
                </div>
            </ComponentDocumentUsage>
            <ComponentDocumentSource source={source.text} />
        </ComponentDocument>
    );
};
