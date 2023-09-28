import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const analyticStyle = Styles.style({
  $nest: {
    'i-icon': {
      borderRadius: '50%',
      padding: 5,
      transition: 'background 0.3s ease-in'
    },
    'i-label': {
      transition: 'color 0.3s ease-in'
    },
    '.analytic:hover': {
      $nest: {
        'i-icon': {
          background: Theme.colors.primary.main
        },
        'i-label': {
          color: `${Theme.colors.primary.main}!important`
        }
      }
    },
    '.green-icon:hover': {
      $nest: {
        'i-icon': {
          background: Theme.colors.success.main
        },
        'i-label': {
          color: `${Theme.colors.success.main}!important`
        }
      }
    },
    '.red-icon:hover': {
      $nest: {
        'i-icon': {
          background: Theme.colors.error.main
        },
        'i-label': {
          color: `${Theme.colors.error.main}!important`
        }
      }
    }
  }
})