import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

const spin = Styles.keyframes({
  "to": {
    "-webkit-transform": "rotate(360deg)"
  }
});

export const spinnerStyle = Styles.style({
  display: "inline-block",
  width: "2.5rem",
  height: "2.5rem",
  border: "3px solid transparent",
  borderRadius: "50%",
  borderTopColor: Theme.colors.primary.main,
  borderRightColor: Theme.colors.primary.main,
  "animation": `${spin} 0.46s linear infinite`,
  "-webkit-animation": `${spin} 0.46s linear infinite`
});

export const avatarStyle = Styles.style({
  background: Theme.background.gradient,
  borderRadius: '50%',
  overflow: 'hidden',
  flexShrink: 0,
  $nest: {
    'img': {
      objectFit: 'cover'
    }
  }
})

export const labelStyle = Styles.style({
  textOverflow: 'ellipsis',
  overflow: 'hidden'
})

export const customStyles = Styles.style({
  cursor: 'pointer',
  $nest: {
    '.more-icon': {
      borderRadius: '50%',
      padding: 5,
      transition: 'background 0.3s ease-in'
    },
    '.more-icon:hover': {
      background: Theme.action.hover
    },
    '.post-body:hover':{
      background: Theme.action.hover
    }
  }
})

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
      padding: '0 0.5rem'
    },
    '.toastui-editor-defaultUI': {
      border: 'none'
    },
    '.toastui-editor-ww-container': {
      background: 'transparent'
    }
  }
})
