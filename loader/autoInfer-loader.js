const { parse } = require('@vue/compiler-sfc')
const { generatorCssCodeByClassList, generatorCssCodeByAttrsList } = require('./autoInfer-utils')

const getListByProps = props => {
    let classList = []
    let attrsList = []

    for (let i = 0; i < props.length; i++) {
        const { name, arg, exp, value } = props[i]

        // 动态属性
        if (name === 'bind') {
            // 是否为静态属性（暂不做处理，无论是否是 props 属性我都支持处理）
            // if (arg.isStatic === true) { }
            
            // fixbug，部分内置属性似乎没有 arg 属性，那么直接跳过，譬如 {{ $attrs.content }}
            if (arg) {
                // 无脑解析表达式的代码内容
                const keywords = exp.content.match(/[^{}<>"'`\s:\[\]\,]*[^{}<>"'`\s:\[\]\,]/gis)
                // 如果是 class 属性的话
                if (arg.content === 'class') {
                    classList.push(...keywords)
                } else {
                    attrsList.push(arg.content)
                    attrsList.push(...keywords)
                }
            }
        } else {
            // 静态属性
            // 纯属性，譬如 <div mt-500></div> 中的 [mt-500]
            if (value === undefined) {
                attrsList.push(name)
            } else if (name === 'class') {
                const _classList = value.content.trim().split(' ')
                classList.push(..._classList)
            }
        }
    }
    
    return { classList, attrsList }
}

const analysis = children => {
    const result = { classList: [], attrsList: [] }

    const concat = newResult => {
        result.classList.push(...newResult.classList)
        result.attrsList.push(...newResult.attrsList)
    }

    if (children && Array.isArray(children) && children.length) {
        // 当 type === 1 时，才是 dom
        const tag_items = children.filter(item => item.type === 1)

        // 递归获取属性
        tag_items.forEach(item => {
            // 如果有 children，那么递归
            if (item.children) {
                // 递归
                const children_result = analysis(item.children)
                // 合并结果
                concat(children_result)
            }

            // 获取 { classList, attrsList }
            const _result = getListByProps(item.props)
            // 合并结果
            concat(_result)
        })
    }

    return result
}


module.exports = function (source) {
    try {
        const vueParserContent = parse(source)
        const children = vueParserContent.descriptor.template.ast.children
    
        // https://www.webpackjs.com/api/loaders/#loader-%E4%B8%8A%E4%B8%8B%E6%96%87
        // if (this.resourcePath.includes('NhcTooltip')) { debugger; }
        // console.log(20220101155850, this, this.resourcePath)
        // console.log(20211225230503, this, source)
        // console.log(20220101155041, vueParserContent, children)
    
        // 解析出 classList 和 attrsList
        const { classList, attrsList } = analysis(children)
    
        // 生成代码
        const classList_csscode = generatorCssCodeByClassList([...new Set(classList)])
        const attrsList_csscode = generatorCssCodeByAttrsList([...new Set(attrsList)])
    
        const code = classList_csscode + attrsList_csscode
    
        // 修改代码
        this.callback(null, `
            ${source}
            <style scoped>${code}</style>
        `)
    } catch (err) {
        debugger;
        this.callback(null, source)
    }
    

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // 最基本的方式
    // return source

    // 异步返回方式
    // this.callback(null, source)

    // this.async 告诉 loader-runner 这个 loader 将会异步地回调
    // const callback = this.async()
    // callback(null, source)
}
