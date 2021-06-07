import { CartResponseBuilder } from '../../../../src/api/builders/CartResponseBuilder';
import { CartService } from '../../../../src/api/services/CartService';
import { articlesMapMocked, cartsReq, deliveryFeesReq } from '../utils.mocks';

jest.mock('../../../../src/api/builders/CartResponseBuilder');

describe('CartService unit tests', () => {
    describe('processAll: ', () => {
        const mockedBuilderReturn = {
            id: 1,
            total: 1000,
        }

        afterEach(() => {
            jest.resetAllMocks();
        });

        it('should process the carts', () => {
            CartResponseBuilder.prototype.calculateTotal = jest.fn().mockReturnThis();
            CartResponseBuilder.prototype.build = jest.fn().mockImplementation(() => mockedBuilderReturn);

            const service = new CartService({...articlesMapMocked}, [...deliveryFeesReq]);
            const result = service.processAll([...cartsReq]);
            expect(result).toBeDefined();
            expect(result).toEqual(expect.arrayContaining([
                {
                    id: expect.any(Number),
                    total: expect.any(Number),
                }
            ]));
        });

        it('should don\'t call the builder for empty array as input', () => {
            const calculateTotalSpy = jest.spyOn(CartResponseBuilder.prototype, 'calculateTotal').mockReturnThis();
            const buildSpy = jest.spyOn(CartResponseBuilder.prototype, 'build').mockImplementation(() => mockedBuilderReturn);

            const service = new CartService({...articlesMapMocked}, [...deliveryFeesReq]);
            const result = service.processAll([]);
            expect(result).toBeDefined();
            expect(result).toEqual([]);
            expect(calculateTotalSpy).not.toBeCalled();
            expect(buildSpy).not.toBeCalled();
        });
    });
});
