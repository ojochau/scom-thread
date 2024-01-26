import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

Styles.cssRule('#mdReplyPost', {
    $nest: {
        '.modal': {
            height: '100vh',
            top: 0,
            position: 'absolute',
            padding: 0,
            overflow: 'hidden'
        }
    }
})
