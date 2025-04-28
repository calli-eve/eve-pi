import { AccessToken } from "@/types";
import { extractCharacterFromToken } from "@/utils/utils";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto-js";
import logger from "@/utils/logger";

const EVE_SSO_TOKEN_URL = "https://login.eveonline.com/v2/oauth/token";
const EVE_SSO_CLIENT_ID = process.env.EVE_SSO_CLIENT_ID ?? "";
const EVE_SSO_SECRET = process.env.EVE_SSO_SECRET ?? "";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const accessToken: AccessToken = req.body;
    logger.info({ 
      event: 'token_refresh_start',
      character: {
        name: accessToken.character.name,
        characterId: accessToken.character.characterId
      }
    });

    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: crypto.AES.decrypt(
        accessToken.refresh_token,
        EVE_SSO_SECRET,
      ).toString(crypto.enc.Utf8),
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
      }).then((res) => res.json());

      const character = extractCharacterFromToken(response);
      if (!character) {
        logger.error({ 
          event: 'token_refresh_failed',
          reason: 'character_extraction_failed',
          character: {
            name: accessToken.character.name,
            characterId: accessToken.character.characterId
          }
        });
        return res.json({ ...accessToken, needsLogin: true });
      }

      const token: AccessToken = {
        access_token: response.access_token,
        token_type: response.token_type,
        refresh_token: crypto.AES.encrypt(
          response.refresh_token,
          EVE_SSO_SECRET,
        ).toString(),
        expires_at: Date.now() + response.expires_in * 1000,
        character,
        needsLogin: false,
        account: accessToken.account,
        comment: accessToken.comment,
        system: accessToken.system,
        planets: [],
        planetConfig: accessToken.planetConfig ?? [],
      };

      logger.info({ 
        event: 'token_refresh_success',
        character: {
          name: character.name,
          characterId: character.characterId
        }
      });

      return res.json(token);
    } catch (e) {
      logger.error({ 
        event: 'token_refresh_failed',
        reason: 'api_error',
        error: e,
        character: {
          name: accessToken.character.name,
          characterId: accessToken.character.characterId
        }
      });
      return res.json({ ...accessToken, needsLogin: true });
    }
  } else {
    res.status(404).end();
  }
};

export default handler;
