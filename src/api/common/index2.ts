import ky from 'ky'
import Key from '../../../key.json'
// ここにAPI書いてね
const api_key: string = Key.api_key
export const baseApi_riot = ky
  .create({
    prefixUrl: 'https://jp1.api.riotgames.com/',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'http://127.0.0.1:5173',
    },
    mode: 'cors',
    // credentials: 'include',
  })
  .extend({
    hooks: {
      beforeRequest: [
        (req: Request) => {
          // TODO ここで認証トークンの設定とか
          req.headers.set('X-Riot-Token', api_key)
        },
      ],
    },
  })
