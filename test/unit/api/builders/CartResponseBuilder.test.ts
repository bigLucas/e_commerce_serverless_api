import { CartResponseBuilder } from '../../../../src/api/builders/CartResponseBuilder';
import { articlesMapMocked, cartsReq, deliveryFeesReq } from '../utils.mocks';

describe('CartResponseBuilder unit tests', () => {
    describe('build: ', () => {

        it('should build a cart response DTO without properties', () => {

            const builder = new CartResponseBuilder(
                {...cartsReq[0]},
                {...articlesMapMocked},
                [...deliveryFeesReq]
            );
            const result = builder.build();
            expect(result).toBeDefined();
            expect(result).toEqual(expect.objectContaining({}));
        });
    });

    describe('calculateTotal: ', () => {

        it('should return the builder', () => {

            const builder = new CartResponseBuilder(
                {...cartsReq[0]},
                {...articlesMapMocked},
                [...deliveryFeesReq]
            );
            const result = builder.calculateTotal();
            expect(result).toBeDefined();
            expect(result).toBeInstanceOf(CartResponseBuilder);
        });
    });
});
