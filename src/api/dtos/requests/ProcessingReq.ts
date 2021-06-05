import { ArticleReq } from './ArticleReq';
import { CartReq } from './CartReq';

export class ProcessingReq {
    public articles: ArticleReq[];
    public carts: CartReq[];
}
