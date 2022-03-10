import Layer from './Layer.js'

export default {
    excludeStories: /.*Data$/,
    title: 'Layer',
}

const Template = (args, { argTypes }) => {
    return {
        template: '<button @click="go">Show</button>',
        methods: {
            go (v) {
                Layer.show()
            }
        },
    }
}

// Template 是一个箭头函数，bind 没有任何意义。单纯就是为了复制一个工厂函数对象。
export const Default = Template.bind({})
Default.args = {
    Layer: {
        id: '1',
        title: 'Test Layer',
        state: 'Layer_INBOX',
        updatedAt: new Date(2018, 0, 1, 9, 0),
    },
}