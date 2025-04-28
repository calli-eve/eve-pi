import { NextApiRequest, NextApiResponse } from "next";
import logger from "@/utils/logger";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    logger.info({ 
      event: 'env_request_start'
    });

    try {
      const EVE_SSO_CALLBACK_URL = process.env.EVE_SSO_CALLBACK_URL;
      const EVE_SSO_CLIENT_ID = process.env.EVE_SSO_CLIENT_ID;

      if (!EVE_SSO_CALLBACK_URL || !EVE_SSO_CLIENT_ID) {
        logger.error({ 
          event: 'env_request_failed',
          reason: 'missing_env_vars',
          vars: {
            hasCallbackUrl: !!EVE_SSO_CALLBACK_URL,
            hasClientId: !!EVE_SSO_CLIENT_ID
          }
        });
        return res.status(500).json({ error: 'Missing required environment variables' });
      }

      logger.info({ 
        event: 'env_request_success',
        vars: {
          hasCallbackUrl: true,
          hasClientId: true
        }
      });

      return res.json({ EVE_SSO_CLIENT_ID, EVE_SSO_CALLBACK_URL });
    } catch (e) {
      logger.error({ 
        event: 'env_request_failed',
        reason: 'unexpected_error',
        error: e
      });
      return res.status(500).json({ error: 'Internal server error' });
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
