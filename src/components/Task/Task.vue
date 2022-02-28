<template>
    <div :class="classes">
        <label class="checkbox">
            <input type="checkbox" :checked="isChecked" disabled name="checked" />
            <span class="checkbox-custom" @click="archiveTask" />
        </label>
        <div class="title">
            <input type="text" :value="task.title" readonly placeholder="Input title" />
        </div>
        <div class="actions">
            <a v-if="!isChecked" @click="pinTask">
                <span class="icon-star" />
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Task',
    props: {
        task: {
            type: Object,
            required: true,
            default: () => ({ id: '', state: '', title: '' }),
            validator: task => ['id', 'state', 'title'].every(key => key in task),
        },
    },
    methods: {
        archiveTask() {
            this.$emit('archive-task', this.task.id)
        },
        pinTask() {
            this.$emit('pin-task', this.task.id)
        },
    },
    computed: {
        classes() {
            return {
                'list-item TASK_INBOX': this.task.state === 'TASK_INBOX',
                'list-item TASK_PINNED': this.task.state === 'TASK_PINNED',
                'list-item TASK_ARCHIVED': this.task.state === 'TASK_ARCHIVED',
            }
        },
        isChecked() {
            return this.task.state === 'TASK_ARCHIVED'
        },
    },
}
</script>