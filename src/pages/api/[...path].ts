import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  // convert cookies to header Authorization
  const cookies = new Cookies(req, res);
  const accessToken = cookies.get('access_token');
  if (accessToken) {
    req.headers.authorization = `Bearer ${accessToken}`;
  }

  // don't send cookies to API server
  req.headers.cookie = '';
  proxy.web(req, res, {
    target: process.env.API_URL,
    changeOrigin: true,
    selfHandleResponse: false,
  });
}
