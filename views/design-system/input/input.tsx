import { Input } from '@/design-system/input/input';

import { readDesignSystemComponentSource } from '../lib/helper.server';
import { ComponentDocument, ComponentDocumentHeader, ComponentDocumentPlayground, ComponentDocumentSource, ComponentDocumentUsage } from '../ui';

export const InputField = async () => {
    const category = 'input';
    const component = 'input';
    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title={component}
                filePath={source.filePath}
                description="텍스트 입력의 기본 레이어로, placeholder/disabled/invalid 상태를 일관된 토큰으로 표현합니다."
            />
            <ComponentDocumentPlayground>
                <div className="grid gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 md:grid-cols-2">
                    <label className="space-y-2 text-sm">
                        <span className="font-medium text-on-surface">Full Name</span>
                        <Input placeholder="John Doe" />
                    </label>
                    <label className="space-y-2 text-sm">
                        <span className="font-medium text-on-surface">Email</span>
                        <Input type="email" placeholder="email@example.com" />
                    </label>
                    <label className="space-y-2 text-sm">
                        <span className="font-medium text-on-surface">API Secret</span>
                        <Input aria-invalid value="api_key_expired_9f90..." readOnly />
                    </label>
                    <label className="space-y-2 text-sm">
                        <span className="font-medium text-on-surface">Disabled</span>
                        <Input placeholder="Disabled state" disabled />
                    </label>
                </div>
            </ComponentDocumentPlayground>
            <ComponentDocumentUsage>
                <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4 text-sm leading-relaxed text-on-surface-variant">
                    에러 상태는 <code className="rounded bg-surface-container-high px-1 py-0.5">aria-invalid</code>를 사용해 의미와 스타일을 함께 전달합니다.
                </div>
            </ComponentDocumentUsage>
            <ComponentDocumentSource source={source.text} />
        </ComponentDocument>
    );
};
