import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './design-system/**/*.{js,ts,jsx,tsx,mdx}',
        './entities/**/*.{js,ts,jsx,tsx,mdx}',
        './features/**/*.{js,ts,jsx,tsx,mdx}',
        './widgets/**/*.{js,ts,jsx,tsx,mdx}',
        './views/**/*.{js,ts,jsx,tsx,mdx}',
        './shared/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            zIndex: {
                base: 'var(--z-index-base)',
                content: 'var(--z-index-content)',
                sticky: 'var(--z-index-sticky)',
                header: 'var(--z-index-header)',
                dropdown: 'var(--z-index-dropdown)',
                popover: 'var(--z-index-popover)',
                tooltip: 'var(--z-index-tooltip)',
                backdrop: 'var(--z-index-backdrop)',
                modal: 'var(--z-index-modal)',
                toast: 'var(--z-index-toast)',
                blocking: 'var(--z-index-blocking)'
            }
        }
    },
    plugins: []
};

export default config;
