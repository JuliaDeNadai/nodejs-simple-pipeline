const serverless = require('serverless-http'); // Converte o app Express para Lambda handler
const { app } = require('./src/api'); // Importa a aplicação Express

// Converte a aplicação Express para funcionar no ambiente Lambda
const handler = serverless(app);

// Função exportada para a Lambda
exports.lambdaHandler = async (event, context) => {
  return handler(event, context);
};