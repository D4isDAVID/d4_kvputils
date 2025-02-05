import { isBrowser } from './env.ts';

type CfxWindow = Window &
    typeof globalThis & {
        // biome-ignore lint/style/useNamingConvention: already defined by cfx
        GetParentResourceName(): string;
    };

export function getResourceName(): string {
    return isBrowser()
        ? 'd4_kvputils'
        : (window as CfxWindow).GetParentResourceName();
}
