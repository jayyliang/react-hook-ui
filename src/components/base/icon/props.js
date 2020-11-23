export default {
    name: {
        type: 'String',
        value: null,
        default: 'alert'
    },
    size: {
        type: 'Number',
        value: null,
        default: 24
    },
    color: {
        type: 'String',
        value: null,
        default: '#323233'
    },
    _defaultNeed: ['name', 'size', 'color']
}