<template>
	<div class="mapCard posr" ref='mapCard'>
		<div class="mapCard__close" @click='close'></div>
		
		<div class="mapCard__orderbg">
			<div class='mapCard__order'>事件编号：{{ ORDER_ID.trim() || '--' }}</div>
		</div>

		<div class="mapCard__header">
			<div class="header__time">{{ TIME.trim() || '--' }}</div>
			<div class="header__region">{{ COMMUNITY_NAME.trim() || '--' }}</div>
		</div>

		<div class="mapCard__titlebg"></div>
		<div class="mapCard__title" :title='TITLE'>{{ TITLE.trim() || '--' }}</div>

		<div class="mapCard__contentbg"></div>
		<div class="mapCard__content" v-html="CONTENT.trim().replace(/\\n/g, '<br>') || '--'"></div>
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
		// 订单号
		ORDER_ID: {type: String, default: '--'},
		// 标题
		TITLE: {type: String, default: '--'},
		// 内容
		CONTENT: {type: String, default: '--'},
		// 时间
		TIME: {type: String, default: '--'},
		// 社区
		COMMUNITY_NAME: {type: String, default: '--'},
	},
	methods: {
		close (v) {
			this.$emit('close')
		}
	},
}
</script>

<style lang='scss' scoped>
.mapCard {
	color: #fff;
	font-size: 1em;
	padding: 50px 50px 50px 50px;
	@include bg(rem(450), rem(505), './assets/背景.png');
	position: relative;

	.mapCard__orderbg {
		font-size: 18px;		
		padding: 10px 0px;
		position: relative;
		overflow: hidden;
		white-space: nowrap;
		line-height: 1.5;

		.mapCard__order {
			padding: 0 10px;
			width: auto;
			height: 30px;
			background: transparent url('./assets/标题.png') center / 100% 30px no-repeat; 
			display: inline-block;
			padding-right: 30px;
		}

		&::after {
			content: '';
			position: relative;
			left: -10px;
			bottom: -8px;
			display: inline-block;
			width: rem(206);
			height: rem(10);
			background: transparent url('./assets/右侧装饰.png') left center / 100% 100% no-repeat;
		}
	}

	.mapCard__close {
		width: 36px;
		height: 33px;
		position: absolute; top: 0; right: 0; top: 20px; right: 30px;
		cursor: pointer;
		z-index: 1993100337;
		cursor: pointer;

	}

	.mapCard__header {
		@include flex(b, c);
		color: #00ffef;
		font-size: 14px;

		.header__time {
		}

		.header__region {
		}
	}

	.mapCard__titlebg {
		margin-top: 10px;
		@include bg(rem(90), rem(28), './assets/标题2.png');
	}

	.mapCard__contentbg {
		margin-top: 15px;
		@include bg(rem(90), rem(28), './assets/标题3.png');
	}

	.mapCard__title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		background-color: rgba(8, 77, 82, .3);
		height: 40px;
		padding: 10px 12px;
		position: relative;
		top: -5px;
		line-height: 1.5;
	}

	.mapCard__content {
		@include scrollbar;
		position: relative;
		overflow-y: scroll;
		height: 190px;
		padding: 5px 12px;
		top: -5px;
		line-height: 32px;
		background-color: rgba(8, 77, 82, .3);
		white-space: break-spaces;
	}
}
</style>
