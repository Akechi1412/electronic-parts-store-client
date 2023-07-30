// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'method not supported' });
  }

  // don't send cookies to API server
  req.headers.cookie = '';

  let isHandled = false;

  const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
    if (isHandled) return;
    isHandled = true;

    if (proxyRes.statusCode != 200) {
      if (proxyRes.statusCode == 401) {
        return (res as NextApiResponse).status(401).json({ message: 'Login account is incorrect' });
      } else if (proxyRes.statusCode == 403) {
        return (res as NextApiResponse).status(403).json({ message: 'Access Denied' });
      } else if (proxyRes.statusCode == 500) {
        return (res as NextApiResponse).status(500).json({ message: 'Something was wrong' });
      }
    }

    let body = '';
    proxyRes.on('data', function (chunk) {
      body += chunk;
    });

    proxy.on('end', function () {
      try {
        const { accessToken, accessExpiredAt } = JSON.parse(body);

        // convert token to cookies
        const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' });
        cookies.set('access_token', accessToken, {
          httpOnly: true,
          sameSite: 'lax',
          expires: new Date(accessExpiredAt),
        });
        return (res as NextApiResponse).status(200).json({ message: 'Login successfully' });
      } catch (error) {
        console.log(error);
        return (res as NextApiResponse).status(500).json({ message: 'something went wrong' });
      }
    });
  };

  proxy.once('proxyRes', handleLoginResponse);

  proxy.web(req, res, {
    target: process.env.API_URL,
    changeOrigin: true,
    selfHandleResponse: true,
  });
}
