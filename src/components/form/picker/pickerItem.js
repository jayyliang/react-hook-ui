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
                    <div className="mask" style={{ backgroundSize: `100% ${initTranslateY + 110}px` }}></div>
                    <div className="indicator" style={getIndicatorStyle()}></div>
                    <ul ref={contentRef} className="content" style={{ transform: `translateY(${initTranslateY}px)` }}>
                        {renderList(columns)}
                    </ul>
                </div>
            </div>

        </Fragment>
    )
    function getIndicatorStyle() {
        let style = {}
        style.top = initTranslateY + 110 + 'px'
        return style
    }
    function touchStart(e) {
        e.persist()
        if (!startY) startY = e.touches[0].pageY
        let content = contentRef.current
        content.style.transition = "all .3s linear"
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
        } else if (translateY < -(contentHeight - 40)) {
            translateY = -(contentHeight - 40)
        } else {

        }
        //对40取整
        content.style.transform = `translateY(${translateY}px)`

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
        let content = contentRef.current
        // console.log(translateY / 40);
        let transform = content.style.transform
        let left = transform.indexOf('('), right = transform.indexOf('p')
        let translateY = Number(transform.slice(left + 1, right))
        let arr = String(translateY / 40).split('.')
        let int = Number(arr[0]), decimal = Number('0.' + arr[1])
        console.log(decimal);
        if (decimal > 0.5) {
            int -= 1
        } else {
        }
        translateY = 40 * int
        setTimeout(() => {
            content.style.transition = ""
        }, 300);
        let index = Math.ceil(translateY / 40)
        content.style.transform = `translateY(${translateY}px)`
        setItem(index)
        setTimeout(() => {
            content.style.transition = ""
        }, 300);
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