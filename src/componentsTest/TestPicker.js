import React, { useState } from 'react'
import Button from 'components/base/button'
import Picker from 'components/form/picker'
export default function TestPicker() {
    const [active, setActive] = useState(true)
    return (
        <div>
            <Button onClick={() => setActive(true)}>show picker</Button>
            <Picker
                title="选择器"
                active={active}
                closePopup={() => setActive(false)}
                columns={['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州', '杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州']}
            />
        </div>
    )
}