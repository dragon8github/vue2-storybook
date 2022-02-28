import mapCard8 from './mapCard8.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: mapCard8,
    excludeStories: /.*Data$/,
    title: 'mapCard8',
}

export const actionsData = {
    'close': action('close'),
}

const Template = (args, { argTypes }) => {
    return {
        template: '<mapCard8 v-bind="$props" v-on="actionsData" />',
        components: { mapCard8 },
        props: Object.keys(args),
        beforeMount () {
            this.actionsData = actionsData
        },
    }
}

export const Default = Template.bind({})
Default.args = {
    TITLE: undefined,
    CONTENT: undefined,
}
