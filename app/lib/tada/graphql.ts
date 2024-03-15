import { initGraphQLTada } from 'gql.tada'
import type { introspection } from '../../../graphql-env'

export const graphql = initGraphQLTada<{
  introspection: typeof introspection
  scalars: {
    Money: number
  }
}>()
export type { FragmentOf, ResultOf, VariablesOf } from 'gql.tada'
export { readFragment } from 'gql.tada'
