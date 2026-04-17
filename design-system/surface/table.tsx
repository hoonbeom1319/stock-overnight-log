import type { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react';

import { cn } from '@/design-system/lib/utils';

export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
    return (
        <div className="w-full overflow-auto rounded-xl bg-white">
            <table className={cn('w-full caption-bottom text-sm', className)} {...props} />
        </div>
    );
}

export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
    return <thead className={cn('border-b border-secondary-400', className)} {...props} />;
}

export function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
    return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
    return <tr className={cn('border-b border-secondary-400 transition-colors hover:bg-secondary-100', className)} {...props} />;
}

export function TableHead({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
    return <th className={cn('h-11 px-4 text-left align-middle text-xs font-semibold text-secondary-700', className)} {...props} />;
}

export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
    return <td className={cn('px-4 py-3 align-middle text-secondary-700', className)} {...props} />;
}
