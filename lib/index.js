var AWS = require('aws-sdk');

var accessID = process.env.AWS_ID;
var secretKey = process.env.AWS_KEY;

var sqs = new AWS.SQS({
  accessKeyId: accessID,
  secretAccessKey: secretKey,
  region: 'us-east-1'
});

var url;

sqs.createQueue({
  QueueName: 'foo'
}, function (err, data) {
  url = data.QueueUrl;
  console.log(err);
  console.log(data);
  sqs.receiveMessage({QueueUrl: url}, function (err, data) {
    console.log(err);
    console.log(data);
  });

  sqs.sendMessage({QueueUrl: url, MessageBody: 'msgBody'}, function (err, data) {
    console.log(err);
    console.log(data);
  });
});
