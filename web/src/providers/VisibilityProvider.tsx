import { NuiCallbackName, NuiEventName } from '@internal/common';
import {
    type Context,
    type ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useNuiEvent } from '../hooks/useNuiEvent.ts';
import { isBrowser } from '../utils/env.ts';
import { nuiCallback } from '../utils/nuiCallback.ts';
import './VisibilityProvider.css';

interface VisibilityValue {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const VisibilityContext = createContext<VisibilityValue | null>(null);

interface VisibilityProviderProps {
    children: ReactNode;
}

export function VisibilityProvider({ children }: VisibilityProviderProps) {
    const [visible, setVisible] = useState(false);

    useNuiEvent(NuiEventName.SetVisible, setVisible);

    useEffect(() => {
        if (!visible) {
            return;
        }

        const listener = ({ code }: KeyboardEvent) => {
            if (code !== 'Escape') {
                return;
            }

            if (isBrowser()) {
                setVisible(false);
            } else {
                nuiCallback(NuiCallbackName.HideComponent, null);
            }
        };

        window.addEventListener('keydown', listener);
        return () => window.removeEventListener('keydown', listener);
    }, [visible]);

    return (
        <VisibilityContext.Provider value={{ visible, setVisible }}>
            <div
                className="visibility-wrapper"
                style={{ visibility: visible ? 'visible' : 'hidden' }}
            >
                {children}
            </div>
        </VisibilityContext.Provider>
    );
}

export function useVisibilityContext() {
    return useContext<VisibilityValue>(
        VisibilityContext as Context<VisibilityValue>,
    );
}
