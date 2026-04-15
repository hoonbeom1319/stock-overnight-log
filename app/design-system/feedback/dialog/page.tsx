import { readDesignSystemComponentSource } from '@/views/design-system/lib/helper.server';
import {
    ComponentDocument,
    ComponentDocumentHeader,
    ComponentDocumentPlayground,
    ComponentDocumentUsage,
    ComponentDocumentSource
} from '@/views/design-system/ui';

export default async function Page() {
    const category = 'feedback';
    const component = 'dialog';
    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title={component}
                filePath={source.filePath}
                description="중요한 확인이나 추가 입력을 위해 화면 위에 띄우는 모달 대화상자 컴포넌트입니다."
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
