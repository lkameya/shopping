const { forwardTo } = require('prisma-binding');
const { hasPermission, getUserId, isLoggedIn } = require('../utils');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  async me(parent, args, ctx, info) {
    const userId = isLoggedIn(ctx);
    if (!userId) return null;
    const user = ctx.db.query.user(
      {
        where: { id: userId },
      },
      info
    );
    return user;
  },
  async users(parent, args, ctx, info) {
    const userId = getUserId(ctx);

    const user = await ctx.db.query.user(
      { where: { id: userId } },
      '{ id, permissions, email, name }'
    );
    hasPermission(user, ['USER']);
    return ctx.db.query.users({}, info);
  },

  async order(parent, args, ctx, info) {
    const userId = getUserId(ctx);
    const order = await ctx.db.query.order(
      {
        where: { id: args.id },
      },
      info
    );
    // 3. Check if the have the permissions to see this order
    const ownsOrder = order.user.id === userId;
    const user = await ctx.db.query.user(
      { where: { id: userId } },
      '{ id, permissions, email, name }'
    );
    const hasPermissionToSeeOrder = user.permissions.includes('ADMIN');
    if (!ownsOrder && !hasPermissionToSeeOrder) {
      throw new Error('You cant see this buddd');
    }
    // 4. Return the order
    return order;
  },
  async orders(parent, args, ctx, info) {
    const userId = getUserId(ctx);
    return ctx.db.query.orders(
      {
        where: {
          user: { id: userId },
        },
      },
      info
    );
  },
};

module.exports = Query;
