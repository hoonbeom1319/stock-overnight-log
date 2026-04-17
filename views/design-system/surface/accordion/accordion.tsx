import { readDesignSystemComponentSource } from '../../lib/helper.server';
import { ComponentDocument, ComponentDocumentHeader, ComponentDocumentPlayground, ComponentDocumentUsage, ComponentDocumentSource } from '../../ui';

import { Playground } from './ui/playground';
import { Usage } from './ui/usage';

export const Accordion = async () => {
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
                <Playground />
            </ComponentDocumentPlayground>
            <ComponentDocumentUsage>
                <Usage />
            </ComponentDocumentUsage>
            <ComponentDocumentSource source={source.text} />
        </ComponentDocument>
    );
};
