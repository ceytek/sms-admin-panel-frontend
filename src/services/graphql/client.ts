import { createClient, cacheExchange, fetchExchange } from 'urql';

const GRAPHQL_ENDPOINT = 'http://localhost:4004/graphql'; // Replace with your actual GraphQL endpoint

export const client = createClient({
  url: GRAPHQL_ENDPOINT,
  exchanges: [cacheExchange, fetchExchange],
}); 