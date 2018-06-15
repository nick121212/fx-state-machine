import { ITransitionConfig } from "./transition";

export interface IStateMachineConfig {
    init?: string;

    transitions: ITransitionConfig[];

    methods?: any;
}
