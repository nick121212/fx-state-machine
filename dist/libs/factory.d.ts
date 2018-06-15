/**
 * 实例的工厂类
 */
export declare class BaseFactory<T> {
    protected i: {
        [id: string]: T;
    };
    private pi;
    /**
     * 添加一个实例
     * @param  {string}  name       实例的名称
     * @param  {T} intance    实例
     * @param  {boolean} override   是否覆盖
     * @return {void | boolean}     是否添加成功
     */
    add(name: string, intance: T, override?: boolean): boolean;
    /**
     * 是否存在key值
     * @param  {String} key  key值
     * @return {Boolean}
     */
    has(key: string): boolean;
    /**
     * 获取一个实例
     * @param  {String} key   实例标志
     * @return {T}
     */
    get(key: string): T;
    /**
     * 遍历所有的元素
     * @param func 遍历方法
     */
    forEach(func: (key: string, val: T) => any): void;
    /**
     * 清空当前的hash
     */
    clear(): void;
}
