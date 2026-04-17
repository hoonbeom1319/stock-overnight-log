import { Button } from '@/design-system/input/button';

import { readDesignSystemComponentSource } from '../lib/helper.server';
import { ComponentDocument, ComponentDocumentHeader, ComponentDocumentPlayground, ComponentDocumentSource, ComponentDocumentUsage } from '../ui';

export const InputButton = async () => {
    const category = 'input';
    const component = 'button';
    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title={component}
                filePath={source.filePath}
                description="Input Components 화면의 액션 영역을 기준으로 primary/secondary/outline 버튼 변형을 제공합니다."
            />
            <ComponentDocumentPlayground>
                <div className="space-y-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                    <div className="grid gap-3 md:grid-cols-3">
                        <Button variant="primary">Primary Action</Button>
                        <Button variant="secondary">Secondary Action</Button>
                        <Button variant="outline">Outlined Action</Button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-3">
                        <Button variant="primary" disabled>
                            Primary Disabled
                        </Button>
                        <Button variant="secondary" disabled>
                            Secondary Disabled
                        </Button>
                        <Button variant="outline" disabled>
                            Outline Disabled
                        </Button>
                    </div>
                </div>
            </ComponentDocumentPlayground>
            <ComponentDocumentUsage>
                <div className="space-y-3 text-sm leading-relaxed">
                    <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                        <div className="text-xs font-semibold tracking-wide">액션 우선순위</div>
                        <div className="mt-1 text-on-surface-variant">한 섹션 안에서는 primary 버튼을 1개로 제한해 사용자의 주 동작을 명확히 합니다.</div>
                    </div>
                </div>
            </ComponentDocumentUsage>
            <ComponentDocumentSource source={source.text} />
        </ComponentDocument>
    );
};
