# Example SQS using Serverless

Serverless implementation of SQS, with a DLQ and processing NodeJS Function

## Deploy

`npm i` and all that.

Decide AWS account you are deploying and do the thing you do to access it. I suggest using [aws-vault](https://github.com/99designs/aws-vault)

- [set](./serverless.yml) the `service` and `QueueName` (default set to `exampleSQS`)
- `npm run deploy`
- Get the URL: `aws sqs get-queue-url --queue-name exampleSQSQueue --output text |head`
- Watch the logs: `aws logs tail /aws/lambda/exampleSQS-dev-processMessage --follow`
- In a separate terminal, call the SQS url with a message: `http -v https://sqs.eu-west-1.amazonaws.com/YOUR_AWS_ACCOUNT_ID/exampleQueue Action==SendMessage MessageBody=='{"id": 1, "message": "Hello, SQS!"}'` (this is using `httpie` CLI, [install it](https://httpie.io/) or covert the same call to `curl`)

Sample output:

```bash
1999-01-01T17:54:30.611000+00:00 1999/01/01/[$LATEST]kjasdf908asdfkajsdf-0uasdkfjasd START RequestId: 2795f527-1078-53e2-9763-ade41a71a60a Version: $LATEST
1999-01-01T17:54:30.615000+00:00 1999/01/01/[$LATEST]kjasdf908asdfkajsdf-0uasdkfjasd 1999-01-01T17:54:30.615Z	2795f527-1078-53e2-9763-ade41a71a60a	INFO	[DEBUG] received this message { id: 1, message: 'Hello, SQS!' }
1999-01-01T17:54:30.619000+00:00 1999/01/01/[$LATEST]kjasdf908asdfkajsdf-0uasdkfjasd END RequestId: 2795f527-1078-53e2-9763-ade41a71a60a
1999-01-01T17:54:30.619000+00:00 1999/01/01/[$LATEST]kjasdf908asdfkajsdf-0uasdkfjasd REPORT RequestId: 2795f527-1078-53e2-9763-ade41a71a60a	Duration: 5.07 ms	Billed Duration: 6 ms	Memory Size: 1024 MB	Max Memory Used: 67 MB

```

## Processing Message Payload

Structure the message as required. The processing logic goes in the `handler.js`

## Environment variables

Serverless uses [dotenv](https://www.npmjs.com/package/dotenv) to pull in [environment](https://www.serverless.com/framework/docs/environment-variables/) variables.

Create a `.env` with the following and anything else you need:

```dotini
MY_SUPER_SECRET=ssssshhhhhhh
```

## Permissions

We have set the permissions for `SQS:SendMessage` to public for this example. Don't do this in prod. Also, take down this service or lock down the permissions once you have done testing out sending messages from the command line.
