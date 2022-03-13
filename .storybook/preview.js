import '../src/index.css'
import '../src/scss/utils.scss'

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)


//👇 Configures Storybook to log the actions( onArchiveTask and onPinTask ) in the UI.
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
}
