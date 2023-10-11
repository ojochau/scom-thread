import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const customStyles = Styles.style({
  $nest: {
    '#pnlMore:hover > .more-block': {
      background: Theme.action.hover
    }
  }
})

