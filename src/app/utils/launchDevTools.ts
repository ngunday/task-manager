export const launchDevTools = (uuid: string, name?: string) => {
    return async (): Promise<void> => {
        try {
            const id: OpenFin.Identity = { uuid, name: name || '' };
            await fin.System.showDeveloperTools(id);
        } catch (e) {
            console.error(`Could not start devtools for ${uuid} (${e})`);
        }
    };
};
