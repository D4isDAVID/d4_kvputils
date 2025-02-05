export function isBrowser(): boolean {
    return !('invokeNative' in window);
}

export function isProduction(): boolean {
    return import.meta.env.PROD;
}

export function isDevelopment(): boolean {
    return import.meta.env.DEV;
}
