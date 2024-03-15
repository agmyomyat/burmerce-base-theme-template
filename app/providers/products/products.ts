import { SearchQueryVariables } from '~/generated/graphql'
import { QueryOptions, sdk } from '~/graphqlWrapper'
import { graphql } from '~/lib/tada/graphql'

export function search(variables: SearchQueryVariables, options: QueryOptions) {
  return sdk.search(variables, options)
}

export function searchFacetValues(
  variables: SearchQueryVariables,
  options: QueryOptions,
) {
  return sdk.searchFacetValues(variables, options)
}

export function getProductBySlug(slug: string, options: QueryOptions) {
  return sdk.product({ slug }, options)
}
export const detailedProductFragment = graphql(`
  fragment DetailedProduct on Product {
    id
    name
    description
    collections {
      id
      slug
      name
      breadcrumbs {
        id
        name
        slug
      }
    }
    facetValues {
      facet {
        id
        code
        name
      }
      id
      code
      name
    }
    featuredAsset {
      id
      preview
    }
    assets {
      id
      preview
    }
    variants {
      id
      name
      priceWithTax
      currencyCode
      sku
      stockLevel
      featuredAsset {
        id
        preview
      }
    }
  }
`)

graphql(
  `
    query product($slug: String, $id: ID) {
      product(slug: $slug, id: $id) {
        ...DetailedProduct
      }
    }
  `,
  [detailedProductFragment],
)

export const listedProductFragment = graphql(`
  fragment ListedProduct on SearchResult {
    productId
    productName
    slug
    productAsset {
      id
      preview
    }
    currencyCode
    priceWithTax {
      ... on PriceRange {
        min
        max
      }
      ... on SinglePrice {
        value
      }
    }
  }
`)

graphql(
  `
    query search($input: SearchInput!) {
      search(input: $input) {
        totalItems
        items {
          ...ListedProduct
        }
        facetValues {
          count
          facetValue {
            id
            name
            facet {
              id
              name
            }
          }
        }
      }
    }
  `,
  [listedProductFragment],
)

graphql(`
  query searchFacetValues($input: SearchInput!) {
    search(input: $input) {
      totalItems
      facetValues {
        count
        facetValue {
          id
          name
          facet {
            id
            name
          }
        }
      }
    }
  }
`)
