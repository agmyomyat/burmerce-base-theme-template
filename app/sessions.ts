import { SessionStorage } from '@remix-run/server-runtime/dist/sessions'
import { ErrorResult } from '~/generated/graphql'
// import { CreateCookieSessionStorageFunction } from '@remix-run/server-runtime'
import { createCookieSessionStorage } from '@remix-run/node'

// async function getCookieSessionStorageFactory(): Promise<CreateCookieSessionStorageFunction> {
//   if (IS_CF_PAGES) {
//     return createCookieSessionStorage
//   } else {
//     return safeRequireNodeDependency('@remix-run/node').then(
//       (module) => module.createCookieSessionStorage
//     )
//   }
// }
createCookieSessionStorage
let sessionStorage: SessionStorage<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { activeOrderError: ErrorResult } & Record<string, any>
>

export async function getSessionStorage() {
  if (sessionStorage) {
    return sessionStorage
  }

  sessionStorage = createCookieSessionStorage({
    cookie: {
      name: 'vendure_remix_session',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: ['awdbhbjahdbaw'],
    },
  })
  return sessionStorage
}
