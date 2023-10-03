import { Module, customModule, Container } from '@ijstech/components';
import ScomThread from '@scom/scom-thread';

@customModule
export default class Module1 extends Module {
    private threadEl: ScomThread;

    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    init() {
        super.init();
        this.threadEl.getConfigurators()[0].setTag(
            {
                light: {
                    fontColor: 'rgba(15,20,25,1.00)',
                    backgroundColor: '#fff',
                    inputFontColor: 'rgba(15,20,25,1.00)',
                    inputBackgroundColor: '#fff',
                    primaryColor: 'rgb(29, 155, 240)',
                    primaryBackground: 'rgba(29, 155, 240, 0.1)',
                    successColor: 'rgb(0, 186, 124)',
                    successBackground: 'rgba(0, 186, 124, 0.1)',
                    errorColor: 'rgb(249, 24, 128)',
                    errorBackground: 'rgba(249, 24, 128, 0.1)',
                    subcribeButtonBackground: 'rgb(15, 20, 25)',
                    placeholderColor: '#536471',
                    hoverBackgroundColor: 'rgba(0, 0, 0, 0.03)',
                    groupBorderColor: 'rgb(207, 217, 222)',
                    borderColor: 'rgb(239, 243, 244)',
                    secondaryColor: 'rgb(83, 100, 113)'
                },
                dark: {
                    borderColor: '#434242',
                    groupBorderColor: '#cac7c7'
                }
            }
        )
    }

    render() {
        return <i-vstack margin={{left: 'auto', right: 'auto'}} maxWidth={960}>
            <i-scom-thread
                id="threadEl"
                theme='light'
                cid='bafybeibilgbhh65vc2ak3qrhvb2653td6agfzto3253xaqhe76ukfnwyr4'
            />
        </i-vstack>
    }
}