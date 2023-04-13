import { json } from 'co-body'

import { createSchedulerConfiguration } from '../../helpers/scheduler'
import { ServiceError } from '../../helpers/serviceError'

export async function createOrUpdateScheduler(ctx: Context) {
  const {
    clients: { scheduler },
    vtex: {
      production,
      workspace,
      account,
      route: {
        params: { type },
      },
    },
  } = ctx

  try {
    if (type !== 'offers' && type !== 'orders') {
      throw new Error('Invalid type')
    }

    const { expression } = await json(ctx.req)

    const schedulerConfiguration = createSchedulerConfiguration({
      type,
      production,
      account,
      workspace,
      expression,
    })

    const schedulerInformation = await scheduler.createOrUpdate(
      schedulerConfiguration
    )

    ctx.body = schedulerInformation
  } catch (error) {
    throw new ServiceError({
      message: 'Error creating or updating scheduler',
      reason: error.message,
    })
  }
}
