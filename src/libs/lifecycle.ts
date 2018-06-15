
/**
 * 生命周期
 */
export class LifeCycle {
    private events: Array<() => null>;
    private noop: Function;
    private isLock: boolean = false;

    constructor(private methods: any) {
        this.events = [];
        this.noop = () => null;
    }

    /**
     * 执行申明周期函数
     * @param curState    当前的状态
     * @param toState     下一个状态
     * @param transition  执行的动作
     * @param changeState 更改状态函数
     */
    public async run(curState: string, toState: string, transition: string, changeState: () => null) {
        let index = 0;

        this.init(curState, toState, transition, changeState);

        if (this.isLock) {
            return;
        }

        this.isLock = true;
        // 一次执行所有的生命周期函数
        // todo：错误的捕获
        for (const lc of this.events) {
            try {
                if (await lc() === false && index < 5) {
                    return;
                }
            } catch (e) {
                this.isLock = false;
                throw e;
            }
            index++;
        }
        this.isLock = false;
    }

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
    private init(curState: string, toState: string, transition: string, changeState: () => null) {
        const stateT = toState.substring(0, 1).toUpperCase() + toState.substring(1);
        const stateS = curState.substring(0, 1).toUpperCase() + curState.substring(1);
        const transName = transition.substring(0, 1).toUpperCase() + transition.substring(1);
        const {
            onBeforeTransition = this.noop,
            ["onBefore" + transName]: onBeforeSomeTransition = this.noop,
            ["onLeave" + stateS]: onLeaveSomeState = this.noop,
            onLeaveState = this.noop,
            onTransition = this.noop,
            onEnterState = this.noop,
            ["onEnter" + stateT]: onEnterSomeState = this.noop,
            ["on" + stateT]: onSomeState = this.noop,
            onAfterTransition = this.noop,
            ["onAfter" + transName]: onAfterSomeTransition = this.noop
        } = this.methods;

        this.events = [];

        // onBeforeTransition 可以cancel
        this.events.push(onBeforeTransition);
        // onBefore<TRANSITION> 可以cancel
        this.events.push(onBeforeSomeTransition);
        // onLeaveState 可以cancel
        this.events.push(onLeaveState);
        // onLeave<STATE>
        this.events.push(onLeaveSomeState);
        // onTransition 可以cancel
        this.events.push(onTransition);
        // 更改
        this.events.push(changeState);
        // onEnterState
        this.events.push(onEnterState);
        // onEnterSomeState
        this.events.push(onEnterSomeState);
        // on<STATE>
        this.events.push(onSomeState);
        // onAfterTransition
        this.events.push(onAfterTransition);
        // onAfter<TRANSITION>
        this.events.push(onAfterSomeTransition);
    }
}
