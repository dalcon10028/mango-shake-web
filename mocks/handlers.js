import { http, HttpResponse } from 'msw'

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('http://43.200.241.207:8080/wallets', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json([
      {
        "id": 1,
        "apiProvider": "UPBIT",
        "status": "ACTIVE",
        "appKey": "wUPs********************************eDUU",
        "additionalInfo": {},
        "securities": {
          "BTC": {
            "id": 1,
            "walletId": 1,
            "symbol": "BTC",
            "currency": "KRW",
            "balance": 0.00320325,
            "locked": 0,
            "averageBuyPrice": 86090384.84039646,
            "lastSyncedAt": "2024-10-18T00:00:03.551963"
          },
          "KRW": {
            "id": 2,
            "walletId": 1,
            "symbol": "KRW",
            "currency": "KRW",
            "balance": 846.36709771,
            "locked": 0,
            "averageBuyPrice": 0,
            "lastSyncedAt": "2024-10-18T00:00:03.551963"
          },
          "SOL": {
            "id": 3,
            "walletId": 1,
            "symbol": "SOL",
            "currency": "KRW",
            "balance": 4.84724175,
            "locked": 0,
            "averageBuyPrice": 206200,
            "lastSyncedAt": "2024-10-18T00:00:03.551963"
          },
          "AVAX": {
            "id": 4,
            "walletId": 1,
            "symbol": "AVAX",
            "currency": "KRW",
            "balance": 1.19337288,
            "locked": 0,
            "averageBuyPrice": 36150,
            "lastSyncedAt": "2024-10-18T00:00:03.551963"
          }
        },
        "memo": "이연권",
        "beginningAssets": 0,
        "endingAssets": 0,
        "depositsDuringPeriod": 0,
        "withdrawalsDuringPeriod": 0,
        "createdAt": "2024-10-11T16:01:43.157574"
      }
    ])
  }),
]
