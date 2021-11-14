export interface Pill {
  text: string;
  icon: JSX.Element;
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
}
export interface SortMode {
  field: SortField;
  order: SortOrder;
}

export interface Action {
  icon: JSX.Element;
  action: () => void;
  tooltip?: string;
  active?: boolean;
}

export interface Modal {
  type: Modals;
  title: string;
  payload?: string;
}
