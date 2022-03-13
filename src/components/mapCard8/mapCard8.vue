<template>
	<div class="mapCard posr" ref="mapCard">
		<div class="title">{{ TITLE }}</div>
		<div class="body">
			<div class="sTitle">简介</div>
			<div class="content" v-html="CONTENT"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'mapCard',
	data() {
		return {}
	},
	props: {
		TITLE: { type: [String], default: '大岭山片区' },
		CONTENT: { type: [String], default: '<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>' },
	},
	methods: {
		close(v) {
			this.$emit('close')
		},
	},
}
</script>

<style lang='scss' scoped>
.mapCard {
	position: relative;
	padding: rem(30) rem(20) rem(20) rem(40);
	@include bg(rem(372), rem(273), './assets/莞香文化.png');
	color: #fff;

	.title {
		position: absolute;
		top: 0;
		left: rem(70);
		line-height: rem(30);
		white-space: nowrap;
		font-size: rem(16);
	}

	.body {
		height: rem(200);
		padding: rem(20) rem(30) rem(20) rem(20);
	}

	.sTitle {
		font-size: rem(18);
		color: #ffffff;
		@include bg(100%, rem(28), './assets/小标题.png');
		padding: rem(2) rem(15);
		margin-bottom: rem(15);
		margin-left: rem(-3);
	}

	.content {
		height: rem(130);
		@include scrollbar();
		overflow: auto;
		word-break: break-all;
	}
}
</style>
