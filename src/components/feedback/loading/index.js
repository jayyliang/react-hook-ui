import React from 'react'
import validateProps from '@/utils/validate'
import PROPS from './props'
import './index.less'
function Loading(props) {
    const newProps = validateProps(props, PROPS)
    const boxStyle = computeBoxStyle(newProps)
    const loaderStyle = computeLoaderStyle(newProps)
    return (
        <div style={boxStyle} className="box">
            <div style={loaderStyle} className="loader loader-circle"></div>
            <div style={{ fontSize: newProps.textSize }} className="loader-text">{newProps.text}</div>
        </div>
    )
    function computeBoxStyle(props) {
        let boxStyle = {}
        if (props.color) {
            boxStyle.color = props.color
        }
        if (props.vertical) {
            boxStyle.flexDirection = 'column'
        } else {
            boxStyle.flexDirection = 'row'
        }
        return boxStyle
    }
    function computeLoaderStyle(props) {
        let loaderStyle = {}
        if (props.size) {
            loaderStyle.width = props.size
            loaderStyle.height = props.size
        }
        return loaderStyle
    }
}

export default React.memo(Loading)