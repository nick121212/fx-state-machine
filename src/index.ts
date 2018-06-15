
import { StateMachine } from "./libs/machine";

const machine = new StateMachine({
    init: "red",
    transitions: [
        { name: "cango", from: "red", to: "green" },
        { name: "quickgo", from: "green", to: "yello" },
        { name: "stopgo", from: "yello", to: "red" }
    ],
    methods: {
        onEnterRed: () => {
            console.log(machine.validTransitions);
            console.log("当前是红灯");
        },
        onLeaveRed: () => {
            console.log("5秒后变成绿灯--------------");
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 5000);
                throw new Error("dfadfadf");
            });
        },
        onEnterGreen: () => {
            console.log("当前是绿灯");
        },
        onLeaveGreen: () => {
            return new Promise((resolve) => {
                console.log("4秒后变成黄灯--------------");
                setTimeout(() => {
                    resolve();
                }, 4000);
            });
        },
        onEnterYello: () => {
            console.log("当前是黄灯");
        },
        onLeaveYello: () => {
            console.log("3秒后变成红灯--------------");
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 3000);
            });
        }
    }
});

(async () => {
    // await machine.init();

    const a = ["cango", "quickgo", "stopgo"];
    let index = 0;

    while (true) {
        await machine.fire(a[index++]).catch((e) => {
            console.log("------", e);
            index--;
        });
        console.log("下一个吗");
        if (index >= a.length) {
            index = 0;
        }
    }
})();

// console.log(machine.validTransitions);

// machine.fire("freeze");

// console.log(machine.state);
// console.log(machine.validTransitions);

// machine.fire("condense");

// console.log(machine.state);
// console.log(machine.validTransitions);

// machine.fire("stop");

// console.log(machine.state);
// console.log(machine.validTransitions);
