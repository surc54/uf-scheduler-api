import json

def hello(event, context):
  body = {
    "message": "Go Serverless v1.0! Your function executed successfully!",
    "event": event
  }

  response = {
    "statusCode": 200,
    "headers": {
        "Content-Type": "application/json"
    },
    "body": json.dumps(body)
  }

  return response
