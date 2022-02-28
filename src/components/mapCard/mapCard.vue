<template>
	<div class='mapCard __overlay__'>
		<div class='mapCard__header'>
			<div class='header__title'>{{ name }}</div>
			<div class='header__tag' :class='{ tag1: no === 1 }'>第<span>{{ no }}</span>名</div>
		</div>
	
		<div class='mapCard__middle'>
			<div class='middle__left'>
				<div class='left__num'><span>{{ NUM_NEW }}</span>件</div>
				<div class='left__text'>新增</div>
			</div>
	
			<div class='middle__right'>
				<div class='right__ringRatio'>环比 <span>{{ getSymbol(NUM_QOQ) }}{{ floor(NUM_QOQ * 100) }}%</span></div>
				<div class='right__yearOnYear'>同比 <span>{{ getSymbol(NUM_YOY) }}{{ floor(NUM_YOY * 100) }}%</span></div>
			</div>
		</div>
	
		<div class='mapCard__count'>
			<div class='count__todo'>在办数 <span><b>{{ NUM_DOING }}</b> 件</span></div>
			<div class='count__beOverdue'>逾期率 <span><b>{{ getSymbol(NUM_OVER_PERC) }}{{ floor(NUM_OVER_PERC * 100) }}</b>%</span></div>
			<div class='count__finish'>办结率 <span><b>{{ getSymbol(NUM_DONE_PERC) }}{{ floor(NUM_DONE_PERC * 100) }}</b>%</span></div>
		</div>
	</div>
</template>

<script>
import { getSymbol, floor } from '@/utils/utils'

export default {
	name: 'mapCard',
	data() {
		return {
		}
	},
	methods: {
        getSymbol, floor
    },
	props: {
		// 标题
		name: {type: String, default: '百花洞村'},
		// 排名
		no: { type: Number, default: 1 },

		// 新增
		NUM_NEW: { type: Number, default: 30 },
		// 环比
		NUM_QOQ: { type: Number, default: 0 },
		// 环比
		NUM_YOY: { type: Number, default: 0 },

		// 在办
		NUM_DOING: { type: Number, default: 10 },
		// 逾期
		NUM_OVER_PERC: { type: Number, default: 2 },
		// 完结
		NUM_DONE_PERC: { type: Number, default: 95 },
	},
	beforeMount() {},
}
</script>

<style lang="scss" scoped>
.mapCard {
	position: absolute;
	padding: rem(12) rem(15) rem(15) rem(13);
    @include bg(rem(190), rem(195), './assets/弹窗背景.png');

	.mapCard__header {
        display: flex;
        justify-content: flex-start;
        align-items: center;

		.header__title {
            font-size: rem(18);
            color: #fff;
            font-weight: bold;
		}

		.header__tag {
            font-size: rem(12);
            text-align: center;
            margin-left: rem(5);
			color: #0fffab;
			line-height: rem(18);
			@include bg(rem(55), rem(18), './assets/tag2.png');

            span {
                font-size: rem(15);
                font-weight: bold;
            }
            
            &.tag1 {
                @include bg(rem(46), rem(18), './assets/tag.png');
                color: #000;
            }
		}
	}

	.mapCard__middle {
        @include bg(rem(164), rem(54), './assets/背景小背景.png');
        display: flex;
        justify-content: space-between;
        align-items: center;
		margin: rem(10) auto;
		text-align: center;
		

		.middle__left {
			width: rem(85);
			height: rem(56);
			@include flex(c, c, c);

			.left__num {
                font-size: rem(12);
                color: #f2fe58;

                span {
                    font-size: rem(20);
                    font-weight: bold;
                }
			}

			.left__text {
                font-size: rem(14);
                color: #ffffff;
                font-weight: bold;
			}
		}

		.middle__right {
			@include flex(c, s, c);
			width: rem(85);
			height: rem(56);
			padding-left: rem(10);

            font-size: rem(12);
            color: #ffffff;
			white-space: nowrap;

			.right__ringRatio {
                span {
                    color: #f2fe58;
                }
			}

			.right__yearOnYear {
                span {
                    color: #f2fe58;
                }
			}
		}
	}

	.mapCard__count {
        font-size: rem(14);
        color: #ffffff;
        line-height: 1.40;

        b {
            font-size: rem(18);
            font-weight: bold;
        }
        
		.count__todo {
            span {
                color: #00ffef;
            }
		}

		.count__beOverdue {
            span {
                color: #ffd040;
            }
		}

		.count__finish {
            span {
                color: #00f777;
            }
		}
	}    
}
</style>