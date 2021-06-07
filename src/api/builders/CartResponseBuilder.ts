import { ArticleReq } from '../dtos/requests/ArticleReq';
import { CartReq } from '../dtos/requests/CartReq';
import { DeliveryFeeReq } from '../dtos/requests/DeliveryFeeReq';
import { DiscountReq } from '../dtos/requests/DiscountReq';
import { DiscountType } from '../dtos/requests/enums/DiscountType';
import { ItemReq } from '../dtos/requests/ItemReq';
import { CartRes } from '../dtos/responses/CartRes';

export class CartResponseBuilder {
    private cartRes: CartRes;

    constructor(
        private cartReq: CartReq, 
        private articles: {[id: number]: ArticleReq},
        private deliveryFees: DeliveryFeeReq[],
        private discounts: {[article_id: number]: DiscountReq}
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
            // if the article has a kind of discount
            if (this.discounts[currentItem.article_id]) {
                previousValue += this.applyDiscount(currentItem);
                return previousValue;
            }
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

    private applyDiscount(item: ItemReq): number {
        const discount = this.discounts[item.article_id];
        let value = 0;
        if (discount.type.toLowerCase() === DiscountType.AMOUNT) { 
            // apply amount discount
            value = item.quantity * (this.articles[item.article_id].price - discount.value);
        } else {
            // apply percentage discount
            value = item.quantity * (this.articles[item.article_id].price * (1 - (discount.value / 100)));
        }
        return Number.parseInt('' + value);
    }
}
