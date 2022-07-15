export const launchDevTools = (uuid: string, name?: string) => {
    return async (): Promise<void> => {
        try {
            const id = { uuid, name } as OpenFin.Identity;
            await fin.System.showDeveloperTools(id);
        } catch (e) {
            console.error(`Could not start the devtools for ${uuid} (${e})`);
        }
    };
};
