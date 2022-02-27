
// ...
const getValue = (d, unit) => {
    // 默认模式
    if (!unit) return d / 16 + 'rem'

    // 自定义模式（示例）
    if (unit == 'rpx') return d / 16 + 'rem'

    // 自定义模式（示例2）
    if (unit == 'x') return d * 0.25 + 'em'

    // 常规模式
    if (unit) return d + unit
}

// 借鉴设计规则：https://github.com/antfu/unocss/tree/v0.15.3#dynamic-rules
const rules = [
    /* width、height */
    [/^w-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ width: getValue(d, unit) })],
    [/^h-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ height: getValue(d, unit) })],

    /* margin */
    [/m-auto/, () => ({ margin: 'auto' })],
    [/mx-auto/, () => ({ margin: 'auto' })],
    [/^m-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ margin: getValue(d, unit) })],
    [/^my-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ 'margin-top': getValue(d, unit), 'margin-bottom': getValue(d, unit) })],
    [/^mx-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ 'margin-left': getValue(d, unit), 'margin-right': getValue(d, unit) })],
    [/^mt-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ 'margin-top': getValue(d, unit) })],
    [/^mr-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ 'margin-right': getValue(d, unit) })],
    [/^mb-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ 'margin-bottom': getValue(d, unit) })],
    [/^ml-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ 'margin-left': getValue(d, unit) })],

    /* padding */
    [/^p-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ padding: getValue(d, unit) })],
    [/^py-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ 'padding-top': getValue(d, unit), 'padding-bottom': getValue(d, unit) })],
    [/^px-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ 'padding-left': getValue(d, unit), 'padding-right': getValue(d, unit) })],
    [/^pt-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ 'padding-top': getValue(d, unit) })],
    [/^pr-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ 'padding-right': getValue(d, unit) })],
    [/^pb-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ 'padding-bottom': getValue(d, unit) })],
    [/^pl-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ 'padding-left': getValue(d, unit) })],

    /* font-size（习惯原因，支持 .f-16 也支持 .f16） */
    [/^f\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, d, , unit]) => ({ 'font-size': getValue(d, unit) })],
    [/^f-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, d, , unit]) => ({ 'font-size': getValue(d, unit) })],
    [/^fs-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, d, , unit]) => ({ 'font-size': getValue(d, unit) })],

    /* position */
    [/^top-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ top: getValue(d, unit) })],
    [/^right-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ right: getValue(d, unit) })],
    [/^bottom-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ bottom: getValue(d, unit) })],
    [/^left-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ left: getValue(d, unit) })],

    /* line-height */
    [/^lineheight-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ 'line-height': getValue(d, unit) })],
    [/^lh-\(?((-?\d+(\.\d+)?)(.*?))\)?$/i, ([, , d, , unit]) => ({ 'line-height': getValue(d, unit) })],

    /* color，支持这些格式：c-#fff、c-red、c-rgba(0,0,0,.5) 但逗号之间不能有空格 */
    [/^c-(.+)$/i, ([, c]) => ({ color: c })],

    /* ------- basic demo ------- */
    // [/^m-(\d+)$/i, ([, d]) => ({ margin: `${d / 4}rem` })],
    // [/^p-(\d+)$/i, ([, d]) => ({ padding: `${d / 4}rem` })],
]

/**
 * 查到类名是否匹配
 */
const getRuleByClassName = className => rules.find(rule => rule[0].test(className))

/**
 * 修复非法类名，譬如 .mt-100% => .mt-100\%
 */
 const polyfillClassName = className => className.replace(/[^A-Za-z\d-_]/g, (target, index, raw) => '\\' + target)


const generatorCssCodeByClassList = classList =>
    classList.reduce((p, className) => {
        const rule = getRuleByClassName(className)

        if (rule) {
            const [regex, callback] = rule

            const result = className.match(regex)

            // 返回 json，类似 { margin: '.5rem' }
            const jsonObject = callback(result)

            // 修复非法类名，譬如 .mt-100% => .mt-100\%
            const _className = polyfillClassName(className)

            let code = ''

            try {
                // console.log(20220102114757, JSON.stringify(jsonObject))
                code = `.${_className} { ${ Object.entries(jsonObject).reduce((p, [key, val]) => p += `${key}: ${val};`, '') } }`
                // console.log(20220102133333, code)
            } catch (err) {
                debugger;
            }

            // 累加
            p += code.replace(/[\n\s]/gis, '') + '\n'
        }

        return p
    }, '')

const generatorCssCodeByAttrsList = attrs =>
    attrs.reduce((p, className) => {
        const rule = getRuleByClassName(className)

        if (rule) {
            const [regex, callback] = rule

            const result = className.match(regex)

            // 返回 json，类似 { margin: '.5rem' }
            const jsonObject = callback(result)

            // 修复非法类名，譬如 .mt-100% => .mt-100\%
            const _className = polyfillClassName(className)

            let code = ''

            try {
                // console.log(20220102114757, JSON.stringify(jsonObject))
                code = `[${_className}] { ${ Object.entries(jsonObject).reduce((p, [key, val]) => p += `${key}: ${val};`, '') } }`
                // console.log(20220102133333, code)
            } catch (err) {
                debugger;
            }

            // 累加
            p += code.replace(/[\n\s]/gis, '') + '\n'
        }

        return p
    }, '')

module.exports = { 
    generatorCssCodeByClassList, 
    generatorCssCodeByAttrsList 
}