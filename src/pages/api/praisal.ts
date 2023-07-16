import { getPraisal } from "@/eve-praisal";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const praisalRequest: { quantity: number; type_id: number }[] = JSON.parse(
      req.body
    );
    try {
      const praisal = await getPraisal(praisalRequest);
      return res.json(praisal);
    } catch (e) {
      console.log(e);
      res.status(404).end();
    }
  } else {
    res.status(404).end();
  }
};

export default handler;
