import mapCard10 from './mapCard10.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: mapCard10,
    excludeStories: /.*Data$/,
    title: 'mapCard10',
}

export const actionsData = {
    'close': action('close'),
}

const Template = (args, { argTypes }) => {
    return {
        template: '<mapCard10 v-bind="$props" v-on="actionsData" />',
        components: { mapCard10 },
        props: Object.keys(args),
        beforeMount () {
            this.actionsData = actionsData
        },
    }
}

export const Default = Template.bind({})
Default.args = {
    NAME: undefined,
    ADDRESS: undefined,
}
