import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'method not supported' });
  }

  const cookie = new Cookies(req, res);
  cookie.set('access_token');
  cookie.set('refresh_token');

  return res.status(200).json({ message: 'logout successfully' });
}
