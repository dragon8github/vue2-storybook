import progressBar from './progressBar.js'

export default {
    excludeStories: /.*Data$/,
    title: 'progressBar',
}

const Template = (args, { argTypes }) => {
    return {
        template: '<button @click="go">Show</button>',
        methods: {
            go () {
                progressBar.show('正在初始化数据，请稍等...')
                let i = 0

                progressBar.setProgress(80)
                // let timer = setInterval(() => {
                //     progressBar.setProgress(++i)
                //     if (i >= 100) {
                //         clearInterval(timer)
                //         progressBar.setTitle('数据加载成功 ☀️')
                //         progressBar.setsTitle('正在处理数据 ✈️...')

                //         setTimeout(() => {
                //             progressBar.hide()
                //         }, 3000);
                //     }
                // }, 100)
            }
        },
    }
}

// Template 是一个箭头函数，bind 没有任何意义。单纯就是为了复制一个工厂函数对象。
export const Default = Template.bind({})
Default.args = {
    progressBar: {
        id: '1',
        title: 'Test progressBar',
        state: 'progressBar_INBOX',
        updatedAt: new Date(2018, 0, 1, 9, 0),
    },
}