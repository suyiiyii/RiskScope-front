import axios from 'axios'
import { useStore } from '@/stores/store'
import { ElMessage } from 'element-plus/es'

function useRequest() {
  const store = useStore()
  const baseUrl = store.baseUrl

  const request = axios.create({
    baseURL: baseUrl,
    timeout: 1000
  })

  request.interceptors.request.use(
    (config) => {
      const token = 'Bearer ' + localStorage.getItem('token')
      if (localStorage.getItem('token')) {
        config.headers.Authorization = token
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  request.interceptors.response.use(
    (response) => {
      ElMessage.success(response.data.message)
      return response
    },
    (error) => {
      if (error.response.data) {
        ElMessage.error('请求失败：' + error.response.data)
      } else {
        ElMessage.error('网络错误')
      }
      return Promise.reject(error)
    }
  )

  return request
}

export default useRequest