import ApolloClient from 'apollo-boost';

export default new ApolloClient({
  uri: process.env.REACT_APP_SERVER_ROOT_URL,
  credentials: 'include',
});
