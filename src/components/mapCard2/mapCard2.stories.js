import mapCard2 from './mapCard2.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: mapCard2,
    excludeStories: /.*Data$/,
    title: 'mapCard2',
}

export const actionsData = {
    'close': action('close'),
}

const Template = (args, { argTypes }) => {
    return {
        template: '<mapCard2 v-bind="$props" v-on="actionsData" />',
        components: { mapCard2 },
        props: Object.keys(args),
        beforeMount () {
            this.actionsData = actionsData
        },
    }
}

export const Default = Template.bind({})
Default.args = {
    ORDER_ID: '--',
    TITLE: '--',
    CONTENT: '--',
    TIME: '--',
    COMMUNITY_NAME: '--',
}
