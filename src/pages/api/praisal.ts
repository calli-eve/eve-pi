import { getPraisal } from "@/eve-praisal";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "@/utils/logger";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    logger.info({ 
      event: 'praisal_request_start'
    });

    try {
      const parsed = JSON.parse(req.body);

      if (!Array.isArray(parsed)) {
        return res.status(400).json({ error: 'Invalid input' });
      }

      const praisalRequest: { quantity: number; type_id: number }[] = parsed.filter(
        (item): item is { quantity: number; type_id: number } =>
          item !== null &&
          typeof item === 'object' &&
          typeof item.quantity === 'number' &&
          Number.isFinite(item.quantity) &&
          item.quantity >= 0 &&
          typeof item.type_id === 'number' &&
          Number.isInteger(item.type_id) &&
          item.type_id > 0
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
