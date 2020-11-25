import React, { useState, useRef, useEffect } from 'react'
import './index.less'
import Icon from 'components/base/icon'
import validateProps from '@/utils/validate'
import PROPS from './props'
import removeClass from '@/utils/removeClass'
function CheckItem(props) {
    const newProps = validateProps(props, PROPS)
    const [checked, setChecked] = useState(newProps.checked || false);
    const parentChecked = props.checked
    const { size, label } = newProps
    const iconRef = useRef()
    const checkbox = useRef()
    console.log(props)
    useEffect(() => {
        //受控组件
        if (typeof parentChecked != 'undefined' && !newProps.disabled) {
            change(props.checked)
        }
        return () => {
        };
    }, [props.checked]);
    return (

        <div onClick={() => {
            //非受控
            if (typeof parentChecked == 'undefined') {
                change(checked)
            }
        }} className={`check-item ${newProps.disabled ? 'disabled' : ''}`}>
            <div ref={checkbox} className="check-item-icon" style={computeCheckIconStyle(newProps, checked)}>
                <div style={computeCircleStyle(newProps)} className="circle"></div>
                <span ref={iconRef} hidden={!checked}><Icon size={size} color={!newProps.disabled ? "#fff" : '#c8c9cc'} name="check" /></span>
            </div>
            <div>{label}</div>
        </div>
    )
    function change(checked) {
        if (newProps.disabled) return
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
        typeof props.change == 'function' ? props.change(!checked) : null
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
        if (props.disabled) {
            style.backgroundColor = '#ebedf0'
            style.borderColor = '#c8c9cc'
        }
        return style
    }
}

export default React.memo(CheckItem)