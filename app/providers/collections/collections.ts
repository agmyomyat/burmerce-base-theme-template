import { graphql } from '~/lib/tada/graphql'
import { sdk } from '../../graphqlWrapper'
import { CollectionListOptions } from '~/generated/graphql'

export function getCollections(
  request: Request,
  options?: CollectionListOptions,
) {
  return sdk
    .collections({ options }, { request })
    .then((result) => result.collections?.items)
}

graphql(`
  query collections($options: CollectionListOptions) {
    collections(options: $options) {
      items {
        id
        name
        slug
        parent {
          name
        }
        featuredAsset {
          id
          preview
        }
      }
    }
  }
`)

graphql(`
  query collection($slug: String, $id: ID) {
    collection(slug: $slug, id: $id) {
      id
      name
      slug
      breadcrumbs {
        id
        name
        slug
      }
      children {
        id
        name
        slug
        featuredAsset {
          id
          preview
        }
      }
    }
  }
`)
