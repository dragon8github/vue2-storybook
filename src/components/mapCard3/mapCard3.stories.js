import mapCard3 from './mapCard3.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: mapCard3,
    excludeStories: /.*Data$/,
    title: 'mapCard3',
}

export const actionsData = {
    'close': action('close'),
}

const Template = (args, { argTypes }) => {
    return {
        template: '<mapCard3 v-bind="$props" v-on="actionsData" />',
        components: { mapCard3 },
        props: Object.keys(args),
        beforeMount () {
            this.actionsData = actionsData
        },
    }
}

export const Default = Template.bind({})
Default.args = {
    NAME: '--',
    TRADE: '--',
    COMMUNITY: '--',
    REGCAP: '--',
    TIME: '--',
    STAFF_NUM: '--',
}
