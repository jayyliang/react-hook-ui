import React from 'react'
import './index.less'
import PROPS from './props'
import validateProps from '@/utils/validate'
import Loading from 'components/feedback/loading'
import Icon from 'components/base/icon'
function Button(props) {
    const { children } = props
    const newProps = validateProps(props, PROPS)
    const className = computeClassName(newProps)
    const style = computeStyle(newProps)
    return (<div
        onClick={(e) => { props.onClick && props.onClick(e) }}
        style={style}
        className={className}>
        {renderChildren(newProps)}
    </div>)
}
function renderChildren(props) {
    const color = '#ffffff'
    if (props.loading) {
        return <Loading text={props.loadingText} color="#ffffff" size="16px" textSize="14px" />
    } else {
        if (props.icon) {
            return <span ><Icon color={color} name={props.icon} /><span className="icon-btn-text" >{props.children}</span></span>
        } else {
            return props.children
        }
    }
}
function computeStyle(props) {
    let style = {}
    if (props.color) {
        style.color = "#ffffff"
        style.background = props.color
        style.borderColor = props.color
    }
    return style
}
function computeClassName(props) {
    const { type } = props
    let classStr = ''
    classStr += `${type} button-normal`
    if (props.hairline) {
        classStr += ` hairline hairline-${type}`
    }
    if (props.round) {
        classStr += ` round`
    }
    if (props.size) {
        classStr += ` ${props.size}`
    }
    if (props.disabled) {
        classStr += ` disabled`
    }
    return classStr
}
export default React.memo(Button)

