import mapCard12 from './mapCard12.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: mapCard12,
    excludeStories: /.*Data$/,
    title: 'mapCard12',
}

export const actionsData = {
    'close': action('close'),
}

const Template = (args, { argTypes }) => {
    return {
        template: '<mapCard12 v-bind="$props" v-on="actionsData" />',
        components: { mapCard12 },
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
