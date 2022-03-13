import Vue from 'vue'
import progressBar from './progressBar.vue'

const progressBarConstructor = Vue.extend(progressBar)

let _initInstance

const initInstance = () => {
    _initInstance = new progressBarConstructor({
        el: document.createElement('div'),
    })
    document.body.appendChild(_initInstance.$el)
}

// 注册一些快捷键
const shortcutKeyHandler = event => {
    // 监听esc键退出全屏
    if (event.keyCode == 27) _initInstance.hide()
}

const show = (...args) => {
    if (!_initInstance) {
        initInstance()
    }

    _initInstance.show(...args)
    document.addEventListener('keydown', shortcutKeyHandler)
}

const close = (...args) => {
    Vue.nextTick(() => {
        _initInstance && _initInstance.hide(...args)
        document.removeEventListener('keydown', shortcutKeyHandler)
    })
}

export default new Proxy({ show, close, }, { 
    get (target, name) {
        if (name in target) {
            return target[name]
        }
        
        if (name in _initInstance) {
            return _initInstance[name]
        }
    }
})