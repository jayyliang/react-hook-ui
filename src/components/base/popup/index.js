import React, { useEffect, useRef } from 'react'
import './index.less'
import PROPS from './props.js'
import validateProps from '@/utils/validate'
function Popup(props) {
    let popup = useRef(), children = useRef()
    const newProps = validateProps(props, PROPS)
    useEffect(() => {
        popup.current.style.display = 'none'
    }, []);
    useEffect(() => {
        if (props.active) {
            popup.current.style.display = ''
        } else {
            const { position } = newProps
            if (position == 'top' || position == 'bottom') {
                children.current.style.height = 0
            } else {
                children.current.style.width = 0
            }

        }
        return () => {

        };
    }, [props.active]);

    return (
        <div ref={popup} onClick={(e) => clickMask(e, props)} className={`popup ${props.active ? 'fade-in' : 'fade-out'}`}>
            <div ref={children} className={`pop-children transition-height ${newProps.position} ${computeTransition(newProps, children)}`}>{props.children}</div>
        </div>
    )

    function computeTransition(props, children) {
        let classStr = ''
        const { active, position } = props
        if (active) {
            classStr += `transition-in-${position}`
            setTimeout(() => {
                if (position != 'mid') {
                    if (position == 'left' || position == 'right') {
                        children.current.style.width = props.width ? props.width : PROPS.width.default
                    }
                    if (position == 'top' || position == 'bottom') {
                        children.current.style.height = props.height ? props.height : PROPS.height.default
                    }
                }
            }, 10);
        } else {
            classStr += `transition-out-${position}`
        }
        return classStr
    }

    function clickMask(e, props) {
        e.persist()
        if (e.target.className.includes('popup')) {
            if (typeof props.closePopup == 'function') {
                if (props.active) {
                    setTimeout(() => {
                        e.target.style.display = 'none'
                    }, 500);
                }
                props.closePopup()
            }
        } else {
            // console.log('nnn')
        }
    }
}

export default React.memo(Popup)