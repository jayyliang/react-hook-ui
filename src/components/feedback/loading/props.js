export default {
    color: {
        type: 'String',
        value: null,
        default: '#c9c9c9'
    },
    size: {
        type: 'String',
        value: null,
        default: '30px',
    },
    text: {
        type: 'String',
        value: null,
        default: '加载中...'
    },
    textSize: {
        type: 'String',
        value: null,
        default: '16px'
    },
    vertical: {
        type: 'Boolean',
        value: [true, false],
        default: false
    },
    _defaultNeed: ['color', 'size', 'textSize']
}