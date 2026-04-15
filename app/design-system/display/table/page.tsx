import { readDesignSystemComponentSource } from '@/views/design-system/lib/helper.server';
import {
    ComponentDocument,
    ComponentDocumentHeader,
    ComponentDocumentPlayground,
    ComponentDocumentUsage,
    ComponentDocumentSource
} from '@/views/design-system/ui';

export default async function Page() {
    const category = 'display';
    const component = 'table';
    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title={component}
                filePath={source.filePath}
                description="행과 열 구조로 데이터를 비교·조회할 수 있도록 구성하는 테이블 컴포넌트입니다."
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
