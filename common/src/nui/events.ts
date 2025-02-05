export enum NuiEventName {
    SetVisible = 'setVisible',
}

export interface NuiEventData {
    [NuiEventName.SetVisible]: boolean;
}
