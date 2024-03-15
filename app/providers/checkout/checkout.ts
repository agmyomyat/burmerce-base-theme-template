import { graphql } from '~/lib/tada/graphql'
import { QueryOptions, sdk } from '../../graphqlWrapper'
import { PaymentInput } from '~/generated/graphql'
import { orderDetailFragment } from '../orders/orders'

export function getAvailableCountries(options: QueryOptions) {
  return sdk.availableCountries({}, options)
}

export function getEligibleShippingMethods(options: QueryOptions) {
  return sdk.eligibleShippingMethods({}, options)
}

export function getEligiblePaymentMethods(options: QueryOptions) {
  return sdk.eligiblePaymentMethods({}, options)
}

export function getNextOrderStates(options: QueryOptions) {
  return sdk.nextOrderStates({}, options)
}

export function addPaymentToOrder(input: PaymentInput, options: QueryOptions) {
  return sdk.addPaymentToOrder({ input }, options)
}

export function transitionOrderToState(state: string, options: QueryOptions) {
  return sdk.transitionOrderToState({ state }, options)
}

graphql(`
  query eligibleShippingMethods {
    eligibleShippingMethods {
      id
      name
      description
      metadata
      price
      priceWithTax
    }
  }
`)

graphql(`
  query eligiblePaymentMethods {
    eligiblePaymentMethods {
      id
      code
      name
      description
      eligibilityMessage
      isEligible
    }
  }
`)

graphql(`
  query nextOrderStates {
    nextOrderStates
  }
`)

graphql(`
  query availableCountries {
    availableCountries {
      id
      name
      code
    }
  }
`)

graphql(
  `
    mutation addPaymentToOrder($input: PaymentInput!) {
      addPaymentToOrder(input: $input) {
        ...OrderDetail
        ... on ErrorResult {
          errorCode
          message
        }
      }
    }
  `,
  [orderDetailFragment],
)

graphql(
  `
    mutation transitionOrderToState($state: String!) {
      transitionOrderToState(state: $state) {
        ...OrderDetail
        ... on ErrorResult {
          errorCode
          message
        }
      }
    }
  `,
  [orderDetailFragment],
)
