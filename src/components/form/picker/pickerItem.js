import React, { useState, useEffect, useRef, Fragment } from 'react'
import './index.less'

function PickerItem(props) {
    const { title = '标题', showToolbar = true, columns = [], active = true, propsCur = 3 } = props
    const [cur, setCur] = useState(propsCur);
    const [contentHeight, setContentHeight] = useState(columns.length * 40);
    const [initTranslateY, setInitTranslateY] = useState(-propsCur * 40);
    const pickerContainer = useRef()
    const contentRef = useRef()
    let startY//初始位置
        , lastY

    useEffect(() => {
        function stopScroll(e) {
            e.preventDefault()
        }
        pickerContainer.current.addEventListener('wheel', stopScroll)
        return () => {
            pickerContainer.current.removeEventListener('wheel', stopScroll)
        };

    }, []);
    return (

        <Fragment>
            <div
                onTouchStart={(e) => touchStart(e)}
                onTouchMove={(e) => touchMove(e)}
                onTouchEnd={(e) => touchEnd(e)}
                ref={pickerContainer}
                className="picker-container"
            >
                <div className="content-container">
                    <ul ref={contentRef} className="content" style={{ transform: `translateY(${initTranslateY}px)` }}>
                        {renderList(columns)}
                    </ul>
                </div>
            </div>

        </Fragment>
    )

    function touchStart(e) {
        e.persist()
        if (!startY) startY = e.touches[0].pageY
    }
    function touchMove(e) {
        e.persist()
        if (!lastY) {
            lastY = e.touches[0].pageY
        } else {
            let nowY = e.touches[0].pageY
            let moveY = nowY - lastY
            setTranslate(moveY, contentHeight)
            lastY = nowY
        }
    }

    function setTranslate(moveY, contentHeight) {
        let content = contentRef.current
        let transform = content.style.transform
        let left = transform.indexOf('('), right = transform.indexOf('p')
        let lastTranslateY = Number(transform.slice(left + 1, right))
        let translateY = lastTranslateY + moveY
        if (translateY >= 0) {
            translateY = 0
        }
        if (translateY <= -(contentHeight - 40)) {
            translateY = -(contentHeight - 40)
        }
        //对40取整
        let index = Math.ceil(translateY / 40)
        content.style.transition = "all 1s ease-out"
        content.style.transform = `translateY(${translateY}px)`
        setItem(index)
        setPath()
    }

    function setPath(){
        props.setPath && props.setPath(props.columns[cur])
    }

    function setItem(index) {
        setCur(Math.abs(index))
    }

    function touchEnd(e) {
        e.persist()
        lastY = null
    }
    function renderList(data) {
        return data.map((item, index) => {
            return (
                <li
                    onClick={() => clickItem(item, index)}
                    className={`list-item ${cur == index ? 'list-item-cur' : ''}`} key={index}
                    data-index={index}>
                    {item.text ? item.text : item}
                </li>
            )
        })
    }
    function clickItem(item, index) {
    }
    function confirm() {
        typeof props.confirm == 'function' ? props.confirm(cur) : null
        cancel()
    }
    function cancel() {
        typeof props.closePopup == 'function' ? props.closePopup() : null
    }
}

export default React.memo(PickerItem)