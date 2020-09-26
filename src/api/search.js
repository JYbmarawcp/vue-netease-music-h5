import { request } from '@/utils'

export const getSearchDefault = () => request.get('/search/default')

export const getSearchHot = () => request.get('/search/hot/detail')

export const getSearchSuggest = (keywords) => request.get('/search/suggest?type=mobile', { params: { keywords } })

export const getSearch = (params) => request.get(`/search`, { params })
