import { AccessToken } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto-js";
import logger from "@/utils/logger";

const EVE_SSO_REVOKE_URL = "https://login.eveonline.com/v2/oauth/revoke";
const EVE_SSO_CLIENT_ID = process.env.EVE_SSO_CLIENT_ID ?? "";
const EVE_SSO_SECRET = process.env.EVE_SSO_SECRET ?? "";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const accessToken: AccessToken = req.body;
    logger.info({ 
      event: 'token_revoke_start',
      character: {
        name: accessToken.character.name,
        characterId: accessToken.character.characterId
      }
    });

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
      "User-Agent": "https://github.com/calli-eve/eve-pi",
    };

    try {
      const response = await fetch(EVE_SSO_REVOKE_URL, {
        method: "POST",
        body: params,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      logger.info({ 
        event: 'token_revoke_success',
        character: {
          name: accessToken.character.name,
          characterId: accessToken.character.characterId
        }
      });

      return res.end();
    } catch (e) {
      logger.error({ 
        event: 'token_revoke_failed',
        error: e,
        character: {
          name: accessToken.character.name,
          characterId: accessToken.character.characterId
        }
      });
      return res.status(500).end();
    }
  } else {
    logger.warn({ 
      event: 'invalid_method',
      method: req.method,
      path: req.url
    });
    res.status(404).end();
  }
};

export default handler;
