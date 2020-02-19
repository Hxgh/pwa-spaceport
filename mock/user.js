import Mock from 'mockjs'

const count = 100
const TaskList = []
Mock.setup({ timeout: '1000-4000' })

for (let i = 0; i < count; i++) {
  TaskList.push(
    Mock.mock({
      id: '@increment',
      nodeName: '@first',
      taskName: '@first',
      functionName: '@first',
      manufacturer: '@first',
      creator: '@first',
      assigned: '@first',
      deviceName: '@first',
      paramsProfile: '@first',
      completionRate: '@first',
      startTime: '@datetime',
      stopTime: '@datetime',
      workTime: '@datetime',
      assignTime: '@datetime',
      'taskType|1': ['定时任务', '即时任务']
    })
  )
}

export default [
  {
    url: '/api/mock',
    type: 'get',
    response: config => {
      const { page = 1, limit = 10 } = config.query
      let mockList = TaskList

      const pageList = mockList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      )

      return {
        code: 200,
        success: true,
        data: {
          total: mockList.length,
          dataList: pageList
        }
      }
    }
  }
]
