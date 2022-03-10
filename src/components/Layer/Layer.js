import Vue from 'vue'
import layer from './Layer.vue'

const layerConstructor = Vue.extend(layer)

let _initInstance

const initInstance = () => {
    _initInstance = new layerConstructor({
        el: document.createElement('div'),
    })
    document.body.appendChild(_initInstance.$el)
}

// 注册一些快捷键
const shortcutKeyHandler = event => {
    // 监听esc键退出全屏
    if (event.keyCode == 27) _initInstance.hide()
}

const show = channelId => {
    if (!_initInstance) {
        initInstance()
    }

    _initInstance.show()
    document.addEventListener('keydown', shortcutKeyHandler)
}

const close = () => {
    Vue.nextTick(() => {
        _initInstance && _initInstance.hide()
        document.removeEventListener('keydown', shortcutKeyHandler)
    })
}

export default {
    show,
    close,
}


/*
import feedback from '@/components/dgFeedback'
window.$feedback = feedback

window.$feedback.show()
 */
