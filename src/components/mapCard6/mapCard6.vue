<template>
	<div class="mapCard posr" ref="mapCard">
		<div class="title">{{ sTITLE }}</div>
		<div class="body">
			<div class='item flex'>
				<i class='icon is-region'></i>
				<div class='block'>
					<div class='stitle'>村(社区)</div>
					<div class='value text-green'>{{ sTITLE }}</div>
				</div>
			</div>
			<div class='item flex'>
				<i class='icon is-area'></i>
				<div class='block'>
					<div class='stitle'>面积</div>
					<div class='value text-green'>{{ sAREA }} <span>m²</span></div>
				</div>
			</div>
			<div class='item flex'>
				<i class='icon is-num'></i>
				<div class='block'>
					<div class='stitle'>人数</div>
					<div class='value text-green'>{{ sNUM }} <span>人</span></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'mapCard',
	data() {
		const sTITLE = this.TITLE
		const sAREA = this.AREA
		const sNUM = this.NUM

		return { sTITLE, sAREA, sNUM, }
	},
	props: {
		TITLE: { type: [String], default: '大岭山片区' },
		AREA: { type: [String, Number], default: '2354' },
		NUM: { type: [String, Number], default: '1234' },
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
	position: absolute;
	padding: rem(30) rem(20) rem(20) rem(40);
	@include bg(rem(372), rem(375), './assets/片区弹窗.png');
	z-index: 1993100337;
	color: #fff;

	.title {
		position: absolute; top: 0; left: rem(5);
		width: rem(167);
		line-height: rem(30);
		text-align: center;
		white-space: nowrap;
		font-size: rem(16);
	}

	.item {
		margin-top: rem(35);
	}

	.block {
		position: relative;
		text-align: center;
		width: rem(194);

		&::before {
			@include xcenter;
			content: '';
			bottom: 0;
			@include bg(rem(194), rem(19), './assets/底.png');
		}

		.stitle {
			font-size: rem(16);
		}

		.value {
			font-size: rem(26);

			span {
				font-size: rem(16);
			}
		}
	}

	.icon {
		@include bg(rem(80), rem(67), './assets/icon.png');

		&.is-region { @include bg(rem(80), rem(67), './assets/icon.png'); }
		&.is-area { @include bg(rem(80), rem(67), './assets/icon-1.png'); }
		&.is-num { @include bg(rem(80), rem(67), './assets/icon-2.png'); }
	}
}
</style>
