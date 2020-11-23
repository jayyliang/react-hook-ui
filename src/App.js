import React from 'react'
import Button from 'components/base/button'
import Loading from 'components/feedback/loading'
import Icon from 'components/base/icon'
function App() {

    return (
        <div>
            <Button loading onClick={click} type="primary">主要按钮</Button>
            <Button icon="alert" onClick={click} type="primary">主要按钮</Button>
            <Button color="#7232dd" size="small" round type="info">信息按钮</Button>
            <Button square type="default">默认按钮</Button>
            <Button size="mini" hairline type="warning">警告按钮</Button>
            <Button hairline type="danger">危险按钮</Button>
            <Icon name="chevron-right" />
        </div>
    )
    function click(e) {
        console.log(e)
        console.log('click')
    }
}

export default App