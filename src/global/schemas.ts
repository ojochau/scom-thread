const theme = {
  type: 'object',
  properties: {
    backgroundColor: {
      type: 'string',
      format: 'color'
    },
    fontColor: {
      type: 'string',
      format: 'color'
    },
    inputBackgroundColor: {
      type: 'string',
      format: 'color'
    },
    inputFontColor: {
      type: 'string',
      format: 'color'
    },
    primaryColor: {
      type: 'string',
      format: 'color'
    },
    primaryBackground: {
      type: 'string',
      format: 'color'
    },
    successColor: {
      type: 'string',
      format: 'color'
    },
    successBackground: {
      type: 'string',
      format: 'color'
    },
    errorColor: {
      type: 'string',
      format: 'color'
    },
    errorBackground: {
      type: 'string',
      format: 'color'
    },
    subcribeButtonBackground: {
      type: 'string',
      format: 'color'
    },
    placeholderColor: {
      type: 'string',
      format: 'color'
    },
    hoverBackgroundColor: {
      type: 'string',
      format: 'color'
    },
    groupBorderColor: {
      type: 'string',
      format: 'color'
    },
    borderColor: {
      type: 'string',
      format: 'color'
    },
    secondaryColor: {
      type: 'string',
      format: 'color'
    },
  }
}

const themeUISchema = {
  type: 'Category',
  label: 'Theme',
  elements: [
    {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Group',
          label: 'Dark',
          elements: [
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/dark/properties/backgroundColor'
                },
                {
                  type: 'Control',
                  scope: '#/properties/dark/properties/fontColor'
                }
              ]
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/dark/properties/inputBackgroundColor'
                },
                {
                  type: 'Control',
                  scope: '#/properties/dark/properties/inputFontColor'
                }
              ]
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/dark/properties/primaryBackground'
                },
                {
                  type: 'Control',
                  scope: '#/properties/dark/properties/primaryColor'
                }
              ]
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/dark/properties/successBackground'
                },
                {
                  type: 'Control',
                  scope: '#/properties/dark/properties/successColor'
                }
              ]
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/dark/properties/errorBackground'
                },
                {
                  type: 'Control',
                  scope: '#/properties/dark/properties/errorColor'
                }
              ]
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/dark/properties/subcribeButtonBackground'
                },
                {
                  type: 'Control',
                  scope: '#/properties/dark/properties/placeholderColor'
                }
              ]
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/dark/properties/groupBorderColor'
                },
                {
                  type: 'Control',
                  scope: '#/properties/dark/properties/borderColor'
                }
              ]
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/dark/properties/secondaryColor'
                }
              ]
            },
          ]
        },
        {
          type: 'Group',
          label: 'Light',
          elements: [
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/light/properties/backgroundColor'
                },
                {
                  type: 'Control',
                  scope: '#/properties/light/properties/fontColor'
                }
              ]
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/light/properties/inputBackgroundColor'
                },
                {
                  type: 'Control',
                  scope: '#/properties/light/properties/inputFontColor'
                }
              ]
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/light/properties/primaryBackground'
                },
                {
                  type: 'Control',
                  scope: '#/properties/light/properties/primaryColor'
                }
              ]
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/light/properties/successBackground'
                },
                {
                  type: 'Control',
                  scope: '#/properties/light/properties/successColor'
                }
              ]
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/light/properties/errorBackground'
                },
                {
                  type: 'Control',
                  scope: '#/properties/light/properties/errorColor'
                }
              ]
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/light/properties/subcribeButtonBackground'
                },
                {
                  type: 'Control',
                  scope: '#/properties/light/properties/placeholderColor'
                }
              ]
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/light/properties/groupBorderColor'
                },
                {
                  type: 'Control',
                  scope: '#/properties/light/properties/borderColor'
                }
              ]
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/light/properties/secondaryColor'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

export function getBuilderSchema() {
  return {
    dataSchema: {
      type: 'object',
      required: ['cid'],
      properties: {
        cid: {
          type: 'string'
        },
        dark: theme,
        light: theme
      }
    },
    uiSchema: {
      type: 'Categorization',
      elements: [
        {
          type: 'Category',
          label: 'General',
          elements: [
            {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/cid'
                }
              ]
            }
          ]
        },
        themeUISchema
      ]
    }
  }
}

export function getEmbedderSchema() {
  return {
    dataSchema: {
      type: 'object',
      properties: {
        cid: {
          type: 'string',
          required: true
        },
        dark: theme,
        light: theme
      }
    },
    uiSchema: {
      type: 'Categorization',
      elements: [
        {
          type: 'Category',
          label: 'General',
          elements: [
            {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/cid'
                }
              ]
            }
          ]
        },
        themeUISchema
      ]
    }
  }
}