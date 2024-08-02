import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

Styles.cssRule('#mdReplyPost', {
    $nest: {
        '> .modal-wrapper > .modal': {
            height: '100vh',
            top: 0,
            position: 'absolute',
            padding: 0,
            overflow: 'auto'
        }
    }
})

export const threadPanelStyle = Styles.style({
    $nest: {
        '.ancestors-panel i-scom-post > *:first-child': {
            border: 0
        },
        '&:not(.has-ancestor) .main-panel i-scom-post > *:first-child': {
            border: 0
        }
    }
});

export const getActionButtonStyle = (hoveredColor: string) => Styles.style({
  justifyContent: 'space-between',
  $nest: {
    '&:hover': {
      backgroundColor: hoveredColor || Theme.action.hoverBackground,
      opacity: 1
    }
  }
})