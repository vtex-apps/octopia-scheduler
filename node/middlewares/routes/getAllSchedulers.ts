import { ServiceError } from '../../helpers/serviceError'

export async function getAllSchedulers(ctx: Context) {
  const {
    clients: { scheduler },
  } = ctx

  try {
    const schedulers = await scheduler.getAll()

    ctx.body = schedulers
  } catch (error) {
    throw new ServiceError({
      message: 'Error getting schedulers',
      reason: error.response?.statusText,
      status: error.response?.status,
    })
  }
}
