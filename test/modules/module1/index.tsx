import { Module, customModule, Container } from '@ijstech/components';
import { ScomThread } from '@scom/scom-thread';

@customModule
export default class Module1 extends Module {
  private threadEl: ScomThread;
  private _data: any;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this._data = {
      posts: [{
        id: 'post_3',
        publishDate: '10/02/2023 09:15:00',
        author: {
          id: 'author_3',
          username: 'PinballReed',
          description: 'Reed-Pinball is fun',
          avatar: 'https://placehold.co/50',
          pubKey: '',
        },
        stat: {
          reply: 17,
          repost: 54,
          upvote: 886,
          downvote: 0,
          view: 11000,
        },
        data: [
          {
            module: '@scom/scom-image',
            data: {
              properties: {
                url: 'https://media2.giphy.com/media/1yMOp5EBtjDlkp5uJ9/source.gif',
              },
              tag: {
                width: '200px',
                pt: 0,
                pb: 0,
                pl: 0,
                pr: 0,
              },
            },
          },
        ],
        replyTo: {
          id: 'post_4',
          replyToId: 'post_3',
          publishDate: '10/02/2023 09:15:00',
          author: {
            id: 'author_4',
            username: 'Just_lookin_23',
            description: 'Just Lookin’',
            avatar: 'https://placehold.co/50',
            pubKey: '',
          },
          stat: {
            reply: 17,
            repost: 54,
            upvote: 886,
            downvote: 0,
            view: 11000,
          },
          data: [
            {
              module: '@scom/scom-markdown-editor',
              data: {
                properties: {
                  content: 'Exactly. All it shows is that someone had $8 to give X!',
                },
                tag: {
                  width: '100%',
                  pt: 0,
                  pb: 0,
                  pl: 0,
                  pr: 0,
                },
              },
            },
          ],
        }
      }]
    };
  }

  init() {
    super.init();
  }

  render() {
    return (
      <i-vstack margin={{ left: 'auto', right: 'auto' }} maxWidth={960}>
        <i-scom-thread id="threadEl" data={this._data} />
      </i-vstack>
    );
  }
}
