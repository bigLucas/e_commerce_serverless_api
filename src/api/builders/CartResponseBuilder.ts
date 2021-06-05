import { ArticleReq } from '../dtos/requests/ArticleReq';
import { CartReq } from '../dtos/requests/CartReq';
import { CartRes } from '../dtos/responses/CartRes';

export class CartResponseBuilder {
    private cartRes: CartRes;
    private cartReq: CartReq;
    private articles: {[id:number]: ArticleReq};

    constructor(
        cartReq: CartReq, 
        articles: {[id:number]: ArticleReq}
    ) {
        this.cartReq = cartReq;
        this.articles = articles;
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
}
