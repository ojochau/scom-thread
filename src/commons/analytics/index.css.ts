import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const analyticStyle = Styles.style({
  $nest: {
    'i-icon': {
      transition: 'background 0.3s ease-in'
    },
    'i-label': {
      transition: 'color 0.3s ease-in'
    },
    '.analytic:hover': {
      $nest: {
        '> i-icon': {
          background: Theme.colors.info.light,
          borderRadius: '50%'
        },
        '> i-icon svg': {
          fill: `${Theme.colors.info.main}!important`
        },
        '> i-label': {
          color: `${Theme.colors.info.main}!important`
        }
      }
    },
    '.green-icon:hover': {
      $nest: {
        '> i-icon': {
          background: Theme.colors.success.light,
          borderRadius: '50%'
        },
        '> i-icon svg': {
          fill: `${Theme.colors.success.main}!important`
        },
        '> i-label': {
          color: `${Theme.colors.success.main}!important`
        }
      }
    },
    '.red-icon:hover': {
      $nest: {
        '> i-icon': {
          background: Theme.colors.error.light,
          borderRadius: '50%',
        },
        '> i-icon svg': {
          fill: `${Theme.colors.error.main}!important`
        },
        '> i-label': {
          color: `${Theme.colors.error.main}!important`
        }
      }
    },
    '.share-modal': {
      $nest: {
        'i-button': {
          $nest: {
            '&:hover': {
              background: `${Theme.action.hover}`
            }
          }
        }
      }
    }
  }
})