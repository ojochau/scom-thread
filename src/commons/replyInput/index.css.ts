import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const editorStyle = Styles.style({
  cursor: 'text',
  $nest: {
    '.toastui-editor-ww-container > .toastui-editor': {
      minHeight: '0px !important'
    },
    '.toastui-editor-toolbar': {
      display: 'none'
    },
    '.toastui-editor-contents': {
      fontSize: '1.25rem',
      color: `${Theme.text.secondary} !important`,
      padding: '0 0 12px !important'
    },
    '.toastui-editor-defaultUI': {
      border: 'none'
    },
    '.toastui-editor-ww-container': {
      background: 'transparent !important'
    }
  }
})
