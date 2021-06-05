import { CartRes } from './CartRes';

export class ProcessingRes {
    constructor (
        public carts: CartRes[]
    ) {}
}
