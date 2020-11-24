export default {
    position: {
        type: 'String',
        value: ['top', 'left', 'bottom', 'right', 'mid'],
        default: 'mid'
    },
    round: {
        type: 'Boolean',
        value: [true, false],
        default: false
    },
    height: {
        type: 'String',
        value: null,
        default: '30%'
    },
    width: {
        type: 'String',
        value: null,
        default: '150px'
    },
    _defaultNeed: ['position']
}