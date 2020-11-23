//文档：https://jam-icons.com/
import React from 'react'
import uuid from '@/utils/uuid'
import icons from './icons.json'
import PROPS from './props'
import validateProps from '@/utils/validate'
import './index.less'
function Icon(props) {
    const id = uuid()
    const newProps = validateProps(props, PROPS)
    setIconDetail(newProps)
    return (
        <span className="icon" id={id}></span>
    )
    function setIconDetail(newProps) {
        setTimeout(() => {
            const { size, name, color } = newProps
            let span = document.querySelector(`#${id}`)
            span.innerHTML = icons[name]
            let svg = document.querySelector(`#${id} svg`), path = document.querySelector(`#${id} .jam path`)
            path.setAttribute('fill', color)
            svg.setAttribute('width', size)
            svg.setAttribute('height', size)
        }, 0);
    }
}

export default React.memo(Icon)