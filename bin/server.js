const app = require('../app');

const __SERVER_PORT = process.env.PORT | 3001;

app.listen(__SERVER_PORT, () => console.log(`listening on port ${__SERVER_PORT}`));