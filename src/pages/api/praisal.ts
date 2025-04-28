import { getPraisal } from "@/eve-praisal";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "@/utils/logger";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    logger.info({ 
      event: 'praisal_request_start'
    });

    try {
      const praisalRequest: { quantity: number; type_id: number }[] = JSON.parse(
        req.body
      );

      logger.info({ 
        event: 'praisal_request_parsed',
        items: praisalRequest.length
      });

      const praisal = await getPraisal(praisalRequest);

      logger.info({ 
        event: 'praisal_request_success',
        items: praisalRequest.length
      });

      return res.json(praisal);
    } catch (e) {
      logger.error({ 
        event: 'praisal_request_failed',
        error: e,
        body: req.body
      });
      return res.status(500).json({ error: 'Failed to get praisal' });
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
