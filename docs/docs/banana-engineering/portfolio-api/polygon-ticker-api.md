---
sidebar_position: 2
---

# Polygon Ticker API

# Polygon API: Fetch Stock Tickers

This guide explains how to use the Polygon API to fetch stock tickers, including handling pagination and understanding the response.

---

## **API Details**

### **Base URL**
- **Domain**: `https://api.polygon.io/`

### **Endpoint**
- **URI**: `v3/reference/tickers`

### **Method**
- `GET`

### **Authentication**
- **API Key**: `cRYeCVwa6bbN6MYgRSz7UY8G9dTgsR7a`

### **Query Parameters**
- `type=CS`: Fetch common stock tickers.
- `market=stocks`: Specify the stock market.
- `limit=1000`: Limit the results to 1000 per page.

---

## **Making the API Request**

### **cURL Command**
```bash
curl -X GET "https://api.polygon.io/v3/reference/tickers?type=CS&market=stocks&limit=1000" \
  -H "Authorization: Bearer cRYeCVwa6bbN6MYgRSz7UY8G9dTgsR7a"
```

---

## **Sample Response**
```json
{
    "results": [
        {
            "ticker": "A",
            "name": "Agilent Technologies Inc.",
            "market": "stocks",
            "locale": "us",
            "primary_exchange": "XNYS",
            "type": "CS",
            "active": true,
            "currency_name": "usd",
            "cik": "0001090872",
            "composite_figi": "BBG000C2V3D6",
            "share_class_figi": "BBG001SCTQY4",
            "last_updated_utc": "2024-12-20T07:02:26.29602496Z"
        },
        {
            "ticker": "AA",
            "name": "Alcoa Corporation",
            "market": "stocks",
            "locale": "us",
            "primary_exchange": "XNYS",
            "type": "CS",
            "active": true,
            "currency_name": "usd",
            "cik": "0001675149",
            "composite_figi": "BBG00B3T3HD3",
            "share_class_figi": "BBG00B3T3HF1",
            "last_updated_utc": "2024-12-20T07:02:26.296025471Z"
        }
    ],
    "status": "OK",
    "request_id": "d51de3d6fd443883320d51ec1aaa1e0f",
    "count": 2,
    "next_url": "https://api.polygon.io/v3/reference/tickers?cursor=YWN0aXZlPXRydWUmYXA9MiZhcz0mZGF0ZT0wMDAxLTAxLTAxJmxpbWl0PTImbWFya2V0PXN0b2NrcyZvcmRlcj1hc2Mmc29ydD10aWNrZXImdHlwZT1DUw"
}
```

---

## **Understanding the Response**

### **Key Fields**
1. **`results`**:
   - An array of stock tickers and their metadata.
   - Example:
     ```json
     {
         "ticker": "A",
         "name": "Agilent Technologies Inc.",
         "market": "stocks",
         "locale": "us",
         "primary_exchange": "XNYS",
         "type": "CS",
         "active": true,
         "currency_name": "usd",
         "cik": "0001090872",
         "composite_figi": "BBG000C2V3D6",
         "share_class_figi": "BBG001SCTQY4",
         "last_updated_utc": "2024-12-20T07:02:26.29602496Z"
     }
     ```
   - **Explanation**:
     - `ticker`: Stock ticker symbol.
     - `name`: Full name of the company.
     - `market`: Type of market (e.g., stocks).
     - `locale`: Geographic location of the market (e.g., US).
     - `primary_exchange`: Primary exchange where the stock is listed (e.g., XNYS for NYSE).
     - `type`: Type of security (e.g., CS for Common Stock).
     - `active`: Indicates whether the ticker is actively traded.
     - `currency_name`: Trading currency (e.g., USD).
     - `cik`: SEC CIK code for the company.
     - `composite_figi` / `share_class_figi`: Financial Instrument Global Identifiers.
     - `last_updated_utc`: Last update timestamp in UTC.

2. **`status`**:
   - Status of the API request (e.g., "OK").

3. **`request_id`**:
   - Unique identifier for the API request.

4. **`count`**:
   - Number of tickers returned in the current response.

5. **`next_url`**:
   - URL for the next page of results. Use this for pagination.

---

## **Pagination**
If the response contains a `next_url` field, it indicates there are more results. To fetch the next set of data:

1. Use the `next_url` value in the subsequent API call.

### **Example Pagination cURL Command**
```bash
curl -X GET "https://api.polygon.io/v3/reference/tickers?cursor=YWN0aXZlPXRydWUmYXA9MiZhcz0mZGF0ZT0wMDAxLTAxLTAxJmxpbWl0PTImbWFya2V0PXN0b2NrcyZvcmRlcj1hc2Mmc29ydD10aWNrZXImdHlwZT1DUw" \
  -H "Authorization: Bearer cRYeCVwa6bbN6MYgRSz7UY8G9dTgsR7a"
```

---

## **Error Handling**
- Check the `status` field in the response to ensure the request was successful.
- Common HTTP error codes:
  - `400`: Bad request.
  - `401`: Unauthorized (check your API key).
  - `429`: Too many requests (rate limit exceeded).
  - `500`: Server error.

---

This guide provides all the details required to use the Polygon API for fetching stock tickers, handle pagination, and understand the response format.
