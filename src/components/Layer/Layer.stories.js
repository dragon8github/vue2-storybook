import Layer from './Layer.vue'

import { action } from '@storybook/addon-actions'

export default {
    component: Layer,
    excludeStories: /.*Data$/,
    title: 'Layer',
}

export const actionsData = {
    'pin-Layer': action('pin-Layer'),
    'archive-Layer': action('archive-Layer'),
}

const Template = (args, { argTypes }) => {
    return {
        components: { Layer },
        beforeMount () {
            this.args = args
            this.actionsData = actionsData
        },
        template: '<Layer v-bind="args" v-on="actionsData" />',
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

export const Pinned = Template.bind({})
Pinned.args = {
    Layer: {
        ...Default.args.Layer,
        state: 'Layer_PINNED',
    },
}