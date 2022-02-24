import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from 'firebase/auth'
import { serialize } from 'cookie'

const session = (req: NextApiRequest, res: NextApiResponse) => {
  const { token, csrfToken } = req.body;

  console.log({ token, csrfToken, req_csrf: req.cookies.csrfToken })

  if (csrfToken !== req.cookies.csrfToken) {
    res.status(401).send('unauthorized request');
  }

  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  // @ts-ignore
  const cookie = getAuth().createSessionCookie(token, { expiresIn });

  // Set cookie policy for session cookie.
  const cookieOptions = { maxAge: expiresIn, httpOnly: true, secure: true }
  // sessionCookie.set('session', cookie, cookieOptions)
  res.setHeader('Set-Cookie', serialize('session', cookie, cookieOptions));
  return res.end(JSON.stringify({ status: 'success' }));

  // return res.status(401).send('unauthorized request');
}

export default session
