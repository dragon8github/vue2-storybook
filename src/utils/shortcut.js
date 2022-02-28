import { copyToClipboard, waitWhen, isDEV } from '@/utils/utils'

// 重要认知：这里等于直接获取了组件对象本身，当我修改它时，其实等于修改了组件。
// TODO:干脆一点，直接覆盖整个项目所有的组件，甚至小组件。
const AllComponents = require.context('@', true, process.env.NODE_ENV === 'development' ? /\.vue$/ : /NULL/)

// 排除
const exclude = path => !path.includes('vue-echarts') && !path.includes('countTo')

// 如果没有传入指定的 Vue 引用集，那就是用项目所有 Vue 引用
export const shortcut = (VueComponent = AllComponents) => {
    VueComponent.keys().filter(exclude).forEach(path => {
        // 直接获取文件内容的引用
        const output = VueComponent(path).default
    
        // 还真有可能存在 undefined 的
        if (output) {
            // init methods 
            if (!output.methods) output.methods = {}
    
            // init created
            if (!output.created) output.created = function() {}
    
            // inject __file methods
            output.methods['__file'] = () => output.__file
    
            // origin created methods
            // fixbug: copy methods 
            const origin = Object.assign({}, { created: output.created })
    
            // inject created addclick callbacks
            output.created = function () {
                // origin created apply
                origin.created.apply(this)
    
                // inject
                ;(async () => {
                    // 等待组件渲染
                    const $el = await waitWhen(_ => this.$el)
                    // 添加点击事件，打印出本文件的目录
                    $el.addEventListener('click', (event) => {
                        const { ctrlKey, shiftKey } = event
                        
                        if (ctrlKey || shiftKey) {
                            // 路径
                            const file = this.__file()
                            // copy
                            copyToClipboard(file)
                            // 打印
                            window.alert(`已加入剪切板：${file}`)
                            // 禁止冒泡
                            event.preventDefault(); event.stopPropagation();
                        }
                    })
                })();
            }
        }
    })
}