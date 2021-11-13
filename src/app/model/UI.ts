export interface Pill {
  text: string;
  icon: JSX.Element;
}

export enum Page {
  Processes,
  Workspace,
}

export enum LoadState {
  LOADING = 'loading',
  ERROR = 'error',
  LOADED = 'loaded',
}

export enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'des',
}

export enum SortField {
  NAME = 'name',
  CPU = 'cpu',
  MEMORY = 'memory',
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
