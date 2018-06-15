
/**
 * 实例的工厂类
 */
export class BaseFactory<T> {
    protected i: { [id: string]: T; } = {};
    private pi: { [id: string]: boolean; } = {};

    /**
     * 添加一个实例
     * @param  {string}  name       实例的名称
     * @param  {T} intance    实例
     * @param  {boolean} override   是否覆盖
     * @return {void | boolean}     是否添加成功
     */
    public add(name: string, intance: T, override = false): boolean {
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
    public has(key: string): boolean {
        return this.i.hasOwnProperty(key);
    }

    /**
     * 获取一个实例
     * @param  {String} key   实例标志
     * @return {T}
     */
    public get(key: string): T {
        if (this.has(key)) {
            return this.i[key];
        }

        return null as any;
    }

    /**
     * 遍历所有的元素
     * @param func 遍历方法
     */
    public forEach(func: (key: string, val: T) => any): void {
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
    public clear(): void {
        this.i = {};
        this.pi = {};
    }
}
