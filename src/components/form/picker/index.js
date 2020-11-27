import React, { useState, useEffect, useRef, Fragment } from 'react'
import Popup from 'components/base/popup'
import './index.less'
import PickerItem from './pickerItem'
import validateType from '@/utils/validateType'
/*
https://www.cnblogs.com/ranzige/p/4193739.html
https://www.jianshu.com/p/7159a7b3727e
itemHeight:40px
contentHeight:280px
*/
function Picker(props) {
    const { title = '标题', showToolbar = true, columns = [], active = true } = props
    const [curPath, setCurPath] = useState([]);
    const [deep, setDeep] = useState(0)
    useEffect(() => {
        initPathAndDeep()
        return () => {
        };

    }, []);
    return (
        <div className="picker">
            <Popup position="bottom" active={active} closePopup={props.closePopup} height="350px">
                <div hidden={!showToolbar} className="toolbar">
                    <div onClick={cancel} className="cancel">取消</div>
                    <div>{title}</div>
                    <div onClick={confirm} className="confirm">确认</div>
                </div>
                <div className="picker-wrap">
                    {renderPickItem(columns, props)}
                </div>
            </Popup>
        </div>
    )
    function initPathAndDeep() {
        let _deep = computedDeep(columns, 1)
        setDeep(_deep)
        let arr = []
        for (let i = 0; i < _deep; i++) {
            arr.push(0);
        }
        setCurPath(arr)
    }
    function computedDeep(columns, deep) {
        if (validateType(columns[0]) == 'Object') {
            setDeep(deep + 1)
            if (columns[0].children) {
                return computedDeep(columns[0].children, deep + 1)
            } else {
                return deep
            }
        }
    }

    function renderPickItem(columns, props) {
        //一维选择器

        if (validateType(columns) != 'Array') {
            throw new Error('columns should be array')
        } else {
            let checkItem = columns[0]
            if (validateType(checkItem) == 'String') {

                return (
                    <PickerItem columns={columns}
                        confirm={props.confirm}
                        closePopup={props.closePopup}
                        propsCur={props.defaultIndex} />
                )
            }
            if (validateType(checkItem) == 'Object') {
                if (checkItem.values) {
                    return (
                        <Fragment>
                            {columns.map(item => {
                                return (
                                    <PickerItem columns={item.values} propsCur={item.defaultIndex} />
                                )
                            })}
                        </Fragment>
                    )
                }
                if (checkItem.children) {
                    let children = [], level = 0
                    getChildren(children, columns, level, '')
                    return children.map((item, index) => {
                        let showItem = []
                        showItem = item.filter(item => {
                            const path = item.path.split('')
                            if (path[path.length - 1]) {
                                let prevPath = path.slice(0, path.length - 1).join('')
                                for (let i = 0; i < prevPath.length; i++) {
                                    if (prevPath[i] != curPath[i]) {
                                        return false
                                    }
                                }
                                return true
                            } else {
                                //第一层
                                return true
                            }
                        })
                        console.log(curPath[index]);
                        return (
                            <PickerItem
                                setPath={(cur) => setPath(cur)}
                                columns={showItem}
                                propsCur={curPath[index] || 0}
                                type="cascade" />
                        )
                    })
                }
            }
        }
        function getChildren(children, arr, level, path) {
            Array.isArray(arr) && arr.forEach((item, index) => {
                if (!children[level]) {
                    children[level] = []
                }
                children[level].push({ text: item.text, path: path + index })
                if (item.children) {
                    getChildren(children, item.children, level + 1, path + index)
                }
            })
        }
    }
    function setPath(cur) {
        let arr = cur.path.split('')
        if (arr.length < deep) {
            for (let index = 0; index < deep - arr.length; index++) {
                arr.push(0)
            }
        }
        console.log(arr);
        setCurPath(arr)
    }
    function clickItem(item, index) {
        console.log(222);
    }
    function confirm() {
        typeof props.confirm == 'function' ? props.confirm(cur) : null
        cancel()
    }
    function cancel() {
        typeof props.closePopup == 'function' ? props.closePopup() : null
    }
}

export default Picker