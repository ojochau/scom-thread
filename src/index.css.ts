import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const getHoverStyleClass = (color?: string) => {
  const styleObj = {
    $nest: {
      '&:hover': {
        color: `${Theme.text.primary} !important`,
        background: `${color || Theme.action.hoverBackground} !important`,
        $nest: {
          'i-label': {
            color: `${Theme.text.primary} !important`
          }
        }
      }
    }
  }
  return Styles.style(styleObj);
}