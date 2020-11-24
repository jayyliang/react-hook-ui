// import React from 'react'
import './index.less'
import '@/style/index.less'
import svg from './svg'
import uuid from '@/utils/uuid'
import validateType from '@/utils/validateType'

function initDom(msg, icon, duration = 2000) {
    const id = uuid()
    const div = `
        <div class="toast fade-in" id=${id}>
            ${icon ? `<div class="toast-icon">${svg[icon]}</div>` : ''}
            <div class="toast-text">${msg}</div>
        </div>
    `
    let toast = document.createElement('div')
    toast.innerHTML = div
    document.body.appendChild(toast)
    Toast.clear(toast, id, duration)
}


function Toast(obj) {
    const type = validateType(obj)
    if (type == 'String') {
        initDom(obj, false)
    } else if (type == 'Object') {
        initDom(obj.text, obj.icon, obj.duration)
    } else {
        throw new Error("argument should be String or Object")
    }
}

Toast.defaultOptions = {
    icon: '',
    text: '',
    duration: 2000
}

Toast.clear = function (toast, id, duration) {
    setTimeout(() => {
        document.querySelector('#' + id).className += ' fade-out'
    }, duration);
    setTimeout(() => {
        document.body.removeChild(toast)
    }, duration + 500);
}

/**
 *
 * @param {any} obj
 * @description 加载提示
 */
Toast.loading = function (msg) {
    Toast({
        icon: 'loading',
        text: msg || '加载中'
    })
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