import express, { Express } from "express";
import * as ConfigBuilder from "./ConfigBuilder";
import cookieParser from "cookie-parser";

const app: Express = express();
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));

app.all('/invalid-string-body', async (req, res) => {
  const statusCode = parseInt(req.query['statusCode'] as string || '200');

  return res.status(statusCode)
    .setHeader('Access-Control-Allow-Headers', '*')
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', '*')
    .send('something invalid');
});

app.all('/invalid-json-body', async (req, res) => {
  const statusCode = parseInt(req.query['statusCode'] as string || '200');

  return res.status(statusCode)
    .setHeader('Access-Control-Allow-Headers', '*')
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', '*')
    .json({something: 'else', foo: true});
});

app.all("/ok-config", async (req, res) => {
  const statusCode = parseInt(req.query['statusCode'] as string || '200');
  const authToken = (req.headers['authorization'] || '').replace('Bearer ', '');
  const includeCredentialsFor = req.query['credentials'] as string | undefined;

  // Pass the response from the query engine back to the user.
  return res.status(statusCode)
    .setHeader('Access-Control-Allow-Headers', '*')
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', '*')
    .json(ConfigBuilder.buildConfigForUser(authToken, includeCredentialsFor));
});

if (process.env["NODE_ENV"] != "test") {
  app.listen(9050, () => {
    console.log("Listening on 9050");
  });
}

module.exports = { app };
