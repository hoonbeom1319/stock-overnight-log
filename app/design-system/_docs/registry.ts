import type { DesignSystemDocEntry } from '@/app/design-system/_docs/types';

type DocLoader = () => Promise<DesignSystemDocEntry>;

const docLoaders: Record<string, DocLoader> = {
    'feedback/confirm': async () => (await import('@/app/design-system/_docs/feedback/confirm')).confirmDoc
};

export async function getDesignSystemDoc(key: string): Promise<DesignSystemDocEntry | undefined> {
    const loader = docLoaders[key];
    if (!loader) return undefined;
    return loader();
}
