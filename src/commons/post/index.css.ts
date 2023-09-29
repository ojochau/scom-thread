import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const customStyles = Styles.style({
  cursor: 'pointer',
  $nest: {
    '.has-border:after': {
      content: "''",
      position: 'absolute',
      width: 2,
      height: 'calc(100% - 2.5rem)',
      display: 'block',
      backgroundColor: Theme.action.hover,
      transform: 'translateX(-50%)',
      left: '18px',
      top: '2.5rem'
    },
    '#pnlMore:hover > .more-block': {
      background: Theme.action.hover
    }
  }
})

