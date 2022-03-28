import excelCard from './index.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: excelCard,
    excludeStories: /.*Data$/,
    title: 'excelCard',
}

export const actionsData = {
    'close': action('close'),
}

const Template = (args, { argTypes }) => {
    return {
        template: '<excelCard v-bind="$props" v-on="actionsData" />',
        components: { excelCard },
        props: Object.keys(args),
        beforeMount () {
            this.actionsData = actionsData
        },
    }
}

export const Default = Template.bind({})
Default.args = {
    name: undefined,
    no: undefined,
}
