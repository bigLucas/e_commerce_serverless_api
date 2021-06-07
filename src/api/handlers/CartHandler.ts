import { ProxyResult, Context, Callback, Handler, APIGatewayEvent } from 'aws-lambda';
import { CatchError } from '../decorators/CatchError';
import { ProcessingReq } from '../dtos/requests/ProcessingReq';
import { ProcessingRes } from '../dtos/responses/ProcessingRes';
import { CartService } from '../services/CartService';
import { ProxyResultBuilder } from '../builders/ProxyResultBuilder';
import { ServerlessHandler } from './ServerlessHandler';
import { arrayToMap } from '../utils/utils';

class CartHandler extends ServerlessHandler<APIGatewayEvent, ProxyResult> {

    @CatchError()
    public async onHandleEvent(event: APIGatewayEvent, __: Context): Promise<ProxyResult> {
        const requestBody = event.body ? JSON.parse(event.body) as ProcessingReq : undefined;
        if (!requestBody || !requestBody?.articles || !requestBody?.carts) {
            return new ProxyResultBuilder()
                .status(400)
                .body({message: 'Bad request'})
                .build();
        }
        const articlesMap = arrayToMap(requestBody.articles, 'id');
        const discountsMap = arrayToMap(requestBody.discounts, 'article_id');
        const cartService = new CartService(articlesMap, requestBody.delivery_fees, discountsMap);
        const cartResponses = cartService.processAll(requestBody.carts);
        return new ProxyResultBuilder()
            .status(200)
            .body(new ProcessingRes(cartResponses)) // response body
            .build();
    }

    public onReplyError(error: Error, callback: Callback): void {
        callback(error, new ProxyResultBuilder().status(500).body(error).build());
    }
}

export const handler: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const mHandler = new CartHandler();
    mHandler.execute(event, context, cb);
};
