import type { ParamsContext, RecorderState } from '@vtex/api'
import { Service } from '@vtex/api'

import type { Clients } from './clients'
import { clientsConfig } from './clients'
import { applicationRoutes } from './middlewares/routes'

export default new Service<Clients, RecorderState, ParamsContext>({
  clients: clientsConfig,
  routes: applicationRoutes,
})
