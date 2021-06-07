import { CartResponseBuilder } from '../builders/CartResponseBuilder';
import { ArticleReq } from '../dtos/requests/ArticleReq';
import { CartReq } from '../dtos/requests/CartReq';
import { DeliveryFeeReq } from '../dtos/requests/DeliveryFeeReq';
import { DiscountReq } from '../dtos/requests/DiscountReq';
import { CartRes } from '../dtos/responses/CartRes';

export class CartService {

    constructor (
        private articles: {[id: number]: ArticleReq},
        private deliveryFees: DeliveryFeeReq[],
        private discounts: {[article_id: number]: DiscountReq},
    ) {}

    public processAll(carts: CartReq[]): CartRes[] {
        return carts.map(cart => this.process(cart));
    }

    private process(cart: CartReq): CartRes {
        return new CartResponseBuilder(
            cart,
            this.articles,
            this.deliveryFees,
            this.discounts
        ).calculateTotal().build();
    }
}
