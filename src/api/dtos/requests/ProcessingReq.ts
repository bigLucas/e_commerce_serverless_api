import { ArticleReq } from './ArticleReq';
import { CartReq } from './CartReq';
import { DeliveryFeeReq } from './DeliveryFeeReq';
import { DiscountReq } from './DiscountReq';

export class ProcessingReq {
    public articles: ArticleReq[];
    public carts: CartReq[];
    public delivery_fees: DeliveryFeeReq[];
    public discounts: DiscountReq[];
}
