export async function errorHandler(ctx: Context, next: () => Promise<void>) {
  try {
    await next()
  } catch (error) {
    const {
      vtex: { logger },
    } = ctx

    logger.error({
      message: error.message,
      reason: error.reason,
      exception: error,
    })

    ctx.status = error.status || error.response?.status || 500
    ctx.body = { error: error.message, reason: error.reason }
    ctx.app.emit('error', error, ctx)
  }
}
