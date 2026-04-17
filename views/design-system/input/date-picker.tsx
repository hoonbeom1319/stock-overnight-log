import { DatePicker } from '@/design-system/input/date-picker';

import { readDesignSystemComponentSource } from '../lib/helper.server';
import { ComponentDocument, ComponentDocumentHeader, ComponentDocumentPlayground, ComponentDocumentSource, ComponentDocumentUsage } from '../ui';

export const InputDatePicker = async () => {
    const category = 'input';
    const component = 'date-picker';
    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title={component}
                filePath={source.filePath}
                description="날짜 선택 흐름을 위해 기본 date input을 토큰 스타일로 감싼 컴포넌트입니다."
            />
            <ComponentDocumentPlayground>
                <div className="grid gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 md:grid-cols-2">
                    <label className="space-y-2 text-sm">
                        <span className="font-medium text-on-surface">Start Date</span>
                        <DatePicker defaultValue="2026-04-17" />
                    </label>
                    <label className="space-y-2 text-sm">
                        <span className="font-medium text-on-surface">End Date</span>
                        <DatePicker />
                    </label>
                </div>
            </ComponentDocumentPlayground>
            <ComponentDocumentUsage>
                <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4 text-sm leading-relaxed text-on-surface-variant">
                    날짜 포맷은 브라우저 로케일에 따르므로 서버 저장 시 ISO 포맷으로 정규화하는 것을 권장합니다.
                </div>
            </ComponentDocumentUsage>
            <ComponentDocumentSource source={source.text} />
        </ComponentDocument>
    );
};
