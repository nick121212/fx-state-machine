"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objToString = Object.prototype.toString;
const hasOwn = Object.prototype.hasOwnProperty;
/**
 * 柯里化函数
 * 获取类型是否是需要的
 * @param   {String} type 判定的类型
 * @returns {(o:any)=>boolean}
 */
const isSomeType = (type) => {
    return (o) => {
        return objToString.call(o) === `[object ${type}]`;
    };
};
/**
 * 判断当前类型是Object
 */
exports.isObject = isSomeType("Object");
/**
 * 判断当前类型是Function
 */
exports.isFunction = isSomeType("Function");
/**
 * 判断当前类型是Number
 */
exports.isNumber = isSomeType("Number");
/**
 * 判断当前类型是Array
 */
exports.isArray = isSomeType("Array");
/**
 * 判断当前类型是Boolean
 */
exports.isBoolean = isSomeType("Boolean");
/**
 * 判断当前类型是Boolean
 */
exports.isString = isSomeType("String");
/**
 * 判断变量是否定义
 * @param   {any}     o 变量
 * @returns {boolean}
 */
exports.isUndefined = (o) => {
    return typeof o === "undefined";
};
/**
 * 判断一个对象是否是空对象
 * @param   {Object} obj 需要判断的对象
 * @returns {Boolean}
 */
exports.isEmptyObject = (obj) => {
    if (exports.isUndefined(obj)) {
        return true;
    }
    if (!exports.isObject(obj)) {
        return false;
    }
    return Object.keys(obj).length === 0;
};
/**
 * 判断一个对象是否是纯对象
 * @param   {Object} obj 需要判断的对象
 * @returns {Boolean}
 */
exports.isPlainObject = (obj) => {
    if (exports.isUndefined(obj)) {
        return false;
    }
    if (!exports.isObject(obj)) {
        return false;
    }
    try {
        if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
            return false;
        }
    }
    catch (e) {
        return false;
    }
    return true;
};
//# sourceMappingURL=utils.js.map