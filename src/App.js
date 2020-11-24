import React, { useState } from 'react'
import Button from 'components/base/button'
import Loading from 'components/feedback/loading'
import Icon from 'components/base/icon'
import Cell from 'components/base/cell'
import Popup from 'components/base/popup'
import Toast from 'components/base/toast'
import Checkbox from 'components/form/checkbox'
function App() {
    let [useActive, setActive] = useState(false)
    let [useCheck, setCheck] = useState(false)
    return (
        <div>
            <Button loading onClick={click} type="primary">主要按钮</Button>
            <Button icon="alert" onClick={click} type="primary">主要按钮</Button>
            <Button color="#7232dd" size="small" round type="info">信息按钮</Button>
            <Button square type="default">默认按钮</Button>
            <Button size="mini" hairline type="warning">警告按钮</Button>
            <Button hairline type="danger">危险按钮</Button>
            <Icon name="chevron-right" />
            <Cell icon="alert" title="砂碎石" value="请问" isLink="right" />
            <Cell icon="alert" title="砂碎石" value="请问" isLink="right" />
            <Button onClick={() => setActive(true)}>展示弹出层</Button>
            <Popup
                active={useActive}
                closePopup={() => setActive(false)}
                position="bottom"
            >
                <Button type="info">内容</Button>
            </Popup>
            <Button onClick={() => {
                // Toast('提示内容')
                Toast.loading('123')
            }}>点击弹出提示</Button>
            {/* <Button onClick={() => setCheck(true)}></Button> */}
            <Checkbox
                size="20"
                color="#1989fa"
                label="复选3333框"
                checked={useCheck}
                round
            />
        </div>
    )
    function click(e) {
        console.log(e)
        console.log('click')
    }
}

export default App