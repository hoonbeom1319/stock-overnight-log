import { Switch } from '@/design-system/input/switch';

import { readDesignSystemComponentSource } from '../lib/helper.server';
import { ComponentDocument, ComponentDocumentHeader, ComponentDocumentPlayground, ComponentDocumentSource, ComponentDocumentUsage } from '../ui';

export const InputSwitch = async () => {
    const category = 'input';
    const component = 'switch';
    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title={component}
                filePath={source.filePath}
                description="설정형 on/off 상태를 빠르게 전환하는 토글 입력 컴포넌트입니다."
            />
            <ComponentDocumentPlayground>
                <div className="space-y-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                    <label className="flex items-center justify-between gap-4 text-sm text-on-surface">
                        <span>Auto-save changes</span>
                        <Switch defaultChecked />
                    </label>
                    <label className="flex items-center justify-between gap-4 text-sm text-on-surface">
                        <span>Push notifications</span>
                        <Switch />
                    </label>
                    <label className="flex items-center justify-between gap-4 text-sm text-on-surface-variant">
                        <span>Disabled toggle</span>
                        <Switch disabled />
                    </label>
                </div>
            </ComponentDocumentPlayground>
            <ComponentDocumentUsage>
                <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4 text-sm leading-relaxed text-on-surface-variant">
                    스위치는 즉시 반영되는 설정(자동 저장, 알림 등)에 사용하고, 확인이 필요한 작업은 버튼 액션으로 분리합니다.
                </div>
            </ComponentDocumentUsage>
            <ComponentDocumentSource source={source.text} />
        </ComponentDocument>
    );
};
