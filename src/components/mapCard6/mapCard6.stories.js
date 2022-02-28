import mapCard6 from './mapCard6.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: mapCard6,
    excludeStories: /.*Data$/,
    title: 'mapCard6',
}

export const actionsData = {
    'close': action('close'),
}

const Template = (args, { argTypes }) => {
    return {
        template: '<mapCard6 v-bind="$props" v-on="actionsData" />',
        components: { mapCard6 },
        props: Object.keys(args),
        beforeMount () {
            this.actionsData = actionsData
        },
    }
}

export const Default = Template.bind({})
Default.args = {
    TITLE: undefined,
    AREA: undefined,
    NUM: undefined,
}
