import { readDesignSystemComponentSource } from '@/views/design-system/lib/helper.server';
import {
    ComponentDocument,
    ComponentDocumentHeader,
    ComponentDocumentPlayground,
    ComponentDocumentUsage,
    ComponentDocumentSource
} from '@/views/design-system/ui';

import { CallOut } from '@/design-system/display/call-out';
import { Icon } from '@/design-system/display/icon';
import { Button } from '@/design-system/input/button';

export default async function Page() {
    const category = 'display';
    const component = 'call-out';
    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title={component}
                filePath={source.filePath}
                description="강조가 필요한 메시지를 시각적으로 분리해 전달하는 안내/알림용 컴포넌트입니다."
            />

            <ComponentDocumentPlayground>
                <div className="space-y-3">
                    <CallOut
                        variant="info"
                        icon={<Icon name="InfoCircledIcon" />}
                        title="시스템 점검 안내"
                        description="오늘 23:00 ~ 23:30 동안 일부 API 응답이 지연될 수 있습니다."
                    />
                    <CallOut variant="success" icon={<Icon name="CheckCircledIcon" />} title="저장 완료" description="변경 사항이 정상적으로 저장되었습니다." />
                    <CallOut
                        variant="warning"
                        icon={<Icon name="ExclamationTriangleIcon" />}
                        title="주의"
                        description="권한 설정이 누락되어 일부 기능을 사용할 수 없습니다."
                    />
                    <CallOut
                        variant="danger"
                        icon={<Icon name="CrossCircledIcon" />}
                        title="실패"
                        description="요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
                    />
                </div>
            </ComponentDocumentPlayground>

            <ComponentDocumentUsage>
                <pre className="overflow-auto rounded-md bg-black/90 p-4 text-sm text-white">
                    {`import { CallOut } from '@/design-system/display/call-out';
import { Icon } from '@/design-system/display/icon';

<CallOut
    variant="warning"
    icon={<Icon name="ExclamationTriangleIcon" />}
    title="주의"
    description="권한 설정이 누락되어 일부 기능을 사용할 수 없습니다."
/>`}
                </pre>
            </ComponentDocumentUsage>

            <ComponentDocumentSource source={source.text} />
        </ComponentDocument>
    );
}
