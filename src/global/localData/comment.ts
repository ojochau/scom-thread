export const getLocalWidget = (description: string) => {
  return {
    "sections": [
      {
        "id": "6876b0ab-a29c-4ed8-905e-51cd515fa26c",
        "row": 0,
        "elements": [
          {
            "id": "c30c832b-8d9f-4ecc-963d-0a45085c3332",
            "column": 1,
            "columnSpan": 12,
            "properties": {
              "content": description
            },
            "module": {
              "name": "Text box",
              "path": "scom-markdown-editor",
              "category": "widgets",
              "imgUrl": "https://ipfs.scom.dev/ipfs/bafybeicn7huboxcg5aiietevo2dwdmigsnpfokg7erxhaysbqdezz4p2qq/composables/textbox.png"
            },
            "tag": {
              "width": "100%",
              "pt": '0px',
              "pb": '0px'
            }
          }
        ],
        config: {
          "backgroundColor": "",
          "padding": {
            "bottom": 0,
            "left": 0,
            "right": 0,
            "top": 0
          }
        }
      }
    ]
  }
}
