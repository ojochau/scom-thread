export const getLocalWidget = (description: string) => {
  return {
    "sections": [
      {
        "id": "6876b0ab-a29c-4ed8-905e-51cd515fa26c",
        "row": 0,
        "elements": [
          {
            "id": "916919ec-42ca-4c01-9b1d-ac43ef3b1857",
            "column": 1,
            "columnSpan": 12,
            "properties": {
              "content": `<span class=\"p5\">${description}</span>`
            },
            "module": {
              "name": "Text box",
              "path": "scom-markdown-editor",
              "category": "widgets",
              "imgUrl": "https://ipfs.scom.dev/ipfs/bafybeicn7huboxcg5aiietevo2dwdmigsnpfokg7erxhaysbqdezz4p2qq/composables/textbox.png"
            },
            "tag": {
              "width": "100%",
              "height": 200,
              "pt": 0,
              "pb": 0,
              "pl": 0,
              "pr": 0
            }
          }
        ],
        "config": {
          "backgroundColor": "#fff",
          "margin": {
            "x": "auto",
            "y": "0"
          },
          "sectionWidth": 1000,
          "textColor": "#000000de",
          "customBackdrop": false,
          "backdropColor": "",
          "padding": {
            "bottom": 0,
            "left": 0,
            "right": 0,
            "top": 0
          },
          "fullWidth": false,
          "customBackgroundColor": false,
          "customTextColor": false,
          "customTextSize": false,
          "textSize": "md",
          "border": false,
          "borderColor": ""
        }
      }
    ],
    "footer": {
      "image": "",
      "elements": []
    },
    "config": {
      "sectionWidth": 1000,
      "margin": {
        "x": "auto",
        "y": "0"
      }
    }
  }
}
