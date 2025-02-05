import type { NuiEventData, NuiEventName } from '@internal/common';
import { useEffect, useRef } from 'react';

type NuiHandler<T extends NuiEventName> = (data: NuiEventData[T]) => void;

export interface NuiMessageData<T extends NuiEventName> {
    name: T;
    data: NuiEventData[T];
}

export function useNuiEvent<T extends NuiEventName>(
    name: T,
    handler: NuiHandler<T>,
) {
    const handlerRef = useRef<NuiHandler<T> | null>(null);

    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        function listener({
            data: { name: eventName, data },
        }: MessageEvent<NuiMessageData<T>>) {
            if (eventName !== name) {
                return;
            }

            handlerRef.current?.(data);
        }

        window.addEventListener('message', listener);
        return () => window.removeEventListener('message', listener);
    }, [name]);
}
