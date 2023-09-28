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
    '.has-border:after': {
      content: "''",
      position: 'absolute',
      width: 2,
      height: 'calc(100% - 2.5rem)',
      display: 'block',
      backgroundColor: Theme.divider,
      opacity: 0.5,
      transform: 'translateX(-50%)',
      left: '18px',
      top: '2.5rem'
    },
    '#pnlMore:hover > .more-block': {
      background: Theme.action.hover
    }
  }
})

