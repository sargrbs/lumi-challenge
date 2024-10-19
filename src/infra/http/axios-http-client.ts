import axios from 'axios'
import {
  HttpRequest,
  HttpResponse,
} from '../../data/protocols/http/http-client'

export class AxiosHttpClient {
  private api: any

  constructor(private readonly baseUrl: string | undefined) {
    this.api = axios.create()

    this.api.interceptors.response.use(this.handleSuccess, this.handleError)
  }

  async request({
    headers,
    method,
    url,
    body,
    params,
  }: HttpRequest): Promise<HttpResponse> {
    try {
      const axiosResponse = await this.api.request({
        url: this.baseUrl + url,
        method,
        data: body,
        headers:
          body instanceof FormData
            ? headers
            : { ...headers, 'Content-Type': 'application/json' },
        params,
      })

      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      }
    } catch (error: any) {
      return {
        statusCode: error.response?.status || 500,
        body: error.response?.data,
      }
    }
  }

  handleSuccess = (response: any) => {
    return response
  }

  handleError = (error: { response: { status: any; request: any } }) => {
    const { status } = error.response

    switch (status) {
      case 403:
        this.redirectTo(document, '/403')
        break
      case 404:
        this.redirectTo(document, '/404')
        break
    }
    return Promise.reject(error)
  }

  redirectTo = (document: { location: any }, path: any) => {
    document.location = path
  }
}
