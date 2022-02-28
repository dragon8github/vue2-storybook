import mapCard7 from './mapCard7.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: mapCard7,
    excludeStories: /.*Data$/,
    title: 'mapCard7',
}

export const actionsData = {
    'close': action('close'),
}

const Template = (args, { argTypes }) => {
    return {
        template: '<mapCard7 v-bind="$props" v-on="actionsData" />',
        components: { mapCard7 },
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
