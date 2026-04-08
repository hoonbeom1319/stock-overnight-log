import type { ComponentType, ReactNode } from 'react';

export type DesignSystemDocEntry = {
    title: string;
    description?: ReactNode;
    Playground?: ComponentType;
    Usage?: ComponentType;
};

