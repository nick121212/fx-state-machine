import { IStateMachineConfig } from "../models/machine";
/**
 * 状态机类
 */
export declare class StateMachine {
    private config;
    private curState;
    private transition;
    private lifeCycle;
    constructor(config: IStateMachineConfig);
    /**
     * 初始化状态机的初始状态
     * 会执行一系列的生命周期方法
     */
    init(): Promise<void>;
    /**
     * 触发一个动作
     * @param transName 动作名称
     * @param toState   如果动作重复，可以指定下一个状态
     */
    fire(transName: string, toState?: string): Promise<boolean>;
    /**
     * 返回当前的状态
     */
    readonly state: string;
    /**
     * 判断动作能不能被执行
     * @param transName 动作名称
     */
    can(transName: string): boolean;
    /**
     * 判断动作是不是不能被执行
     * @param transName 动作名称
     */
    cannot(transName: string): boolean;
    /**
     * 返回所有的动作
     */
    readonly allTransitions: string[];
    /**
     * 返回当前状态下所有可以执行的动作
     */
    readonly validTransitions: string[];
}
