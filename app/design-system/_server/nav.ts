import 'server-only';

import { promises as fs } from 'node:fs';
import path from 'node:path';

export type DesignSystemCategory = 'display' | 'feedback' | 'input' | 'layout' | 'navigation' | 'surface';

export type DesignSystemNavItem = {
    category: DesignSystemCategory;
    components: string[];
};

const CATEGORIES: DesignSystemCategory[] = ['display', 'feedback', 'input', 'layout', 'navigation', 'surface'];

function isTsxComponentFile(name: string) {
    return name.endsWith('.tsx') && !name.endsWith('.test.tsx') && !name.endsWith('.stories.tsx');
}

function toComponentSlug(filename: string) {
    return filename.replace(/\.tsx$/, '');
}

export async function getDesignSystemNav(): Promise<DesignSystemNavItem[]> {
    const root = process.cwd();
    const dsRoot = path.join(root, 'design-system');

    const items = await Promise.all(
        CATEGORIES.map(async (category) => {
            const dir = path.join(dsRoot, category);

            try {
                const entries = await fs.readdir(dir, { withFileTypes: true });
                const components = entries
                    .filter((e) => e.isFile() && isTsxComponentFile(e.name))
                    .map((e) => toComponentSlug(e.name))
                    .sort((a, b) => a.localeCompare(b));

                return { category, components };
            } catch {
                return { category, components: [] };
            }
        })
    );

    return items;
}
