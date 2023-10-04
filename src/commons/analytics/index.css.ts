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
          background: Theme.colors.primary.light,
          borderRadius: '50%'
        },
        '> i-icon svg': {
          fill: `${Theme.colors.primary.main}!important`
        },
        '> i-label': {
          color: `${Theme.colors.primary.main}!important`
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
    '.custom-modal': {
      $nest: {
        '.modal': {
          padding: '0',
          background: 'transparent'
        }
      }
    },
    '.share-modal': {
      $nest: {
        '.modal-wrapper': {
          boxShadow: 'rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px'
        },
        '.modal': {
          padding: '0'
        },
        'i-button': {
          boxShadow: 'none',
          background: 'transparent',
          gap: 12,
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