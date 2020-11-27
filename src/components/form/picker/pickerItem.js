import React, { useState, useEffect, useRef, Fragment } from 'react'
import './index.less'

function PickerItem(props) {
    const { columns = [], propsCur = 0 } = props
    const [cur, setCur] = useState(propsCur);
    const [contentHeight, setContentHeight] = useState(columns.length * 40);
    // console.log('contentHeight:',contentHeight);
    const [initTranslateY, setInitTranslateY] = useState(-propsCur * 40);
    const pickerContainer = useRef()
    const contentRef = useRef()
    const [oldColumns, setOldColumns] = useState([])
    const timer = useRef()
    let startY//初始位置
        , lastY

    useEffect(() => {
        function stopScroll(e) {
            e.preventDefault()
        }
        console.log(columns.length);
        pickerContainer.current.addEventListener('wheel', stopScroll)
        return () => {
            pickerContainer.current.removeEventListener('wheel', stopScroll)
        };

    }, []);
    useEffect(() => {
        setInitTranslateY(-propsCur * 40)
        setCur(propsCur)
        if (JSON.stringify(columns) != JSON.stringify(oldColumns)) {
            setContentHeight(columns.length * 40)
            setOldColumns(columns)
        }
        return () => {

        };
    }, [propsCur, columns]);
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
        // console.log(contentHeight);
        if (translateY > 0) {
            translateY = 0
        }
        if (translateY < -(contentHeight - 40)) {
            translateY = -(contentHeight - 40)
        }
        //对40取整
        let index = Math.ceil(translateY / 40)
        content.style.transition = "all 1s ease-out"
        content.style.transform = `translateY(${translateY}px)`
        setItem(index)
        // setPath()
    }

    function setPath() {
        console.log(timer);
        timer.current = setTimeout(() => {
            if (timer.current) clearTimeout(timer.current)
        }, 1000);
    }

    function setItem(index) {
        setCur(Math.abs(index))
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            props.setPath && props.setPath(props.columns[cur])
        }, 1000);
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

export default PickerItem