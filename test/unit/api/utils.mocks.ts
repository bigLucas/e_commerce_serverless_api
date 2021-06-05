import { ArticleReq } from "../../../src/api/dtos/requests/ArticleReq";
import { CartReq } from "../../../src/api/dtos/requests/CartReq";

export const articlesReq = [
    { id: 1, name: "water", price: 100 },
    { id: 2, name: "honey", price: 200 },
    { id: 3, name: "mango", price: 400 },
    { id: 4, name: "tea", price: 1000 },
] as ArticleReq[];

export const articlesMapMocked = {
    1: { id: 1, name: "water", price: 100 },
    2: { id: 2, name: "honey", price: 200 },
    3: { id: 3, name: "mango", price: 400 },
    4: { id: 4, name: "tea", price: 1000 },
};

export const cartsReq = [
    {
        id: 1,
        items: [
        { article_id: 1, quantity: 6 },
        { article_id: 2, quantity: 2 },
        { article_id: 4, quantity: 1 },
        ],
    },
    {
        id: 2,
        items: [
        { article_id: 2, quantity: 1 },
        { article_id: 3, quantity: 3 },
        ],
    },
    {
        id: 3,
        items: [],
    },
] as CartReq[];
