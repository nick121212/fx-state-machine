/**
 * 生命周期
 */
export declare class LifeCycle {
    private methods;
    private events;
    private noop;
    private isLock;
    constructor(methods: any);
    /**
     * 执行申明周期函数
     * @param curState    当前的状态
     * @param toState     下一个状态
     * @param transition  执行的动作
     * @param changeState 更改状态函数
     */
    run(curState: string, toState: string, transition: string, changeState: () => null): Promise<void>;
    /**
     * 声明周期函数放入
     * @param curState    当前的状态
     * @param toState     下一个状态
     * @param transition  执行的动作
     * @param changeState 更改状态函数
     * 所有的声明周期
     * onBeforeTransition - fired before any transition
     * onBefore<TRANSITION> - fired before a specific TRANSITION
     * onLeaveState - fired when leaving any state
     * onLeave<STATE> - fired when leaving a specific STATE
     * onTransition - fired during any transition
     * onEnterState - fired when entering any state
     * onEnter<STATE> - fired when entering a specific STATE
     * on<STATE> - convenience shorthand for onEnter<STATE>
     * onAfterTransition - fired after any transition
     * onAfter<TRANSITION> - fired after a specific TRANSITION
     * on<TRANSITION> - convenience shorthand for onAfter<TRANSITION>
     */
    private init;
}
