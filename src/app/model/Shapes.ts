import { ApplicationInfo } from 'openfin/_v2/api/system/application';
import { Application as OFLegacyApplication } from 'openfin/_v2/main';
import { Identity } from 'openfin/_v2/identity';
import { ViewCreationOptions } from 'openfin/_v2/api/view/view';
import { Bounds } from 'openfin/_v2/shapes/shapes';

export interface OFEntityProcessDetails {
  entityType: string;
  uuid: string;
  name: string;
  cpuUsage: number;
  workingSetSize: number;
  pid: number;
  parent?: Identity;
}

export interface OFAppProcessInfo {
  uuid: string;
  entities: OFEntityProcessDetails[];
}

export type OFApplicationInfo = ApplicationInfo & {
  isPlatform: boolean;
};

export type OFApplication = OFLegacyApplication & {
  getProcessInfo: () => OFAppProcessInfo;
};

export interface OFManifest {
  shortcut?: { name?: string; icon: string };
  startup_app?: { uuid: string; name?: string; icon?: string; url: string };
  platform?: { uuid: string; applicationIcon: string };
}

export interface OFViewCreationOptions extends ViewCreationOptions {
  title?: string;
}

export interface Entity {
  pid: number;
  url: string;
  uuid: string;
  name: string;
  displayName: string;
}

export interface Window extends Entity {
  bounds: Bounds;
  isShowing: boolean;
  views: Entity[];
}

export interface Process {
  pid: number;
  cpuUsage: number;
  memUsage: number;
}

export interface Application extends Process {
  uuid: string;
  displayName: string;
  icon: string;
  isPlatform: boolean;
  isRunning: boolean;
  runtime: string;
  manifestUrl: string;
  url: string;
  processes: Process[];
  windows: Window[];
}

export type Pulse = Record<string, number>;

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
