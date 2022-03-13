import { maybe, injectCss, throttle } from '@/utils/utils'

const __ID__ = 'LAYER__POINT__STYLE'

// news: 当场注册快捷键
const installkey = (clicks = document.querySelectorAll('._click'), keyword = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'J', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',]) => clicks.forEach((val, key) => val.setAttribute('data-click', keyword[key]))

// 插入样式
const insertLayerPointStyle = () =>
    injectCss(
        `
    [data-click]::before, [data-click]::after { all: initial !important; }
    [data-click] { position: relative; animation: Pulse 2s infinite; border-radius: 4px; }
    [data-click]::after { content: attr(data-click) !important; position: absolute !important; left: 50% !important; top: 50% !important; transform: translate(-50%, -50%) !important; font-size: 3em !important; color: yellow !important; }

`,
        __ID__
    )

// 删除所有 layer-point 的样式标签
const removeLayerPointStyle = () => document.querySelectorAll('#' + __ID__).forEach(el => el.remove())

// 通过 数值 匹配 layer-point
const findElement = cmd => [...document.querySelectorAll('._click')].find(el => el.attributes['data-click'].value.toLocaleLowerCase() === cmd.toLocaleLowerCase())

// 节流触发点击，防止多重触发
const triggerClick = throttle(el => el.click(), 1000, { leading: true, trailing: false })

// status
let status = ''

export default {
    install() {
        document.addEventListener('keydown', event => {
            // 按下 shift 键的时候
            if (event.key === 'Shift' && status != 'keydown') {
                // 注册快捷键
                installkey()
                // 往页面插入一个 style 标签
                insertLayerPointStyle()

                status = 'keydown'
            }

            // 按下 shift + 组合键的时候
            if (event.shiftKey && event.key != 'Shift') {
                let el = null

                // 0 ~ 9，但不能用 key，因为如果是 shift + 1，那就是 ! 号了
                if (event.keyCode >= 48 && event.keyCode <= 57) {
                    // 0 ~ 9
                    const key = {48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9'}
                    // 获取元素
                    el = maybe(_ => findElement(key[event.keyCode]), null)
                } else {
                    // 找到符合指令的元素
                    el = maybe(_ => findElement(event.key), null)
                }

                // 如果找到元素了
                if (el) {
                    // 强制点击
                    triggerClick(el)
                    // 删除闪光
                    removeLayerPointStyle()
                    // 防止快捷键冲突
                    event.preventDefault()
                    event.stopPropagation()
                }
            }
        })

        document.addEventListener('keyup', event => {
            if (event.key === 'Shift') {
                removeLayerPointStyle()
                status = ''
            }
        })

        window.onblur = function () {
            removeLayerPointStyle()
            status = ''
        }
    },
}
