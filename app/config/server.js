const config = {
    production: {
      API_PORT: process.env.API_PORT,
      BASE_PATH: process.env.BASE_PATH,
      SERVER_URL: process.env.SERVER_URL,
      NODE_ENV: process.env.NODE_ENV,
      SECRET: process.env.SECRET
    },
    staging: {
      API_PORT: process.env.API_PORT,
      BASE_PATH: process.env.BASE_PATH,
      SERVER_URL: process.env.SERVER_URL,
      NODE_ENV: process.env.NODE_ENV,
      SECRET: process.env.SECRET
    },
    development: {
      API_PORT: process.env.API_PORT,
      BASE_PATH: process.env.BASE_PATH,
      SERVER_URL: process.env.SERVER_URL,
      NODE_ENV: process.env.NODE_ENV,
      SECRET: process.env.SECRET
    }
};
module.exports = config[process.env.NODE_ENV || 'development']