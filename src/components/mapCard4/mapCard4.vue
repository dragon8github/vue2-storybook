<template>
	<div class="mapCard">
		<div class="mapCard__header">事件编号：{{ ID }}</div>
		<div class="mapCard__body">
			<div class="mapCard__close" @click="close"></div>
			<div class="mapCard__time flex-sc">
				<div>{{ TIME }}</div>
				<i class="line"></i>
				<div>{{ COMMUNITY_NAME }}</div>
			</div>
			<div class="mapCard__title">事件标题</div>
			<div class="mapCard__title--content">{{ TITLE }}</div>
			<div class="mapCard__title">事件内容</div>
			<div class="mapCard__content" v-html="CONTENT"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'mapCard',
	data() {
		return {}
	},
	methods: {
		close() {
			this.$emit('close')
		},
	},
	props: {
		// 订单号
		ID: { type: String, default: '-' },
		// 标题
		TITLE: { type: String, default: '-' },
		// 内容
		CONTENT: { type: String, default: '-' },
		// 时间
		TIME: { type: String, default: '-' },
		// 社区
		COMMUNITY_NAME: { type: String, default: '-' },
	},
	beforeMount() {},
}
</script>

<style lang="scss" scoped>
.mapCard {
	color: #ffffff;
	overflow: hidden;
	min-width: rem(450);
	position: absolute;
	font-size: rem(14);

	.mapCard__close {
		font-size: rem(18);
		position: absolute;
		right: rem(50);
		top: rem(40);
		width: rem(36);
		height: rem(38);
		@include bg(rem(13), rem(13), './assets/close.png');
	}

	.mapCard__header {
		@include bg(rem(294), rem(37), './assets/def_card_top.png');
		display: block;
		position: absolute;
		top: rem(0);
		left: rem(32);
		line-height: rem(30);
		text-align: left;
		padding-left: rem(30);
	}

	.mapCard__body {
		@include bg(rem(450), rem(397), './assets/def_card_bg.png');
		position: relative;
		padding: rem(45) rem(50) 0 rem(50);
		margin-bottom: rem(-30);
	}

	.mapCard__time {
		@include bg(rem(350), rem(20), './assets/time.png');
		padding-left: rem(10);
	}

	.mapCard__title {
		@include bg(rem(274), rem(24), './assets/title.png');
		line-height: rem(24);
		padding-left: rem(10);
		margin: rem(18) 0;
	}

	.mapCard__title--content {
		color: #c2feff;
	}

	.mapCard__content {
		color: #c2feff;
		overflow: auto;
		@include scrollbar();
		height: rem(128);
		letter-spacing: rem(1);
		white-space: pre-line;
	}

	.line {
		@include bg(rem(1), rem(12), './assets/line.png');
		margin: 0 rem(10);
	}
}
</style>