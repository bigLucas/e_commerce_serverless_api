import { Context, Callback } from 'aws-lambda';

export abstract class ServerlessHandler<T, T1> {
    public execute(event: T, context: Context, callback: Callback): void {
        this.onHandleEvent(event, context)
            .then((response) => this.onReplyResponse(response, callback))
            .catch((error) => this.onReplyError(error, callback));
    }

    protected onReplyResponse(response: T1, callback: Callback): void {
        callback(undefined, response as any);
    }

    protected onReplyError(error: Error, callback: Callback): void {
        callback(error, undefined);
    }

    public abstract onHandleEvent(event: T, context: Context): Promise<T1>;
}
