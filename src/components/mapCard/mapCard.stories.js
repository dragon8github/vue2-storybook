import mapCard from './mapCard.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: mapCard,
    excludeStories: /.*Data$/,
    title: 'mapCard',
}

export const actionsData = {
    'close': action('close'),
}

const Template = (args, { argTypes }) => {
    return {
        template: '<mapCard v-bind="$props" v-on="actionsData" />',
        components: { mapCard },
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
    NUM_NEW: undefined,
    NUM_QOQ: undefined,
    NUM_YOY: undefined,
    NUM_DOING: undefined,
    NUM_OVER_PERC: undefined,
    NUM_DONE_PERC: undefined,
}

export const Pinned = Template.bind({})
Pinned.args = {
    ...Default.args,
    state: 'mapCard_PINNED',
}
