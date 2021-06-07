export class DeliveryFeeReq {
    public eligible_transaction_volume: {
        min_price: number,
        max_price: number,
    };
    public price: number;
}
