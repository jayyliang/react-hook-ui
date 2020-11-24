export default function validateType(obj) {
    if (obj === void 0) {
        return 'Undefined';
    }
    if (obj === null) {
        return 'Null';
    }
    /function.(\w*)\(\)/.test(obj.constructor); //通过其构造函数来获取对应的类型。
    return RegExp.$1;
}