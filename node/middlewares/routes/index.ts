import { method } from '@vtex/api'

import { errorHandler } from './errorHandler'
import { getAllSchedulers } from './getAllSchedulers'
import { getSchedulerById } from './getSchedulerById'
import { createOrUpdateScheduler } from './createOrUpdateScheduler'
import { deleteScheduler } from './deleteScheduler'

export const applicationRoutes = {
  getAllSchedulers: method({
    GET: [errorHandler, getAllSchedulers],
  }),
  getSchedulerById: method({
    GET: [errorHandler, getSchedulerById],
  }),
  createOrUpdateScheduler: method({
    PUT: [errorHandler, createOrUpdateScheduler],
  }),
  deleteScheduler: method({
    DELETE: [errorHandler, deleteScheduler],
  }),
}
