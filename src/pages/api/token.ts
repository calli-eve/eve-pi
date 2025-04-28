import { AccessToken } from "@/types";
import { extractCharacterFromToken } from "@/utils/utils";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto-js";
import logger from "@/utils/logger";

const EVE_SSO_TOKEN_URL = "https://login.eveonline.com/v2/oauth/token";
const EVE_SSO_CLIENT_ID = process.env.EVE_SSO_CLIENT_ID ?? "";
const EVE_SSO_SECRET = process.env.EVE_SSO_SECRET ?? "";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const code = req.query.code as string;
    if (!code || code === undefined) {
      logger.warn({ 
        event: 'token_request_failed',
        reason: 'missing_code',
        query: req.query
      });
      return res.status(404).end();
    }

    logger.info({ 
      event: 'token_request_start',
      code: code
    });

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
    }).toString();

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${EVE_SSO_CLIENT_ID}:${EVE_SSO_SECRET}`,
      ).toString("base64")}`,
      Host: "login.eveonline.com",
      "User-Agent": "https://github.com/calli-eve/eve-pi",
    };

    try {
      const response = await fetch(EVE_SSO_TOKEN_URL, {
        method: "POST",
        body: params,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const character = extractCharacterFromToken(data);

      if (!character) {
        logger.error({ 
          event: 'token_request_failed',
          reason: 'character_extraction_failed',
          data
        });
        return res.status(500).end();
      }

      logger.info({ 
        event: 'token_request_success',
        character: {
          name: character.name,
          characterId: character.characterId
        }
      });

      const token: AccessToken = {
        access_token: data.access_token,
        token_type: data.token_type,
        refresh_token: crypto.AES.encrypt(
          data.refresh_token,
          EVE_SSO_SECRET,
        ).toString(),
        expires_at: Date.now() + data.expires_in * 1000,
        character,
        needsLogin: false,
        account: "-",
        comment: "",
        system: "",
        planets: [],
        planetConfig: [],
      };
      return res.json(token);
    } catch (e) {
      logger.error({ 
        event: 'token_request_failed',
        reason: 'api_error',
        error: e,
        code: code
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
