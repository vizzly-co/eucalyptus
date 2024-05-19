import express, { Express } from "express";
import * as ConfigBuilder from "./ConfigBuilder";
import cookieParser from "cookie-parser";

const app: Express = express();
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));

app.all("/*", async (req, res) => {
  const authToken = (req.headers['authorization'] || '').replace('Bearer ', '');
  console.log('authToken is;', authToken);


  return res.status(403)
  .setHeader('Access-Control-Allow-Headers', '*')
  .setHeader('Access-Control-Allow-Origin', '*')
  .setHeader('Access-Control-Allow-Methods', '*')
  .send('something invalid');
  
  // return res.status(403)
  // .setHeader('Access-Control-Allow-Headers', '*')
  // .setHeader('Access-Control-Allow-Origin', '*')
  // .setHeader('Access-Control-Allow-Methods', '*')
  // .json({});

  // Pass the response from the query engine back to the user.
  // return res.status(200)
  //   .setHeader('Access-Control-Allow-Headers', '*')
  //   .setHeader('Access-Control-Allow-Origin', '*')
  //   .setHeader('Access-Control-Allow-Methods', '*')
  //   .json(ConfigBuilder.buildConfigForUser(authToken));
});

if (process.env["NODE_ENV"] != "test") {
  app.listen(9050, () => {
    console.log("Listening on 9050");
  });
}

module.exports = { app };
