//待完善

import React from 'react'
import './index.less'
import PROPS from './props'
import validateProps from '@/utils/validate'
import Icon from 'components/base/icon'
function Cell(props) {
    const newProps = validateProps(props, PROPS)
    return (
        <div className="cell">
            {newProps.icon ? <span className="icon"><Icon name={newProps.icon} color="#323233" /></span> : ''}
            <div className="title">{newProps.title}</div>
            <div className="value">{newProps.value}</div>
            {renderLink(newProps)}
        </div>
    )
    function renderLink(newProps) {
        const { isLink } = newProps
        if (!isLink) return
        let iconName
        switch (isLink) {
            case 'right':
                iconName = 'chevron-right'
                break;
            case 'left':
                iconName = 'chevron-left'
                break
            case 'down':
                iconName = 'chevron-down'
                break
            case 'up':
                iconName = 'chevron-up'
                break
            default:
                iconName = 'chevron-right'
                break;
        }
        return <span className="link-icon"><Icon name={iconName} color="#323233" /></span>
    }
}
export default React.memo(Cell)