import mapCard5 from './mapCard5.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: mapCard5,
    excludeStories: /.*Data$/,
    title: 'mapCard5',
}

export const actionsData = {
    'close': action('close'),
}

const Template = (args, { argTypes }) => {
    return {
        template: '<mapCard5 v-bind="$props" v-on="actionsData" />',
        components: { mapCard5 },
        props: Object.keys(args),
        beforeMount () {
            this.actionsData = actionsData
        },
    }
}

export const Tip1 = Template.bind({})
Tip1.args = {
    TYPE: undefined,
    TITLE: undefined,
    CONTENT: undefined,
}

export const Tip2 = Template.bind({})
Tip2.args = {
    ...Tip1.args,
    TYPE: 2,
}

export const Tip3 = Template.bind({})
Tip3.args = {
    ...Tip1.args,
    TYPE: 3,
}

export const Tip4 = Template.bind({})
Tip4.args = {
    ...Tip1.args,
    TYPE: 4,
}
