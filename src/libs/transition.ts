
import { ITransitionConfig } from "../models/transition";
import { BaseFactory } from "./factory";
import { isArray } from "./utils";

export class StateMachineTransition {
    private transArr: string[] = [];
    private stateArr: string[] = [];
    private maps: BaseFactory<ITransitionConfig[]> = new BaseFactory();

    constructor(private transitions: ITransitionConfig[]) {
        this.init();
    }

    public validTransitions(curState: string) {
        if (!this.maps.has(curState)) {
            return [];
        }

        const stateMap = this.maps.get(curState);

        return Array.from(new Set(stateMap.map((m: ITransitionConfig) => {
            return m.name;
        })));
    }

    public allTransitions() {
        return this.transArr;
    }

    public allState() {
        return this.stateArr;
    }

    public getOne(curState: string, transName: string, toState: string) {
        if (!this.maps.has(curState)) {
            return null;
        }

        const stateMap = this.maps.get(curState);

        let result = stateMap.filter((m: ITransitionConfig) => {
            return m.name === transName;
        });

        if (toState) {
            result = stateMap.filter((m: ITransitionConfig) => {
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
    private init() {
        this.transitions.forEach((transition: ITransitionConfig) => {
            const { name, from, to } = transition;
            const froms: string[] = isArray(from) ? from as string[] : [from] as string[];

            this.transArr.push(name);

            if (this.stateArr.indexOf(to) === -1) {
                this.stateArr.push(to);
            }

            froms.forEach((f: string) => {
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
        this.stateArr.forEach((s: string) => {
            this.maps.get("none").push({
                from: "none",
                to: s,
                name: "init"
            });
        });
    }
}
