"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 实例的工厂类
 */
class BaseFactory {
    constructor() {
        this.i = {};
        this.pi = {};
    }
    /**
     * 添加一个实例
     * @param  {string}  name       实例的名称
     * @param  {T} intance    实例
     * @param  {boolean} override   是否覆盖
     * @return {void | boolean}     是否添加成功
     */
    add(name, intance, override = false) {
        if (this.pi.hasOwnProperty(name) || !override && this.has(name)) {
            return false;
        }
        this.i[name] = intance;
        return true;
    }
    /**
     * 是否存在key值
     * @param  {String} key  key值
     * @return {Boolean}
     */
    has(key) {
        return this.i.hasOwnProperty(key);
    }
    /**
     * 获取一个实例
     * @param  {String} key   实例标志
     * @return {T}
     */
    get(key) {
        if (this.has(key)) {
            return this.i[key];
        }
        return null;
    }
    /**
     * 遍历所有的元素
     * @param func 遍历方法
     */
    forEach(func) {
        if (!func) {
            return;
        }
        for (const key in this.i) {
            if (this.has(key)) {
                const element = this.i[key];
                if (func(key, element) === false) {
                    break;
                }
            }
        }
    }
    /**
     * 清空当前的hash
     */
    clear() {
        this.i = {};
        this.pi = {};
    }
}
exports.BaseFactory = BaseFactory;
//# sourceMappingURL=factory.js.map