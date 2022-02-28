<template>
	<div class="popregion __overlay__">
		<div class="popregion__content flex-cc flex-column">
			<div class="f12 is-green">
				第 <span class="f15">{{ no }}</span> 名
			</div>
			<div class="f16">{{ name }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'popregion',
	props: {
		// 标题
		name: { type: String, default: '白花洞村' },
		// 排名
		no: { type: Number, default: 1 },
	},
	beforeMount() {},
}
</script>

<style lang="scss" scoped>
.popregion {
	position: relative;
	width: rem(100);
	height: rem(55);
	padding: rem(8) 0 0 0;

	border-radius: rem(4);
	color: #fff;
	white-space: normal;
	line-height: 1.2;

	background: transparent url('./assets/镇街排名背景.png') center center / 100% 100% no-repeat;

	.is-green {
		color: #0fffab;
	}
}
</style>