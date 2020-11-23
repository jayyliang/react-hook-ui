export default {
    type: {
        type: 'String',
        values: ['default', 'primary', 'info', 'warning', 'danger'],
        default: 'default',
    },
    hairline: {
        type: 'Boolean',
        value: [true, false],
        default: false
    },
    disabled: {
        type: 'Boolean',
        value: [true, false],
        default: false
    },
    loading: {
        type: 'Boolean',
        value: [true, false],
        default: false
    },
    loadingText: {
        type: 'String',
        value: null,
        default: '加载中···',
    },
    square: {
        type: 'Boolean',
        value: [true, false],
        default: false
    },
    round: {
        type: 'Boolean',
        value: [true, false],
        default: false
    },
    size: {
        type: 'String',
        value: ['large', 'normal', 'small', 'mini'],
        default: 'normal',
    },
    color: {
        type: 'String',
        value: null,
        default: null
    },
    _defaultNeed: ['size', 'type', 'loadingText']
}