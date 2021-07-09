const { default: axios } = require("axios");

module.exports = (req, res, next) => {
  console.log(req.headers);
  try {
    const options = {
      method: 'GET',
      url: 'https://sandbox-api.1xcrypto.net/wallets',
      headers: {'Authorization' : 'bearer '+req.body.marchand.id1xc }
    }

    axios(options)
    .then(function (response) {
      console.log(response.data.data[1]);
      //next();
    })
    .catch(function (error) {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    });
  
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};