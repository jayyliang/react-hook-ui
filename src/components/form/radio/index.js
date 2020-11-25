import React from 'react'
import CheckItem from 'components/form/checkItem'
function Radio(props) {
    return (
        <CheckItem
            size={props.size || 20}
            color={props.color || '#1989fa'}
            label={props.label || '单选框'}
            round={props.round || true}
            checked={props.checked}
            change={props.change}
        />
    )
}
export default React.memo(Radio)