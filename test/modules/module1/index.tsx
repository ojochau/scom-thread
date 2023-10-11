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
    }

    render() {
        return <i-vstack margin={{left: 'auto', right: 'auto'}} maxWidth={960}>
            <i-scom-thread
                id="threadEl"
                theme='dark'
                cid='1'
            />
        </i-vstack>
    }
}