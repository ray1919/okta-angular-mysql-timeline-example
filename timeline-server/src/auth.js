const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '0oa53ba7dJ76pOWwC4x6',
  issuer: 'https://dev-413897.okta.com/oauth2/default'
});

async function oktaAuth(req, res, next) {
  try {
    const token = req.token;
    if (!token) {
      return res.status(401).send('Not Authorized');
    }
    const jwt = await oktaJwtVerifier.verifyAccessToken(token, ['api://default']);
    req.user = {
      uid: jwt.claims.uid,
      email: jwt.claims.sub
    };
    next();
  }
  catch (err) {
    console.log('AUTH ERROR: ', err);
    return res.status(401).send(err.message);
  }
}

module.exports = oktaAuth;