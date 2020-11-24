import './index.less'
import '@/style/index.less'
import svg from './svg'
import uuid from '@/utils/uuid'
import validateType from '@/utils/validateType'

function initToast(msg, icon, duration = 2000) {
    if (Toast.curId) {
        clearTimeout(Toast.timeoutId)
        Toast.timeoutId = setTimeout(() => {
            clear(Toast.instance)
            Toast.curId = null
        }, duration);
    } else {
        const toast = initDom(msg, icon)
        document.body.appendChild(toast)
        Toast.instance = toast
        Toast.timeoutId = setTimeout(() => {
            clear(toast)
            Toast.curId = null
        }, duration);
    }
}


function initDom(msg, icon) {
    const id = uuid()
    Toast.curId = id
    const div = `
        <div class="toast fade-in" id=${id}>
            ${icon ? `<div class="toast-icon">${svg[icon]}</div>` : ''}
            <div class="toast-text">${msg}</div>
        </div>
    `
    let toast = document.createElement('div')
    toast.innerHTML = div
    Toast.instance = toast
    return toast
}

function Toast(obj) {
    const type = validateType(obj)
    if (type == 'String') {
        initToast(obj, false)
    } else if (type == 'Object') {
        initToast(obj.text, obj.icon, obj.duration)
    } else {
        throw new Error("argument should be String or Object")
    }
}

Toast.defaultOptions = {
    icon: '',
    text: '',
    duration: 2000
}

function clear(toast) {
    document.querySelector('#' + Toast.curId).className += ' fade-out'
    setTimeout(() => {
        document.body.removeChild(toast)
        Toast.curId = null
        Toast.instance = null
    }, 500);
}

/**
 *
 * @param {any} obj
 * @description 加载提示
 */
Toast.showLoading = function (msg = '加载中') {
    const toast = initDom(msg, 'loading')
    document.body.appendChild(toast)
}

Toast.hideLoading = function () {
    clear(Toast.instance)
}

/**
 *
 * @param {String} msg
 */

Toast.success = function (msg) {
    Toast({
        icon: 'success',
        text: msg
    })
}
/**
 *
 * @param {String} msg
 */

Toast.fail = function (msg) {
    Toast({
        icon: 'fail',
        text: msg
    })
}

export default Toast