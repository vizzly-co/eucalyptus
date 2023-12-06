import express, { Express } from "express";
import cookieParser from "cookie-parser";
import * as Settings from "./Settings";
import { createSigner } from "@vizzly/auth";

const app: Express = express();
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));

/*
  To use this development identity endpoint, the following public key must be added
  to your project on the Vizzly app, and to the Query Engine.

  HOWEVER in doing so, you are opening up access to that project, so it must not be the same project
  used for anything other than a test project...

-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEVyKF4GBkz101/6Ta3fDgvvRItU7j
tScr9CSIWn5Ov0Zya/CzF4XjfOSMKfaodpFtjYZ0MC4BjmVuYlrixXSrQg==
-----END PUBLIC KEY-----
*/

const ALLOWED_PROJECTS: string[] = ["prj_1"];

app.post("/identity", async (req, res) => {
  const privateKey = Settings.getVizzlyPrivateKey();
  const ttlInMinutes = 10;
  const signer = createSigner({ privateKey, ttlInMinutes });

  try {
    if (!ALLOWED_PROJECTS.includes(req.body["projectId"]))
      throw `Please set ${req.body["projectId"]} as an allowed projectId in the GitHub Repo; vizzly-co/eucalyptus`;

    const accessTokens = await signer.generateTokens({ ...req.body });

    return res
      .setHeader("Access-Control-Allow-Headers", "*")
      .setHeader("Access-Control-Allow-Origin", "*")
      .send({ accessTokens });
  } catch (e) {
    return res
      .setHeader("Access-Control-Allow-Headers", "*")
      .setHeader("Access-Control-Allow-Origin", "*")
      .status(500)
      .send({ error: JSON.stringify(e) });
  }
});

app.listen(9012, () => {
  console.log("Listening on :9012");
});

module.exports = { app };
