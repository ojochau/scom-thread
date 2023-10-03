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
          boxShadow: 'rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px',
          borderRadius: 12
        },
        '.modal': {
          padding: '0'
        },
        'i-button': {
          boxShadow: 'none',
          background: 'transparent',
          $nest: {
            '&:hover': {
              background: `${Theme.action.hover}`
            }
          }
        },
        '.cancel-btn': {
          display: 'none'
        }
      }
    },
    '@media screen and (max-width: 767px)': {
      $nest: {
        '.mobile-modal': {
          maxWidth: '100% !important',
          width: '100%',
          $nest: {
            '.modal': {
              maxWidth: '100% !important',
              width: '100%'
            },
            '.modal-wrapper': {
              width: '100% !important',
              maxHeight: '50vh',
              overflowY: 'auto',
              borderRadius: '16px 16px 0 0',
              position: 'fixed',
              left: '0 !important',
              bottom: '0 !important',
              top: 'auto !important'
            },
            '&.show .modal-overlay': {
              opacity: 1,
              transition: 'visibility 0s linear, opacity .25s',
              visibility: 'visible'
            },
            '.over': {
              opacity: 1,
              transition: 'visibility 0s linear, opacity .25s',
              visibility: 'visible'
            },
            '.cancel-btn': {
              display: 'flex'
            }
          }
        }
      }
    }
  }
})