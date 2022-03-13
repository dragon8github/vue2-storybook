/**
 * 「Event 基础示例」
 * const obj = new Event()
 * obj.$on('fuck', (...args) => console.log('fuck', ...args))
 * obj.$emit('fuck', 123)
 *
 * 「无缝对接 Event 的接口示例」
 * const obj = { a: 123, b: 321 }
 * Object.assign(obj, (new Event()).$interface)
 * obj.$on('fuck', (...args) => console.log('fuck', ...args))
 * obj.$emit('fuck', 123)
 */
export default class Event {
    constructor(props) {
        this.$event = []
    }

    $on(name, fn, id = Date.now()) {
        this.$event.push({ name, fn, id })

        return () => {
            const index = this.$event.findIndex(_ => _.id === id)
            this.$event.splice(index, 1)
        }
    }

    $emit(name, ...args) {
        // 获取任务
        const target = this.$event.filter(_ => _.name === name)

        // 是否存在任务
        if (target) {
            // 对每个任务进行执行
            const pendding = target.map(_ => _.fn(...args))
            // 如果任务返回的是promise，也可以方便外部 await
            return Promise.allSettled(pendding)
        }
    }

    $clear(name = '') {
        this.$event = this.$event.filter(_ => _.name != name)
    }

    get $interface() {
        return {
            $on: this.$on.bind(this),
            $emit: this.$emit.bind(this),
            $clear: this.$clear.bind(this),
        }
    }
}