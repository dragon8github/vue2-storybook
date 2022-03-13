<template>
	<div class="mapCard posr" ref="mapCard">
		<div class="title">{{ NAME }}</div>
		<div class="body">
			<div class="sTitle c-#fff f14 flex-bc">
				<div class="name">{{ NAME }}</div>
				<div class="count">{{ AREA }}m²</div>
			</div>
			<div class="content f14" v-html="ADDRESS"></div>
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
		NAME: { type: [String], default: '大岭山片区' },
		AREA: { type: [String, Number], default: 0 },
		ADDRESS: { type: [String], default: '东莞市大岭山森林公园' },
	},
	methods: {
		close(v) {
			window.$blurMarker()
		},
	},
}
</script>

<style lang='scss' scoped>
.mapCard {
	position: relative;
	padding: rem(30) rem(20) rem(20) rem(40);
	@include bg(rem(372), rem(273), './assets/公园弹窗.png');
	color: #fff;

	.title {
		position: absolute;
		top: 0;
		left: rem(70);
		line-height: rem(35);
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
		height: rem(120);
		@include scrollbar();
		overflow: auto;
		word-break: break-all;
	}
}
</style>
