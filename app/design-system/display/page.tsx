import { getDesignSystemNav } from '@/views/design-system/lib/helper.server';
import { CategoryView } from '@/views/design-system/ui';

export default async function Page() {
    const nav = await getDesignSystemNav();
    const category = 'display';
    const current = nav.find((n) => n.category === category);

    return <CategoryView category={category} components={current?.components ?? []} />;
}
