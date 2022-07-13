import { IconType } from '@openfin/ui-library';

export interface Pill {
    text: string;
    icon: IconType;
    tooltip?: string;
}

export enum LoadState {
    Loading = 'loading',
    Error = 'error',
    Loaded = 'loaded',
}

export enum SortOrder {
    Ascending = 'asc',
    Descending = 'des',
}

export enum SortField {
    Name = 'name',
    Cpu = 'cpu',
    Memory = 'memory',
}

export enum Modals {
    Launch = 'launch',
    ManifestViewer = 'manifest-viewer',
}
export interface SortMode {
    field: SortField;
    order: SortOrder;
}

export interface Action {
    icon: IconType;
    action: () => void;
    tooltip?: string;
    active?: boolean;
}

export interface Modal {
    type: Modals;
    title: string;
    payload?: unknown;
}
