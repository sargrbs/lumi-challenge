import { AxiosHttpClient } from '../../../infra/http/axios-http-client'
import { settings } from '../../config/settings'

export const makeAxiosHttpClient = () => {
  return new AxiosHttpClient(settings.API_URL)
}
