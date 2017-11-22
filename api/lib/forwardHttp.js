const request = require('request')
const logger = require('./logger')

/** Creates a koa.js middleware that forward GET calls to a route **/
module.exports = function forwardHttpFactory({ baseUrl }) {

  return async function forwardHttp(ctx, next) {

    if (ctx.request.method !== 'GET') {
      await next();
      return;
    }

    // Bypass koa.js respond method and set ctx.res manually
    ctx.respond = false

    const options = {
      baseUrl,
      url: ctx.request.path, // TODO: or url?
      method: 'GET',
      qs: ctx.request.query,
    }

    logger.debug('[forwardHttp.js] request options', options)

    request(options)
    .on('error', (e) => {
      // if (['ENOTFOUND', 'ECONNREFUSED'].indexOf(err.code) !== -1) {
      //   self.res.statusCode = 404;
      //   self.res.end();
      // }

      logger.error('[Error - forwardHttp.js] error forwarding to render server', e.message, e.stack)
      throw e
    })
    .pipe(ctx.res)


    // let stream
    // try {
    //   stream = await axios({
    //     method: 'get',
    //     url,
    //     responseType:'stream'
    //   });
    // } catch (e) {
    //
    //   // Codes outside 2xx
    //   if (e.response) {
    //     ctx.response.status = e.response.status
    //     ctx.response.body = e.respose
    //     return
    //   }
    //
    //   logger.error('[Error - fordwardHttp.js] error streaming GET to render server', e.message, e.stack)
    //   ctx.response.status = 500
    //   ctx.response.body = 'INTERNAL_ERROR'
    //   return
    // }
    //
    // console.log('stream', stream)
    //
    // // TODO: type?
    // ctx.response.body = stream.data;
  }

}
