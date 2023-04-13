export async function deleteScheduler(ctx: Context) {
  const {
    clients: { scheduler },
    vtex: {
      route: {
        params: { id },
      },
    },
  } = ctx

  try {
    await scheduler.delete(id as string)

    ctx.status = 204
  } catch (error) {
    throw new Error('Error deleting scheduler')
  }
}
