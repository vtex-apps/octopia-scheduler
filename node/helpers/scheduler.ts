import type { SchedulerConfiguration } from '../typings/vtex.scheduler'

interface Args {
  type: 'offers' | 'orders'
  production: boolean
  account: string
  workspace: string
  expression?: string
}

/**
 * Function to create the scheduler configuration
 *
 *
 * @param args
 * @returns SchedulerConfiguration
 */
export function createSchedulerConfiguration(
  args: Args
): SchedulerConfiguration {
  const {
    type,
    production,
    account,
    workspace,
    expression = type === 'offers' ? '0 * 3 ? * 1/1 *' : '* * 0/1 ? * * *',
  } = args

  return {
    id: `${type.toUpperCase()}_SCHEDULER`,
    scheduler: {
      expression,
      endDate: createEndDate(production),
    },
    retry: {
      delay: {
        addMinutes: 2,
        addHours: 0,
        addDays: 0,
      },
      times: 2,
      backOffRate: 2,
    },
    request: {
      uri: `https://${workspace}--${account}.myvtex.com/_v/octopia-integration/${type}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        text: `${type} scheduler`,
      },
    },
  }
}

/**
 * Function to create the endDate for the scheduler
 *
 * If the environment is production, the endDate will be 10 years from now
 * If the environment is not production, the endDate will be 24 hours from now
 *
 * @param production boolena to check if the environment is production
 * @returns endDate in ISOString format
 */
function createEndDate(production: boolean) {
  const endDate = new Date()

  endDate.setHours(endDate.getHours() + 24)

  if (production) {
    endDate.setFullYear(endDate.getFullYear() + 10)
  }

  return endDate.toISOString()
}
