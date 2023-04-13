interface Scheduler {
  id: string
  request: {
    uri: string
    method: 'PUT'
    headers: Record<string, string>
    body: { text: string }
  }
  retry: {
    delay: {
      addMinutes: number
      addHours: number
      addDays: number
    }
    times: number
    backOffRate: number
  }
}

export interface SchedulerInformation extends Scheduler {
  workspace: string
  app: string
  attempt: number
  endDate: string
  expression: string
  NextExecution: string
}

export interface SchedulerConfiguration extends Scheduler {
  scheduler: {
    expression: string
    endDate: string
  }
}
