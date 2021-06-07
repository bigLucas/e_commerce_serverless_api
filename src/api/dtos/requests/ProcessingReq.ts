import { ArticleReq } from './ArticleReq';
import { CartReq } from './CartReq';
import { DeliveryFeeReq } from './DeliveryFeeReq';

export class ProcessingReq {
    public articles: ArticleReq[];
    public carts: CartReq[];
    public delivery_fees: DeliveryFeeReq[];
}
