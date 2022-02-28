import mapCard9 from './mapCard9.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: mapCard9,
    excludeStories: /.*Data$/,
    title: 'mapCard9',
}

export const actionsData = {
    'close': action('close'),
}

const Template = (args, { argTypes }) => {
    return {
        template: '<mapCard9 v-bind="$props" v-on="actionsData" />',
        components: { mapCard9 },
        props: Object.keys(args),
        beforeMount () {
            this.actionsData = actionsData
        },
    }
}

export const Default = Template.bind({})
Default.args = {
    NAME: undefined,
    AREA: undefined,
    ADDRESS: undefined,
}
