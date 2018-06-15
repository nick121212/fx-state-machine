import { ITransitionConfig } from "../models/transition";
export declare class StateMachineTransition {
    private transitions;
    private transArr;
    private stateArr;
    private maps;
    constructor(transitions: ITransitionConfig[]);
    validTransitions(curState: string): string[];
    allTransitions(): string[];
    allState(): string[];
    getOne(curState: string, transName: string, toState: string): ITransitionConfig[] | null;
    /**
     * 初始化transition
     * 1. 遍历所有的transitions，name作为key
     * 2. 遍历所有的from，from作为key，存储ITransitionConfig
     */
    private init;
}
