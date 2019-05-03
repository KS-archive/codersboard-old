import { gql } from 'apollo-boost';

export const SIGNIN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      fullName
      email
    }
  }
`;
