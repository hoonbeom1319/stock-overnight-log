import { notFound } from 'next/navigation';

import { readDesignSystemComponentSource } from '@/views/design-system/lib/helper.server';
import { CATEGORIES } from '@/views/design-system/lib/const';
import {
    ComponentDocument,
    ComponentDocumentHeader,
    ComponentDocumentPlayground,
    ComponentDocumentSource,
    ComponentDocumentUsage
} from '@/views/design-system/ui';

type Params = {
    category: string;
    component: string;
};

const isCategory = (value: string): value is (typeof CATEGORIES)[number] => {
    return CATEGORIES.includes(value as (typeof CATEGORIES)[number]);
};

export default async function Page({ params }: { params: Promise<Params> }) {
    const { category, component } = await params;

    if (!isCategory(category)) {
        notFound();
    }

    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title={component}
                filePath={source.filePath}
                description="공통 문서 라우트입니다. 구현이 완료되면 이 페이지에서 source를 즉시 검토할 수 있습니다."
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
