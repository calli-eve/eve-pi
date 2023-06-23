import { AccessToken } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto-js";

const EVE_SSO_REVOKE_URL = "https://login.eveonline.com/v2/oauth/revoke";
const EVE_SSO_CLIENT_ID = process.env.EVE_SSO_CLIENT_ID ?? "";
const EVE_SSO_SECRET = process.env.EVE_SSO_SECRET ?? "";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const accessToken: AccessToken = req.body;
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: crypto.AES.decrypt(
        accessToken.refresh_token,
        EVE_SSO_SECRET
      ).toString(crypto.enc.Utf8),
    }).toString();

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${EVE_SSO_CLIENT_ID}:${EVE_SSO_SECRET}`
      ).toString("base64")}`,
      Host: "login.eveonline.com",
    };

    try {
      await fetch(EVE_SSO_REVOKE_URL, {
        method: "POST",
        body: params,
        headers,
      }).then((res) => res.json());

      console.log(
        "Revoke",
        accessToken.character.name,
        accessToken.character.characterId
      );

      return res.end();
    } catch (e) {
      console.log(e);
      return res.status(500).end();
    }
  } else {
    res.status(404).end();
  }
};

export default handler;
