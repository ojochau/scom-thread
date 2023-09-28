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

export const cardStyle = Styles.style({
  cursor: 'pointer',
  $nest: {
    '&:hover': {
      boxShadow: `0 0 0 2px hsla(0, 0%, var(--card-color-l), var(--card-color-a))`,
    },
    '&:hover i-image.banner': {
      transform: 'translateY(-50%) scale(1.04)'
    },
    'i-link > a': {
      textDecoration: 'none'
    },
    '.--description': {
      whiteSpace: 'pre-line'
    },
    '.icon-button': {
      gap: 0
    },
  }
})

export const imageStyle = Styles.style({
  width: '100%',
  height: '0px',
  overflow: 'hidden',
  paddingTop: '50%',
  borderBottom: '1px solid hsla(0, 0%, var(--card-color-l), 0.03)',
  $nest: {
    'i-image': {
      position: 'absolute',
      display: 'block',
      top: '50%',
      width: '100%',
      height: 'auto',
      left: '0',
      transform: 'translateY(-50%)',
      transition: 'transform .4s ease',
      $nest: {
        '&>img': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center'
        }
      }
    }
  }
})

export const multiLineTextStyle = Styles.style({
  display: '-webkit-box',
  '-webkit-line-clamp': 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
})

export const overlayStyle = Styles.style({
  height: '5rem',
  width: '100%',
  position: 'absolute',
  bottom: 0,
  background: `linear-gradient(0, var(--card-bg-color) 0%, transparent 100%)`,
})

export const gridLayoutStyle = Styles.style({
  gridAutoRows: '440px',
  justifyContent: 'center'
})

export const customStyles = Styles.style({
  cursor: 'pointer',
  $nest: {
    '.hovered-icon': {
      borderRadius: '50%',
      padding: 5,
      transition: 'background 0.3s ease-in'
    },
    '.hovered-icon:hover': {
      background: Theme.action.hover
    },
    '#mdPost .post-body': {
      padding: '0 !important'
    }
  }
})

export const modalStyle = Styles.style({
  $nest: {
    '.modal': {
      padding: '0 1rem 1rem',
      borderRadius: '1rem',
    },
    '.modal .i-modal_header': {
      display: 'none'
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
