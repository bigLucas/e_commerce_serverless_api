import * as request from 'supertest';
import { setup, teardown } from 'jest-dev-server';
import { checkServer } from './utils';

const TIMEOUT = 20000;
jest.setTimeout(TIMEOUT);

describe('E2E tests for POST /carts/process route: ', () => {
    const REQUEST_BODY_POST_CARTS_PROCESS = {
        "articles": [
            {
                "id": 1,
                "name": "water",
                "price": 100
            },
            {
                "id": 2,
                "name": "honey",
                "price": 200
            },
            {
                "id": 3,
                "name": "mango",
                "price": 400
            },
            {
                "id": 4,
                "name": "tea",
                "price": 1000
            }
        ],
        "carts": [
            {
                "id": 1,
                "items": [
                    {
                        "article_id": 1,
                        "quantity": 6
                    },
                    {
                        "article_id": 2,
                        "quantity": 2
                    },
                    {
                        "article_id": 4,
                        "quantity": 1
                    }
                ]
            },
            {
                "id": 2,
                "items": [
                    {
                        "article_id": 2,
                        "quantity": 1
                    },
                    {
                        "article_id": 3,
                        "quantity": 3
                    }
                ]
            },
            {
                "id": 3,
                "items": []
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
            carts: [
                {
                    "id": 1,
                    "total": 2000
                },
                {
                    "id": 2,
                    "total": 1800
                },
                {
                    "id": 3,
                    "total": 800
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
