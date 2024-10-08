import serverless from 'serverless-http'; // Converte o app Express para Lambda handler
import {app} from "./src/api.js" // Importa a aplicação Express

// Converte a aplicação Express para funcionar no ambiente Lambda
const handler = serverless(app);

// Função exportada para a Lambda
export const lambdaHandler = async (event, context) => {
  return handler(event, context);
};