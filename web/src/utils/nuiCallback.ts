import type {
    NuiCallbackName,
    NuiCallbackRequest,
    NuiCallbackResponse,
} from '@internal/common';
import { isBrowser } from './env.ts';
import { getResourceName } from './window.ts';

export async function nuiCallback<T extends NuiCallbackName>(
    name: T,
    request: NuiCallbackRequest[T],
    mockResponse?: NuiCallbackResponse[T],
): Promise<NuiCallbackResponse[T]> {
    if (isBrowser() && typeof mockResponse !== 'undefined') {
        return mockResponse;
    }

    const resourceName = getResourceName();

    const response = await fetch(`https://${resourceName}/${name}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(request),
    });

    return await response.json();
}
