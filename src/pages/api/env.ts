import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const EVE_SSO_CALLBACK_URL = process.env.EVE_SSO_CALLBACK_URL;
    const EVE_SSO_CLIENT_ID = process.env.EVE_SSO_CLIENT_ID;
    res.json({ EVE_SSO_CLIENT_ID, EVE_SSO_CALLBACK_URL });
  } else {
    res.status(404).end();
  }
};

export default handler;
