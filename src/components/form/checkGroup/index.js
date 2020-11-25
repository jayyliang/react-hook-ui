import React, { useEffect } from 'react'
import './index.less'
function checkGroup(props) {
    const { children, horizontal, checked } = props
    checkChildren(children)
    useEffect(() => {
        return () => {

        }
    }, [checked])
    return (
        <div className={`check-group ${horizontal ? 'check-group-flex' : ''}`}>{renderChildren(children)}</div>
    )
    function renderChildren(children) {
        return React.Children.map(children, (child, index) => {
            const { name } = child.props
            let childChecked = false
            if (checked.includes(name)) {
                childChecked = true
            }
            return React.cloneElement(child, {
                checked: childChecked
            })
        })
    }
    function checkChildren(children) {
        [...children].forEach(item => {
            const name = item.type.type.name
            if (name != 'Checkbox') {
                throw new Error('CheckGroup children should be Checkbox')
            }
        })
    }
}
export default React.memo(checkGroup)