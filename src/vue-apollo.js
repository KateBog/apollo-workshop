import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

// Install the vue plugin
Vue.use(VueApollo)
const cache = new InMemoryCache({
  dataIdFromObject: object => object.id,
// fragmentMatcher?: FragmentMatcherInterface;
// addTypename?: boolean;
// cacheRedirects?: CacheResolverMap;
// resultCaching?: boolean;
// freezeResults?: boolean;
})

// Name of the localStorage item
export const AUTH_TOKEN = 'apollo-token'

// Http endpoint
const httpEndpoint = 'http://localhost:3000/'

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  cache,
  httpEndpoint,
  tokenName: AUTH_TOKEN,
}

// Call this in the Vue app file
export function createProvider (options = {}) {
  // Create apollo client
  const { apolloClient } = createApolloClient({
    ...defaultOptions,
    ...options,
  })
  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler (error) {
      // eslint-disable-next-line no-console
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    },
  })

  return apolloProvider
}
