import { readDesignSystemComponentSource } from '@/views/design-system/lib/helper.server';
import {
    ComponentDocument,
    ComponentDocumentHeader,
    ComponentDocumentPlayground,
    ComponentDocumentUsage,
    ComponentDocumentSource
} from '@/views/design-system/ui';

export default async function Page() {
    const category = 'layout';
    const component = 'portal';
    const source = await readDesignSystemComponentSource(category, component);
    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title={component}
                filePath={source.filePath}
                description="DOM 트리 바깥 특정 루트로 UI를 렌더링할 때 사용하는 포털 유틸 컴포넌트입니다."
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
