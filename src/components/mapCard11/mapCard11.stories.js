import mapCard11 from './mapCard11.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: mapCard11,
    excludeStories: /.*Data$/,
    title: 'mapCard11',
}

export const actionsData = {
    'close': action('close'),
}

const Template = (args, { argTypes }) => {
    return {
        template: '<mapCard11 v-bind="$props" v-on="actionsData" />',
        components: { mapCard11 },
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
