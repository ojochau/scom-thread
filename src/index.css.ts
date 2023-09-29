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

export const labelStyle = Styles.style({
  textOverflow: 'ellipsis',
  overflow: 'hidden'
})

export const multiLineTextStyle = Styles.style({
  display: '-webkit-box',
  '-webkit-line-clamp': 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
})

export const customStyles = Styles.style({
  $nest: {
    '.hovered-icon': {
      transition: 'background 0.3s ease-in'
    },
    '.hovered-icon:hover': {
      background: Theme.action.hover
    },
    '.avatar img': {
      objectFit: 'cover'
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

