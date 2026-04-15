import { readDesignSystemComponentSource } from '@/views/design-system/lib/helper.server';
import {
    ComponentDocument,
    ComponentDocumentHeader,
    ComponentDocumentPlayground,
    ComponentDocumentUsage,
    ComponentDocumentSource
} from '@/views/design-system/ui';

export default async function Page() {
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
                description="사용자 액션을 트리거하는 기본 인터랙션 컴포넌트입니다."
            />
            <ComponentDocumentPlayground>
                <div>Playground</div>
            </ComponentDocumentPlayground>
            <ComponentDocumentUsage>
                <div>Usage</div>
            </ComponentDocumentUsage>
            <ComponentDocumentSource source={source.text} />
        </ComponentDocument>
    );
}
