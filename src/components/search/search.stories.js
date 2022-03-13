import search from './search.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: search,
    excludeStories: /.*Data$/,
    title: 'search',
}

export const actionsData = {
    'close': action('close'),
}

const Template = (args, { argTypes }) => {
    return {
        template: '<search />',
        components: { search },
        props: Object.keys(args),
        beforeMount () {
            
        },
    }
}

export const Default = Template.bind({})
Default.args = {
    name: undefined,
    no: undefined,
}
