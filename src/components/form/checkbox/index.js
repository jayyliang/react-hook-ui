import React, { useState, useRef } from 'react'
import './index.less'
import Icon from 'components/base/icon'
import validateProps from '@/utils/validate'
import PROPS from './props'
import removeClass from '@/utils/removeClass'
function Checkbox(props) {
    const newProps = validateProps(props, PROPS)
    console.log(newProps);
    const [checked, setChecked] = useState(newProps.checked);
    const { size, label } = newProps
    const iconRef = useRef()
    const checkbox = useRef()
    return (
        <div onClick={() => change(checked)} className="checkbox">
            <div ref={checkbox} className="checkbox-icon" style={computeCheckIconStyle(newProps, checked)}>
                <div style={computeCircleStyle(newProps)} className="circle"></div>
                <span ref={iconRef} hidden={!checked}><Icon size={size} color="#fff" name="check" /></span>
            </div>
            <div>{label}</div>
        </div>
    )
    function change(checked) {
        console.log(checked);
        if (!iconRef.current.className) iconRef.current.className = ''
        if (!checked) {
            iconRef.current.className += ' fade-in'
            setTimeout(() => {
                iconRef.current.className = removeClass(iconRef.current.className, 'fade-in')
            }, 500);
            setChecked(!checked)
        } else {
            iconRef.current.className += ' fade-out'
            checkbox.current.className += ' fade-to-background'
            setTimeout(() => {
                setChecked(!checked)
            }, 500);
            setTimeout(() => {
                iconRef.current.className = removeClass(iconRef.current.className, 'fade-out')
                checkbox.current.className = removeClass(checkbox.current.className, 'fade-to-background')
            }, 500);
        }

    }
    function computeCircleStyle(props) {
        const { size, round } = props
        let style = {}
        style.width = Number(size) + 4
        style.height = Number(size) + 4
        if (round) {
            style.borderRadius = '50%'
        }
        return style
    }
    function computeCheckIconStyle(props, checked) {
        // if (!checked) return {}
        let style = {}
        const { color, round, size } = props
        if (checked) {
            style.backgroundColor = color
            style.borderColor = color
        }
        style.width = Number(size) + 4
        style.height = Number(size) + 4
        if (round) {
            style.borderRadius = '50%'
        }
        return style
    }
}

export default React.memo(Checkbox)