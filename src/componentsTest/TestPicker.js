import React, { useState } from 'react'
import Button from 'components/base/button'
import Picker from 'components/form/picker'
let columns1 = ['杭州', '宁波', '温州', '嘉兴', '金华', '衢州', '杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州']
let columns2 = [{
    values: ['周一', '周二', '周三', '周四', '周五'],
    defaultIndex: 2,
},
// 第二列
{
    values: ['上午', '下午', '晚上'],
    defaultIndex: 1,
},]
let columns3 = [
    {
        text: '广东',
        children: [
            {
                text: '广州',
                children: [{ text: '番禺区' }, { text: '天河区' }],
            },
            {
                text: '深圳',
                children: [{ text: '南山区' }, { text: '宝安区' }, { text: '龙华区' }],
            },
        ],
    },
    {
        text: '福建',
        children: [
            {
                text: '福州',
                children: [{ text: '鼓楼区' }, { text: '台江区' }],
            },
            {
                text: '厦门',
                children: [{ text: '思明区' }, { text: '海沧区' }],
            },
        ],
    },
]
export default function TestPicker() {
    const [active, setActive] = useState(true)
    return (
        <div>
            <Button onClick={() => setActive(true)}>show picker</Button>
            <Picker
                title="选择器"
                active={active}
                closePopup={() => setActive(false)}
                columns={columns3}
            />
        </div>
    )
}