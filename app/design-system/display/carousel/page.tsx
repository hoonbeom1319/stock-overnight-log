import { readDesignSystemComponentSource } from '@/views/design-system/lib/helper.server';
import {
    ComponentDocument,
    ComponentDocumentUsage,
    ComponentDocumentSource,
    ComponentDocumentPlayground,
    ComponentDocumentHeader
} from '@/views/design-system/ui';

export default async function Page() {
    const category = 'display';
    const component = 'carousel';
    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title={component}
                filePath={source.filePath}
                description="여러 콘텐츠를 한 영역에서 좌우 전환으로 탐색할 수 있는 캐러셀 컴포넌트입니다."
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
