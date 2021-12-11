/**
 * 404 not found middleware
 * @author Fate
 */
module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404) {
      ctx.status = 404;
      ctx.body = {
        code: 404,
        msg: '404 Not Found',
        data: {},
      };
    }
  };
};
