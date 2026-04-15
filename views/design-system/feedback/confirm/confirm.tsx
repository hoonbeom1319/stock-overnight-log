import { readDesignSystemComponentSource } from '../../lib/helper.server';
import { ComponentDocument, ComponentDocumentHeader, ComponentDocumentPlayground, ComponentDocumentUsage, ComponentDocumentSource } from '../../ui';

import { Playground } from './ui/playground';
import { Usage } from './ui/usage';

export const Confirm = async () => {
    const category = 'feedback';
    const component = 'confirm';
    const source = await readDesignSystemComponentSource(category, component);

//여기서 useConfirmPlayground 를 사용하여 open 함수를 호출

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title={component}
                filePath={source.filePath}
                description={'Promise 기반 confirm(확인/취소) 다이얼로그'}
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
