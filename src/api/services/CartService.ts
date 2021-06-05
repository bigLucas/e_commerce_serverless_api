import { CartResponseBuilder } from '../builders/CartResponseBuilder';
import { ArticleReq } from '../dtos/requests/ArticleReq';
import { CartReq } from '../dtos/requests/CartReq';
import { CartRes } from '../dtos/responses/CartRes';

export class CartService {

    constructor (
        private articles: {[id:number]: ArticleReq}
    ) {}

    public processAll(carts: CartReq[]): CartRes[] {
        return carts.map(cart => this.process(cart));
    }

    private process(cart: CartReq): CartRes {
        return new CartResponseBuilder(cart, this.articles)
            .calculateTotal()
            .build();
    }
}
