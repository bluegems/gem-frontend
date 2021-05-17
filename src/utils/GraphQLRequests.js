import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $username: String!
    $firstName: String!
    $lastName: String
  ) {
    register(
      email: $email
      password: $password
      username: $username
      firstName: $firstName
      lastName: $lastName
    ) {
      username
      tag
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      username
      tag
      firstName
      lastName
      bio
      birthdate
      profilePicture
      friends {
        username
        tag
        firstName
        lastName
        profilePicture
      }
    }
  }
`;

export const GET_FRIENDS_POSTS = gql`
  query GetFriendsPosts {
    getFriendsPosts {
      id
      description
      image
      modifiedDatetime
      user {
        username
        tag
        firstName
        lastName
        profilePicture
      }
    }
  }
`;

export const GET_CURRENT_USER_AND_FRIENDS_POSTS = gql`
  query GetCurrentUserAndFriendsPosts {
    getCurrentUser {
      username
      tag
      firstName
      lastName
      bio
      birthdate
      profilePicture
      friends {
        username
        tag
        firstName
        lastName
        profilePicture
      }
    }
    getFriendsPosts {
      id
      description
      image
      modifiedDatetime
      user {
        username
        tag
        firstName
        lastName
        profilePicture
      }
    }
  }
`;

export const UPDATE_PROFILE_INFORMATION = gql`
  mutation UpdateProfileInformation(
    $username: String!
    $tag: String!
    $firstName: String!
    $lastName: String
    $bio: String
  ) {
    updateUser(
      username: $username
      tag: $tag
      firstName: $firstName
      lastName: $lastName
      bio: $bio
    ) {
      username
      tag
      firstName
      lastName
      bio
      birthdate
      profilePicture
    }
  }
`;

export const GET_USER_INFORMATION = gql`
  query GetUser($username: String!, $tag: String!) {
    getUser(username: $username, tag: $tag) {
      username
      tag
      firstName
      lastName
      bio
      profilePicture
      friendship {
        exists
        status
        modifiedBy {
          username
          tag
        }
      }
      friends {
        username
        tag
        firstName
        lastName
        profilePicture
      }
      posts {
        id
        description
        image
        modifiedDatetime
        user {
          username
          tag
          firstName
          lastName
          profilePicture
        }
      }
    }
  }
`;

export const REQUEST_FRIENDSHIP = gql`
  mutation RequestFriendship($username: String!, $tag: String!) {
    requestFriendship(username: $username, tag: $tag) {
      exists
      status
      modifiedBy {
        username
        tag
      }
    }
  }
`;

export const ACCEPT_FRIENDSHIP = gql`
  mutation AcceptFriendship($username: String!, $tag: String!) {
    acceptFriendship(username: $username, tag: $tag) {
      exists
      status
      modifiedBy {
        username
        tag
      }
    }
  }
`;

export const DECLINE_FRIENDSHIP = gql`
  mutation DeclineFriendship($username: String!, $tag: String!) {
    declineFriendship(username: $username, tag: $tag) {
      exists
      status
      modifiedBy {
        username
        tag
      }
    }
  }
`;

export const DELETE_REQUEST = gql`
  mutation DeleteRequest($username: String!, $tag: String!) {
    deleteRequest(username: $username, tag: $tag) {
      exists
      status
      modifiedBy {
        username
        tag
      }
    }
  }
`;

export const BLOCK_USER = gql`
  mutation BlockUser($username: String!, $tag: String!) {
    blockUser(username: $username, tag: $tag) {
      exists
      status
      modifiedBy {
        username
        tag
      }
    }
  }
`;

export const UNBLOCK_USER = gql`
  mutation UnblockUser($username: String!, $tag: String!) {
    unblockUser(username: $username, tag: $tag) {
      exists
      status
      modifiedBy {
        username
        tag
      }
    }
  }
`;

export const UNFRIEND_USER = gql`
  mutation UnfriendUser($username: String!, $tag: String!) {
    unfriendUser(username: $username, tag: $tag) {
      exists
      status
      modifiedBy {
        username
        tag
      }
    }
  }
`;
