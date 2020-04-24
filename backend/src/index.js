require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');

const server = createServer();

// TODO: maybe create a middleware to populate user ?
// server.express.use(async (req, res, next) => {
//   const userId = getUserId(ctx);
//   if (!userId) return next();

//   const user = await db.query.user(
//     { where: { id: req.userId } },
//     '{ id, permissions, email, name }'
//   );

//   req.user = user;

//   next();
// });

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
