import * as request from 'supertest';
import { setup, teardown } from 'jest-dev-server';
import { checkServer } from './utils';

const TIMEOUT = 20000;
jest.setTimeout(TIMEOUT);

describe('E2E tests for POST /carts/process route: ', () => {
    const REQUEST_BODY_POST_CARTS_PROCESS = {
        "articles": [
            { "id": 1, "name": "water", "price": 100 },
            { "id": 2, "name": "honey", "price": 200 },
            { "id": 3, "name": "mango", "price": 400 },
            { "id": 4, "name": "tea", "price": 1000 },
            { "id": 5, "name": "ketchup", "price": 999 },
            { "id": 6, "name": "mayonnaise", "price": 999 },
            { "id": 7, "name": "fries", "price": 378 },
            { "id": 8, "name": "ham", "price": 147 }
        ],
        "carts": [
            {
                "id": 1,
                "items": [
                { "article_id": 1, "quantity": 6 },
                { "article_id": 2, "quantity": 2 },
                { "article_id": 4, "quantity": 1 }
                ]
            },
            {
                "id": 2,
                "items": [
                { "article_id": 2, "quantity": 1 },
                { "article_id": 3, "quantity": 3 }
                ]
            },
            {
                "id": 3,
                "items": [
                { "article_id": 5, "quantity": 1 },
                { "article_id": 6, "quantity": 1 }
                ]
            },
            {
                "id": 4,
                "items": [
                { "article_id": 7, "quantity": 1 }
                ]
            },
            {
                "id": 5,
                "items": [
                { "article_id": 8, "quantity": 3 }
                ]
            }
        ],
        "delivery_fees": [
            {
                "eligible_transaction_volume": {
                "min_price": 0,
                "max_price": 1000
                },
                "price": 800
            },
            {
                "eligible_transaction_volume": {
                "min_price": 1000,
                "max_price": 2000
                },
                "price": 400
            },
            {
                "eligible_transaction_volume": {
                "min_price": 2000,
                "max_price": null
                },
                "price": 0
            }
        ],
        "discounts": [
            { "article_id": 2, "type": "amount", "value": 25 },
            { "article_id": 5, "type": "percentage", "value": 30 },
            { "article_id": 6, "type": "percentage", "value": 30 },
            { "article_id": 7, "type": "percentage", "value": 25 },
            { "article_id": 8, "type": "percentage", "value": 10 }
        ]
      };

    beforeAll(async () => {
        try {
            await setup({
                command: 'npm run start-server --silent',
                launchTimeout: TIMEOUT,
            });
            // wait for the server to start
            await checkServer();
        } catch (error) {
            throw new Error('Error at start the server');
        }
    });

    afterAll(async () => {
        await teardown();
    });

    it('should return a list of carts with the right total property', async () => {
        const response = await request('http://localhost:3000')
            .post('/dev/carts/process')
            .set('Content-type', 'application/json')
            .send(REQUEST_BODY_POST_CARTS_PROCESS)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body).toEqual({
            "carts": [
                {
                    "id": 1,
                    "total": 2350
                },
                {
                    "id": 2,
                    "total": 1775
                },
                {
                    "id": 3,
                    "total": 1798
                },
                {
                    "id": 4,
                    "total": 1083
                },
                {
                    "id": 5,
                    "total": 1196
                }
            ]
        });
    });

    it('should return Bad Request for wrong input format', async () => {
        const response = await request('http://localhost:3000')
            .post('/dev/carts/process')
            .set('Content-type', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toBeDefined();
    });

    it('should return Bad Request for no body', async () => {
        const response = await request('http://localhost:3000')
            .post('/dev/carts/process')
            .set('Content-type', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toBeDefined();
    });
});
