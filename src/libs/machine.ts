import { IStateMachineConfig } from "../models/machine";
import { LifeCycle } from "./lifecycle";
import { StateMachineTransition } from "./transition";

/**
 * 状态机类
 */
export class StateMachine {
    private curState: string = "none";
    private transition: StateMachineTransition;
    private lifeCycle: LifeCycle;

    constructor(private config: IStateMachineConfig) {
        this.transition = new StateMachineTransition(config.transitions);
        this.lifeCycle = new LifeCycle(config.methods);

        this.curState = config.init || "";
    }

    /**
     * 初始化状态机的初始状态
     * 会执行一系列的生命周期方法
     */
    public async init() {
        if (this.config.init) {
            await this.fire("init", this.config.init);
        }
    }

    /**
     * 触发一个动作
     * @param transName 动作名称
     * @param toState   如果动作重复，可以指定下一个状态
     */
    public async fire(transName: string, toState?: string) {
        if (!this.can(transName)) {
            return false;
        }

        const validStates = this.transition.getOne(this.curState, transName, toState || "");

        if (validStates && validStates.length) {
            await this.lifeCycle.run(this.curState, validStates[0].to, transName, () => {
                this.curState = validStates[0].to;

                return null;
            }).catch((e: Error) => {
                throw e;
            });
        }

        return true;
    }

    /**
     * 返回当前的状态
     */
    public get state() {
        return this.curState;
    }

    /**
     * 判断动作能不能被执行
     * @param transName 动作名称
     */
    public can(transName: string) {
        return this.validTransitions.indexOf(transName) > -1;
    }

    /**
     * 判断动作是不是不能被执行
     * @param transName 动作名称
     */
    public cannot(transName: string) {
        return this.validTransitions.indexOf(transName) === -1;
    }

    /**
     * 返回所有的动作
     */
    public get allTransitions() {
        return this.transition.allTransitions();
    }

    /**
     * 返回当前状态下所有可以执行的动作
     */
    public get validTransitions() {
        return this.transition.validTransitions(this.curState);
    }
}
