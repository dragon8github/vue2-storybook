import Task from './Task.vue'

import { action } from '@storybook/addon-actions'

export default {
    component: Task,
    //👇 Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
    title: 'Task',
}

export const actionsData = {
    'pin-task': action('pin-task'),
    'archive-task': action('archive-task'),
}

const Template = (args, { argTypes }) => {
    return {
        components: { Task },
        beforeMount () {
            this.args = args
            this.actionsData = actionsData
        },
        template: '<Task v-bind="args" v-on="actionsData" />',
    }
}

// Template 是一个箭头函数，bind 没有任何意义。单纯就是为了复制一个工厂函数对象。
export const Default = Template.bind({})
Default.args = {
    task: {
        id: '1',
        title: 'Test Task',
        state: 'TASK_INBOX',
        updatedAt: new Date(2018, 0, 1, 9, 0),
    },
}

export const Pinned = Template.bind({})
Pinned.args = {
    task: {
        ...Default.args.task,
        state: 'TASK_PINNED',
    },
}

export const Archived = Template.bind({})
Archived.args = {
    task: {
        ...Default.args.task,
        state: 'TASK_ARCHIVED',
    },
}
