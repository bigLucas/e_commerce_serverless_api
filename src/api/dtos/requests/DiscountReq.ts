import { DiscountType } from './enums/DiscountType';

export class DiscountReq {
    public article_id: number;
    public type: DiscountType;
    public value: number;
}
