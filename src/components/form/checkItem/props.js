export default {
    size: {
        type: 'Number',
        value: null,
        default: 20
    },
    color: {
        type: 'String',
        value: null,
        default: '#1989fa'
    },
    label: {
        type: 'String',
        value: null,
        default: '复选框'
    },
    checked: {
        type: 'Boolean',
        value: [true, false],
        default: false
    },
    round: {
        type: 'Boolean',
        value: [true, false],
        default: false
    },
    disabled: {
        type: 'Boolean',
        value: [true, false],
        default: false
    },
    horizontal: {
        type: 'Boolean',
        value: [true, false],
        default: false
    },
    _defaultNeed: ['size', 'color', 'label', 'round', 'disabled', 'horizontal']
}