import { arrayToMap } from '../../../../src/api/utils/utils';
import { articlesReq } from '../utils.mocks';

describe('Utils unit tests', () => {
    describe('arrayToMap: ', () => {

        it('should transform an array of ArticleReq into an object (Map)', () => {
            // copy only 2 articles from utils
            const input = [{...articlesReq[0]}, {...articlesReq[1]}];

            const result = arrayToMap(input, 'id');
            expect(result).toBeDefined();
            expect(result).toBeInstanceOf(Object);
            expect(result).toEqual(expect.objectContaining({
                '1': {
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number),
                },
                '2': {
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number),
                }
            }));
        });

        it('should transform an array of ArticleReq into an object (Map) with only one article', () => {
            // copy equal articles
            const input = [{...articlesReq[0]}, {...articlesReq[0]}];

            const result = arrayToMap(input, 'id');
            expect(result).toBeDefined();
            expect(result).toBeInstanceOf(Object);
            expect(result).toEqual(expect.objectContaining({
                '1': {
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number),
                }
            }));
        });
    });
});
