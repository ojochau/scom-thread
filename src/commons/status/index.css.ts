import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const customStyles = Styles.style({
  cursor: 'pointer',
  $nest: {
    '.post-body:hover':{
      background: Theme.action.hover
    }
  }
})
