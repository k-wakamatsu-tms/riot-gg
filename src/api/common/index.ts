import ky from 'ky'

export const baseApi = ky.create({
  prefixUrl: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
})
