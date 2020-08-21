import axios from 'axios'
import Vue from 'vue'
import Loading from "@/components/loading"
Vue.use(Loading)

const BASE_URL = 'https://api.mtnhao.com/'
// 不带全局loading的请求实例
export const requestWithoutLoading = createBaseInstance()

// 带全局loading的请求实例
export const request = createBaseInstance()
mixinLoading(request.interceptors)

// 通用的axios实例
function createBaseInstance() {
  const instance = axios.create({
    baseURL: BASE_URL
  })

  instance.interceptors.response.use(handleResponse, handleError)
  return instance
}

function handleResponse(response) {
  return response.data
}
function handleError(e) {
  throw e
}

// Loading
let loading
let loadingCount = 0
function mixinLoading(interceptors) {
  interceptors.request.use(loadingRequestInterceptor)
  interceptors.response.use(
    loadingResponseInterceptor,
    loadingResponseErrorInterceptor
  )

  function loadingRequestInterceptor(config) {
    if (!loading) {
      loading = Loading.service({
        target: 'body',
        background: 'transparent',
        text: '载入中',
      })
    }
    loadingCount++

    return config
  }

  function handleResponseLoading() {
    loadingCount--
    if (loadingCount === 0) {
      loading.close()
      loading = null
    }
  }

  function loadingResponseInterceptor(response) {
    handleResponseLoading()
    return response
  }

  function loadingResponseErrorInterceptor(e) {
    handleResponseLoading()
    throw e
  }
}
