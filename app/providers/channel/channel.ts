import { graphql } from 'gql.tada'
import { QueryOptions, sdk } from '~/graphqlWrapper'

export function activeChannel(options: QueryOptions) {
  return sdk
    .activeChannel(undefined, options)
    .then(({ activeChannel }) => activeChannel)
}

graphql(`
  query activeChannel {
    activeChannel {
      id
      defaultCurrencyCode
    }
  }
`)
