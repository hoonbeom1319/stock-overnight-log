import { Slider } from '@/design-system/input/slider';

import { readDesignSystemComponentSource } from '../lib/helper.server';
import { ComponentDocument, ComponentDocumentHeader, ComponentDocumentPlayground, ComponentDocumentSource, ComponentDocumentUsage } from '../ui';

export const InputSlider = async () => {
    const category = 'input';
    const component = 'slider';
    const source = await readDesignSystemComponentSource(category, component);

    return (
        <ComponentDocument>
            <ComponentDocumentHeader
                category={category}
                component={component}
                title={component}
                filePath={source.filePath}
                description="연속적인 범위 값을 조절할 때 사용하는 슬라이더 입력 컴포넌트입니다."
            />
            <ComponentDocumentPlayground>
                <div className="space-y-6 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-on-surface">Opacity Level</span>
                            <span className="rounded bg-primary-fixed px-2 py-0.5 text-primary">85%</span>
                        </div>
                        <Slider defaultValue={[85]} max={100} step={1} />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-on-surface">Storage Limit</span>
                            <span className="text-on-surface-variant">256 GB / 512 GB</span>
                        </div>
                        <Slider defaultValue={[50]} max={100} step={5} />
                    </div>
                </div>
            </ComponentDocumentPlayground>
            <ComponentDocumentUsage>
                <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4 text-sm leading-relaxed text-on-surface-variant">
                    정밀 입력이 필요한 경우 슬라이더와 숫자 입력 필드를 함께 제공해 접근성과 정확도를 동시에 확보합니다.
                </div>
            </ComponentDocumentUsage>
            <ComponentDocumentSource source={source.text} />
        </ComponentDocument>
    );
};
