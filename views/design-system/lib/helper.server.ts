import 'server-only';

import { promises as fs } from 'node:fs';
import path from 'node:path';

import { CATEGORIES } from '../lib/const';

export async function getDesignSystemNav() {
    const root = process.cwd();
    const dsRoot = path.join(root, 'design-system');

    const items = await Promise.all(
        CATEGORIES.map(async (category) => {
            const dir = path.join(dsRoot, category);

            try {
                const entries = await fs.readdir(dir, { withFileTypes: true });
                const components = entries
                    .filter(
                        (entry) => entry.isFile() && entry.name.endsWith('.tsx') && !entry.name.endsWith('.test.tsx') && !entry.name.endsWith('.stories.tsx')
                    )
                    .map((entry) => entry.name.replace(/\.tsx$/, ''))
                    .sort((a, b) => a.localeCompare(b));

                return { category, components };
            } catch {
                return { category, components: [] };
            }
        })
    );

    return items;
}

export async function readDesignSystemComponentSource(category: string, component: string) {
    const root = process.cwd();
    const filePath = path.join(root, 'design-system', category, `${component}.tsx`);

    try {
        const text = await fs.readFile(filePath, 'utf8');
        return { ok: true as const, filePath: `design-system/${category}/${component}.tsx`, text };
    } catch {
        return { ok: false as const, filePath: `design-system/${category}/${component}.tsx`, text: '' };
    }
}
