import { type NuiEventData, NuiEventName } from '@internal/common';
import type { NuiMessageData } from '../hooks/useNuiEvent.ts';
import { isBrowser, isDevelopment } from './env.ts';

function emulateNuiEvent<T extends NuiEventName>(
    name: T,
    data: NuiEventData[T],
) {
    window.dispatchEvent(
        new MessageEvent<NuiMessageData<T>>('message', {
            data: { name, data },
        }),
    );
}

export function demo() {
    if (!(isBrowser() && isDevelopment())) {
        return;
    }

    emulateNuiEvent(NuiEventName.SetVisible, true);
}
