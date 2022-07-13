import { ApplicationInfo } from 'openfin/_v2/api/system/application';
import { Application as OFLegacyApplication } from 'openfin/_v2/main';
import { Identity } from 'openfin/_v2/identity';
import { ViewCreationOptions } from 'openfin/_v2/api/view/view';

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
