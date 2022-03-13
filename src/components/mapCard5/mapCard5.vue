<template>
	<div class="mapCard posr" :class='"mapCard-" + TYPE' ref='mapCard'>
		<div class='title'>{{ TITLE }}</div>
		<div class='body'>
			<div class='content' v-html='CONTENT'></div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'mapCard',
	data() {
		return {
		}
	},
	props: {
		// 卡片类型
		TYPE: {type: [String, Number], default: 1 },
		// 标题
		TITLE: {type: String, default: '社区/村名称'},
		// 内容
		CONTENT: {type: String, default: '常住人口 56,600 人'},
	},
	methods: {
		close (v) {
			window.$blurMarker()
		}
	},
}
</script>

<style lang='scss' scoped>
.mapCard {
	padding: rem(0) rem(35) rem(40) rem(35);
	display: flex !important;
	flex-direction: column;
	color: #fff;
	position: relative;
	
	&-1 { @include bg(rem(346), rem(132), './assets/tip-1.png'); }
	&-2 { @include bg(rem(338), rem(132), './assets/tip-2.png'); }
	&-3 { @include bg(rem(298), rem(132), './assets/tip-3.png'); }
	&-4 { @include bg(rem(279), rem(132), './assets/tip-4.png'); }

	.title {
		padding-left: rem(30);
		height: rem(30);
		line-height: rem(32);
	}

	.body {
		flex: 1;
		@include flex(s, c);
		padding-left: rem(30);
	}	
}
</style>
