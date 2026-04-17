import { Icon } from '@/design-system/display/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/design-system/input/select';

import { readDesignSystemComponentSource } from '../lib/helper.server';
import { ComponentDocument, ComponentDocumentHeader, ComponentDocumentPlayground, ComponentDocumentSource, ComponentDocumentUsage } from '../ui';

export const InputSelect = async () => {
    const category = 'input';
    const component = 'select';
    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title={component}
                filePath={source.filePath}
                description="Radix Select primitive를 기반으로 옵션 선택 플로우를 토큰 스타일로 구성합니다."
            />
            <ComponentDocumentPlayground>
                <div className="grid gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-on-surface">Language</label>
                        <Select defaultValue="en">
                            <SelectTrigger>
                                <SelectValue placeholder="언어를 선택하세요" />
                                <Icon name="ChevronDownIcon" size={16} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="ko">Korean</SelectItem>
                                <SelectItem value="ja">Japanese</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-on-surface">Timezone</label>
                        <Select defaultValue="pst">
                            <SelectTrigger>
                                <SelectValue placeholder="시간대를 선택하세요" />
                                <Icon name="ChevronDownIcon" size={16} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pst">(GMT-08:00) Pacific Time</SelectItem>
                                <SelectItem value="est">(GMT-05:00) Eastern Time</SelectItem>
                                <SelectItem value="gmt">(GMT+00:00) London</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </ComponentDocumentPlayground>
            <ComponentDocumentUsage>
                <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4 text-sm leading-relaxed text-on-surface-variant">
                    placeholder가 있는 경우 <code className="rounded bg-surface-container-high px-1 py-0.5">SelectValue</code>로 선택 전 상태를 명확히 안내합니다.
                </div>
            </ComponentDocumentUsage>
            <ComponentDocumentSource source={source.text} />
        </ComponentDocument>
    );
};
