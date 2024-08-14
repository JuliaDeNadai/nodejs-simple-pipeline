import 'dotenv/config'
import express, {Router} from "express";
import morgan from "morgan";
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.aws_access_key_id, 
  secretAccessKey: process.env.aws_secret_access_key
});
AWS.config.update({ region: process.env.region });

export const app = express()
const route = Router()
app.use(morgan('tiny'))

route.get('/healthcheck', (req, res) => {
  res.sendStatus(200)
})

route.post('/notify', (req, res) => {

  // Create publish parameters
  var params = {
    Message: "NOTIFICATION" /* required */,
    TopicArn: process.env.aws_topic_arn,
  };

  // Create promise and SNS service object
  var publishTextPromise = new AWS.SNS()
    .publish(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  publishTextPromise
    .then(function (data) {
      console.log(
        `Message ${params.Message} sent to the topic ${params.TopicArn}`
      );
      console.log("MessageID is " + data.MessageId);

      res.sendStatus(200)
    })
    .catch(function (err) {
      console.error(err, err.stack);

      res.sendStatus(500)
    });


  
})

app.use(express.json())
app.use(route)

const port = 3000

app.listen(port, () => { return `Listening on port... ${port}`})

