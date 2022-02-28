<template>
	<div class="mapCard posr" ref="mapCard">
		<div class="mapCard__title">{{ NAME }}</div>

		<div class="mapCard__items">
			<div class="mapCard__item">
				<div class="mapCard__item--label">所属行业</div>
				<div class="mapCard__item--value">{{ TRADE }}</div>
			</div>
			<div class="mapCard__item">
				<div class="mapCard__item--label">所属社区</div>
				<div class="mapCard__item--value">{{ COMMUNITY }}</div>
			</div>
			<div class="mapCard__item">
				<div class="mapCard__item--label">注册资本</div>
				<div class="mapCard__item--value">{{ REGCAP }} 万</div>
			</div>
			<div class="mapCard__item">
				<div class="mapCard__item--label">注册时间</div>
				<div class="mapCard__item--value">{{ TIME }}</div>
			</div>
			<div class="mapCard__item">
				<div class="mapCard__item--label">注册人数</div>
				<div class="mapCard__item--value">{{ STAFF_NUM }} 人</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'mapCard',
	data() {
		return {}
	},
	props: ['NAME', 'TRADE', 'COMMUNITY', 'REGCAP', 'TIME', 'STAFF_NUM'],
	beforeMount() {},
}
</script>

<style lang='scss' scoped>
.mapCard {
	color: #fff;
	font-size: 1em;
	padding: rem(50) rem(50) rem(50) rem(50);
	@include bg(rem(450), rem(490), './assets/地图卡片.png');
	position: relative;

	.mapCard__title {
		@include xcenter;
		white-space: nowrap;
		font-size: rem(18);
		position: absolute;
		line-height: 2;
	}

	.mapCard__items {
		margin-top: rem(55);
	}

	.mapCard__item {
		@include flex(b, c);
		margin-top: rem(25);
		padding: rem(10) rem(20);
		font-family: 'NASA';
		background: transparent url('./assets/row.png') center center / 100% 100% no-repeat;
	}
}
</style>
