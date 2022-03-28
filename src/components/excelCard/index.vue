<template>
    <div class="attr-panel" ref="panel">
        <div class="info-wrapper">
            <div class="attr-panel-body" v-loading="loading">
                <div class="close-btn" @click="close"></div>
                <div class="bold info-item-title">基本信息</div>
                <div class="content-wrapper">
                    <div class="field" v-for='(item, index) in items' :key='index'>
                        <div class="field__label" v-html='item.label'></div>
                        <div class="field__value" v-html='item.value'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const mockData = [
	{ label: '面积', value: '1000㎡ / 1000km' },
	{ label: '周长', value: '1000km' },
	{ label: '姓名', value: 'foobar' },
	{ label: '性别', value: 'world' },
	{ label: '人口', value: '1000万' },
]

export default {
    components: {},
    data() {
        return {}
    },
	props: {
		// 数组
		items: {type: Array, default: () => mockData },
	},
    beforeMount() {},
}
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>

