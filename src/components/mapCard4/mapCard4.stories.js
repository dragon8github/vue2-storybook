import mapCard4 from './mapCard4.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: mapCard4,
    excludeStories: /.*Data$/,
    title: 'mapCard4',
}

export const actionsData = {
    'close': action('close'),
}

const Template = (args, { argTypes }) => {
    return {
        template: '<mapCard4 v-bind="$props" v-on="actionsData" />',
        components: { mapCard4 },
        props: Object.keys(args),
        beforeMount () {
            this.actionsData = actionsData
        },
    }
}

export const Default = Template.bind({})
Default.args = {
    ID: '--',
    TITLE: '--',
    CONTENT: '--',
    TIME: '--',
    COMMUNITY_NAME: '--',
}
