"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("./factory");
const utils_1 = require("./utils");
class StateMachineTransition {
    constructor(transitions) {
        this.transitions = transitions;
        this.transArr = [];
        this.stateArr = [];
        this.maps = new factory_1.BaseFactory();
        this.init();
    }
    validTransitions(curState) {
        if (!this.maps.has(curState)) {
            return [];
        }
        const stateMap = this.maps.get(curState);
        return Array.from(new Set(stateMap.map((m) => {
            return m.name;
        })));
    }
    allTransitions() {
        return this.transArr;
    }
    allState() {
        return this.stateArr;
    }
    getOne(curState, transName, toState) {
        if (!this.maps.has(curState)) {
            return null;
        }
        const stateMap = this.maps.get(curState);
        let result = stateMap.filter((m) => {
            return m.name === transName;
        });
        if (toState) {
            result = stateMap.filter((m) => {
                return m.to === toState;
            });
        }
        return result;
    }
    /**
     * 初始化transition
     * 1. 遍历所有的transitions，name作为key
     * 2. 遍历所有的from，from作为key，存储ITransitionConfig
     */
    init() {
        this.transitions.forEach((transition) => {
            const { name, from, to } = transition;
            const froms = utils_1.isArray(from) ? from : [from];
            this.transArr.push(name);
            if (this.stateArr.indexOf(to) === -1) {
                this.stateArr.push(to);
            }
            froms.forEach((f) => {
                if (!this.maps.has(transition.name)) {
                    this.maps.add(f, []);
                }
                if (this.stateArr.indexOf(f) === -1) {
                    this.stateArr.push(f);
                }
                this.maps.get(f).push({
                    from: f,
                    name,
                    to
                });
            });
        });
        this.maps.add("none", []);
        this.stateArr.forEach((s) => {
            this.maps.get("none").push({
                from: "none",
                to: s,
                name: "init"
            });
        });
    }
}
exports.StateMachineTransition = StateMachineTransition;
//# sourceMappingURL=transition.js.map