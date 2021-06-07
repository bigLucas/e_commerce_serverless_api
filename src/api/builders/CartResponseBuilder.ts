import { ArticleReq } from '../dtos/requests/ArticleReq';
import { CartReq } from '../dtos/requests/CartReq';
import { DeliveryFeeReq } from '../dtos/requests/DeliveryFeeReq';
import { CartRes } from '../dtos/responses/CartRes';

export class CartResponseBuilder {
    private cartRes: CartRes;

    constructor(
        private cartReq: CartReq, 
        private articles: {[id:number]: ArticleReq},
        private deliveryFees: DeliveryFeeReq[]
    ) {
        this.reset();
    }

    public build(): CartRes {
        this.cartRes.id = this.cartReq.id;
        const result = this.cartRes;
        this.reset();
        return result;
    }

    public calculateTotal(): CartResponseBuilder {
        this.cartRes.total = this.sumItemsPrice();
        this.cartRes.total += this.getShippingPrice();
        return this;
    }

    private reset(): void {
        this.cartRes = new CartRes();
    }

    private sumItemsPrice(): number {
        return this.cartReq.items.reduce((previousValue, currentItem) => {
            previousValue += currentItem.quantity * this.articles[currentItem.article_id].price;
            return previousValue;
        }, 0)
    }

    private getShippingPrice(): number {
        const deliveryFee = this.deliveryFees.find(fee => {
            return (fee.eligible_transaction_volume.min_price <= this.cartRes.total) && 
                (this.cartRes.total < this.getInfinityIfIsNull(fee.eligible_transaction_volume.max_price));
        });
        return deliveryFee?.price;
    }

    private getInfinityIfIsNull(value: number): number {
        return value === null ? Number.POSITIVE_INFINITY : value;
    }
}
