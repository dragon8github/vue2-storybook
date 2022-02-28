import '../src/index.css'
import '../src/scss/utils.scss'

//👇 Configures Storybook to log the actions( onArchiveTask and onPinTask ) in the UI.
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
}
