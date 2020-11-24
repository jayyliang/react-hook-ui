import validateType from './validateType'
/**
 *@param props Object
 *@param PROPS Object
 *@returns void
 */
function validateProps(props, PROPS) {
    let newProps = cloneProps(props)
    //先处理必须的默认属性，props中没有则赋缺省值
    const {
        _defaultNeed
    } = PROPS
    _defaultNeed && _defaultNeed.forEach(item => {
        if (!newProps[item]) {
            newProps[item] = PROPS[item].default
        }
    })
    //下面是对props中的值与类型校验
    Object.keys(newProps).forEach(key => {
        let item = newProps[key],
            validateItem = PROPS[item]
        if (validateItem) {
            //判断类型
            let type = validateType(item)
            if (type != validateItem.type) {
                throw new Error(`${key} should be ${validateItem.type}`)
            }
            //判断值，若值不在对应的value里面，则用默认值（还是应该直接抛出错误？）
            if (validateItem.value != null) {
                //不是自定义的值则判断
                if (!validateItem.value.includes(item)) {
                    //使用默认值
                    newProps[key] = validateItem.default
                }
            }
        }
    })
    return newProps
}

function cloneProps(props) {
    let newProps = {}
    Object.keys(props).forEach(key => newProps[key] = props[key])
    return newProps
}

export default validateProps