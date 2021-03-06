# Endpoints documentation:
- There is one available endpoint: `POST /dev/carts/process`.
#### **POST** `/dev/carts/process`
- **Note**: if you run `serverless offline --stage stage` with a stage different from `dev` you need to change the route path from `/dev/carts/process` to `/stage/carts/process`.
#### **Status code 200:**
- Request body:
```javascript
{
    "articles": [
        { "id": 1, "name": "coffee", "price": 25000 },
        { "id": 2, "name": "honey", "price": 5000 }
    ],
    "carts": [
        {
            "id": 1,
            "items": [
                { "article_id": 1, "quantity": 1 },
                { "article_id": 2, "quantity": 1 }
            ]
        },
		{
            "id": 2,
            "items": [
                { "article_id": 2, "quantity": 1 }
            ]
        }
	],
	"delivery_fees": [
		{
			"eligible_transaction_volume": {
				"min_price": 0,
				"max_price": 6000
			},
			"price": 1000
		},
		{
			"eligible_transaction_volume": {
				"min_price": 6000,
				"max_price": null
			},
			"price": 0
		}
	],
    "discounts": [
        {
            "article_id": 2,
            "type": "amount",
            "value": 1000
        }
    ]
}
```
- Response body:
```javascript
{
    "carts": [
        {
            "total": 29000, // sum the items price, apply discounts and apply shipping fee
            "id": 1
        },
        {
            "total": 5000,
            "id": 2
        }
    ]
}
```
#### **Status code 400:**
- Request body:
```javascript
// no body, or empty body:
{}
// or, wrong format (missing articles property):
{
    "carts": []
}
```
- Response body:
```javascript
{
    "message": "Bad request"
}
```

#### **Status code 500:**
- Requests with errors not mapped yet.
- Response body:
```javascript
{
    "message": "Internal Server Error"
}
```
