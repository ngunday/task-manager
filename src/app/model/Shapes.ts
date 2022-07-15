export interface Entity {
    uuid: string;
    name: string;
    pid: number;
    url: string;
    bounds: OpenFin.Bounds;
    displayName: string;
}

export type View = Entity;

export interface Window extends Entity {
    isShowing: boolean;
    views: View[];
}

export interface Process {
    pid: number;
    cpuUsage: number;
    memUsage: number;
}

export interface Channel {
    id: string;
    name: string;
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
    channels: Channel[];
}

export type Pulse = Record<string, number>;
