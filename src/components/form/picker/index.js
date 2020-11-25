import React, { useState, useEffect, useRef } from 'react'
import Popup from 'components/base/popup'
import './index.less'

function Picker(props) {
    const { title = '标题', showToolbar = true, columns = [], active = true, propsCur = 0 } = props
    const [cur, setCur] = useState(propsCur);
    const pickerContainer = useRef()
    const contentRef = useRef()
    let startY//初始位置
        , lastY//上一次位置

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
        <div className="picker">
            <Popup position="bottom" active={active} closePopup={props.closePopup} height="350px">
                <div
                    onTouchStart={(e) => touchStart(e)}
                    onTouchMove={(e) => touchMove(e)}
                    onTouchEnd={(e) => touchEnd(e)}
                    ref={pickerContainer}
                    className="picker-container"
                >
                    <div hidden={!showToolbar} className="toolbar">
                        <div onClick={cancel} className="cancel">取消</div>
                        <div>{title}</div>
                        <div onClick={confirm} className="confirm">确认</div>
                    </div>
                    <div className="content-container">
                        <ul ref={contentRef} className="content" style={{ transform: 'translateY(0)' }}>
                            {renderList(columns)}
                        </ul>
                    </div>
                </div>
            </Popup>
        </div>
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
            setTranslate(moveY)
            lastY = nowY
        }
    }

    function setTranslate(moveY) {
        let content = contentRef.current
        let transform = content.style.transform
        let left = transform.indexOf('('),right = transform.indexOf('p')
        let translateY = Number(transform.slice(left + 1, right))
        translateY = translateY + moveY
        content.style.transform = `translateY(${translateY}px)`
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
                    {item}
                </li>
            )
        })
    }
    function clickItem(item, index) {
        console.log(222);
    }
    function confirm() {

    }
    function cancel() {

    }
}

export default React.memo(Picker)