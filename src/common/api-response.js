export function apiResponse (status, body) {
  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}
