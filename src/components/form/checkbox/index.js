import React from 'react'
import CheckItem from 'components/form/checkItem'
function Checkbox(props) {
    return (
        <CheckItem
            size={props.size || 20}
            color={props.color || '#1989fa'}
            label={props.label || '复选框'}
            round={props.round || false}
            disabled={props.disabled || false}
            checked={props.checked}
            change={props.change}
        />
    )
}
export default React.memo(Checkbox)