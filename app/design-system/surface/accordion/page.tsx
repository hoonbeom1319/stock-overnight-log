import { readDesignSystemComponentSource } from '@/views/design-system/lib/helper.server';
import {
    ComponentDocument,
    ComponentDocumentHeader,
    ComponentDocumentPlayground,
    ComponentDocumentUsage,
    ComponentDocumentSource
} from '@/views/design-system/ui';

export default async function Page() {
    const category = 'surface';
    const component = 'accordion';
    const source = await readDesignSystemComponentSource(category, component);
    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title={component}
                filePath={source.filePath}
                description="여러 섹션을 접고 펼치며 정보 밀도를 조절할 수 있는 아코디언 컴포넌트입니다."
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
