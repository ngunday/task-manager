import { Identity } from "openfin/_v2/identity";

export const launchDevTools = (uuid: string, name?: string) => {
  return async () => {
    try {
      const id: Identity = {uuid: uuid || ''};
      if (name) {
        id.name = name;
      }
      await fin.System.showDeveloperTools(id);
    } catch (e) {
      // fail quietly.
    }
  }
}
