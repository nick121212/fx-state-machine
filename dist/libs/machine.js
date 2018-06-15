"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lifecycle_1 = require("./lifecycle");
const transition_1 = require("./transition");
/**
 * 状态机类
 */
class StateMachine {
    constructor(config) {
        this.config = config;
        this.curState = "none";
        this.transition = new transition_1.StateMachineTransition(config.transitions);
        this.lifeCycle = new lifecycle_1.LifeCycle(config.methods);
        this.curState = config.init || "";
    }
    /**
     * 初始化状态机的初始状态
     * 会执行一系列的生命周期方法
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.init) {
                yield this.fire("init", this.config.init);
            }
        });
    }
    /**
     * 触发一个动作
     * @param transName 动作名称
     * @param toState   如果动作重复，可以指定下一个状态
     */
    fire(transName, toState) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.can(transName)) {
                return false;
            }
            const validStates = this.transition.getOne(this.curState, transName, toState || "");
            if (validStates && validStates.length) {
                yield this.lifeCycle.run(this.curState, validStates[0].to, transName, () => {
                    this.curState = validStates[0].to;
                    return null;
                }).catch((e) => {
                    throw e;
                });
            }
            return true;
        });
    }
    /**
     * 返回当前的状态
     */
    get state() {
        return this.curState;
    }
    /**
     * 判断动作能不能被执行
     * @param transName 动作名称
     */
    can(transName) {
        return this.validTransitions.indexOf(transName) > -1;
    }
    /**
     * 判断动作是不是不能被执行
     * @param transName 动作名称
     */
    cannot(transName) {
        return this.validTransitions.indexOf(transName) === -1;
    }
    /**
     * 返回所有的动作
     */
    get allTransitions() {
        return this.transition.allTransitions();
    }
    /**
     * 返回当前状态下所有可以执行的动作
     */
    get validTransitions() {
        return this.transition.validTransitions(this.curState);
    }
}
exports.StateMachine = StateMachine;
//# sourceMappingURL=machine.js.map