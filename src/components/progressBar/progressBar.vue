<template>
	<div class="layer_wrap" v-if="status == 'show'">
		<div class="container">
			<header>
				<h1 class="title" v-html='title'></h1>
				<p class="sTitle" v-html='sTitle'></p>
			</header>
			<section>
				<article>
					<input type="radio" name="switch-color" value='red' id="red" v-model='radio' />
					<input type="radio" name="switch-color" value='cyan' id="cyan"  v-model='radio' />
					<input type="radio" name="switch-color" value='lime' id="lime"  v-model='radio' />
					<div class="chart">
						<div class="bar white" :class='`bar-${myprogress}`'>
							<div class="face top">
								<div class="growing-bar"></div>
							</div>
							<div class="face side-0">
								<div class="growing-bar"></div>
							</div>
							<div class="face floor">
								<div class="growing-bar"></div>
							</div>
							<div class="face side-a"></div>
							<div class="face side-b"></div>
							<div class="face side-1">
								<div class="growing-bar"></div>
							</div>
						</div>
					</div>
				</article>
			</section>
		</div>
	</div>
</template>

<script>

export default {
	name: 'layer',
	data() {
		return {
			status: 'show',
			title: '正在初始化数据，请稍等...',
			sTitle: '（0%）',
			progress: 0,
			radio: 'cyan',
			radios: ['cyan', 'lime', 'red'],
		}
	},
	methods: {
		show(title, sTitle) {
			this.status = 'show'
			title && (this.title = title)
			sTitle && (this.sTitle = sTitle)

		},
		hide() {
			this.status = 'hide'
			this.progress = 0
		},
		setTitle(text) {
			this.title = text
		},
		setsTitle(text) {
			this.sTitle = text
		},
		setProgress(n) {
			this.progress = n
		}
	},
	computed: {
		myprogress() {
			if (this.progress >= 100) return 100
			
			// 如果传入非数字
			if (!isNaN(+this.progress) === false) return 0

			return this.progress
		}
	},
	watch: {
        progress: {
            deep: true,
            immediate: true,
            handler(newV, oldV) {
				if (newV < 65) this.radio = 'cyan'
                if (newV >= 65 && newV <= 88) this.radio = 'lime'
				if (newV > 88) this.radio = 'red'
            },
        },
    },
	beforeMount () {
		/* 
		let i = 0
		const len = this.radios.length 
		setInterval(() => {
			this.radio = this.radios[++i % len]
		}, 4500)
		 */
	},
}
</script>

<style lang="scss" scoped>
@import './progressBar.scss';

.layer_wrap {
	@include pfull();
	z-index: 1993100337;
}

.layer__mask {
	@include pfull();
	z-index: 1;
	// background: rgba(255, 255, 255, .25);
	background: #d0d0d0;
}

.title {
	white-space: nowrap;
	margin-bottom: 0.5em;
}

.sTitle {
}

input[type=radio] {
	visibility: hidden;
	width: 0; height: 0;
}

</style>
