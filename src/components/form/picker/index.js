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

    //用于缓动的变量
    let lastMoveTime = 0;
    let lastMoveStart = 0;
    let stopInertiaMove = false; // 是否停止缓动
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
                    <ul ref={contentRef} className="content" style={{ transform: 'translateY(0)' }}>
                        {renderList(columns)}
                    </ul>
                </div>
            </Popup>
        </div>
    )
    function touchStart(e) {
        e.persist()
        lastY = startY = e.touches[0].pageY;

        /**
         * 缓动代码
         */
        lastMoveStart = lastY;
        lastMoveTime = e.timeStamp || Date.now();
        stopInertiaMove = true;
    }
    function touchMove(e) {
        e.persist()
        let nowY = e.touches[0].pageY;
        let moveY = nowY - lastY;
        let content = contentRef.current
        // console.log(content);
        let reg = /\d+/ig
        let contentTop = reg.exec(content.style.transform)[0];
        // 设置top值移动content
        let value = (parseInt(contentTop) + moveY);
        console.log(value)
        content.style.transform = `translateY(${value}px)`
        lastY = nowY;

        /**
         * 缓动代码
         */
        let nowTime = e.timeStamp || Date.now();
        stopInertiaMove = true;
        if (nowTime - lastMoveTime > 300) {
            lastMoveTime = nowTime;
            lastMoveStart = nowY;
        }
    }
    function touchEnd(e) {
        e.persist()
        lastY = e.changedTouches[0].pageY;
        return
        // do touchend
        let nowY = e.changedTouches[0].pageY;
        let moveY = nowY - lastY;
        let content = contentRef.current
        let reg = /\d+/ig
        let contentTop = reg.exec(content.style.transform)[0];
        let value = (parseInt(contentTop) + moveY);
        // console.log(value)
        content.style.transform = `translateY(${value}px)`
        lastY = nowY;

        /**
         * 缓动代码
         */
        let nowTime = e.timeStamp || Date.now();
        let v = (nowY - lastMoveStart) / (nowTime - lastMoveTime); //最后一段时间手指划动速度
        stopInertiaMove = false;
        (function (v, startTime, value) {
            let dir = v > 0 ? -1 : 1; //加速度方向
            let deceleration = dir * 0.0006;
            let duration = v / deceleration; // 速度消减至0所需时间
            let dist = v * duration / 2; //最终移动多少
            function inertiaMove() {
                if (stopInertiaMove) return;
                let nowTime = e.timeStamp || Date.now();
                let t = nowTime - startTime;
                let nowV = v + t * deceleration;
                // 速度方向变化表示速度达到0了
                if (dir * nowV < 0) {
                    return;
                }
                let moveY = (v + nowV) / 2 * t;
                content.style.transform = `translateY(${value + moveY}px)`
                setTimeout(inertiaMove, 10);
            }
            inertiaMove();
        })(v, nowTime, value);
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