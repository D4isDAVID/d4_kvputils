export enum NuiCallbackName {
    HideComponent = 'hideComponent',
}

export interface NuiCallbackRequest {
    [NuiCallbackName.HideComponent]: null;
}

export interface NuiCallbackResponse {
    [NuiCallbackName.HideComponent]: true;
}
