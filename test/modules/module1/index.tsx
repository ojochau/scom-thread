import { Module, customModule, Container } from '@ijstech/components';
import ScomThread from '@scom/scom-thread';

@customModule
export default class Module1 extends Module {
    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    init() {
        super.init();
    }

    render() {
        return <i-vstack margin={{left: 'auto', right: 'auto'}} maxWidth={960}>
            <i-scom-thread
                cid='bafybeibilgbhh65vc2ak3qrhvb2653td6agfzto3253xaqhe76ukfnwyr4'
            />
        </i-vstack>
    }
}