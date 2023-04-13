export async function getSchedulerById(ctx: Context) {
  const {
    clients: { scheduler },
    vtex: {
      route: {
        params: { id },
      },
    },
  } = ctx

  try {
    const schedulerInformation = await scheduler.getById(id as string)

    ctx.body = schedulerInformation
  } catch (error) {
    throw new Error('Error getting scheduler')
  }
}
