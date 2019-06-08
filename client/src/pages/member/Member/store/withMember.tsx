import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

export const MEMBER = gql`
  query user($profileURL: String!) {
    user(where: { profileURL: $profileURL }) {
      id
      fullName
      image
      email
      companyEmail
      phone
      role
      areas {
        id
        area {
          id
          url
          name
          image
        }
        role
        responsibilities
      }
      skills {
        id
        skill {
          id
          name
          icon
        }
        level
      }
      projects {
        id
        project {
          id
          url
          name
          image
        }
        role
        responsibilities
      }
      university {
        id
        name
        image
      }
      integrations {
        key
        data
      }
      universityDepartment
      fieldOfStudy
      year
      institution
      slackId
      __typename
    }
  }
`;

export interface IMember {
  id: string;
  fullName: string;
  image: string;
  email: string;
  companyEmail: string;
  phone: string;
  role: string;
  areas: {
    id: string;
    area: {
      id: string;
      url: string;
      name: string;
      image: string;
      __typename: 'Area';
    };
    role: string;
    responsibilities: string;
    __typename: 'AreaMember';
  }[];
  skills: {
    id: string;
    skill: {
      id: string;
      name: string;
      icon: string;
      __typename: 'Skill';
    };
    level: number;
    __typename: 'UserSkill';
  }[];
  projects: {
    id: string;
    project: {
      id: string;
      url: string;
      name: string;
      image: string;
      __typename: 'Project';
    };
    role: string;
    responsibilities: string;
    __typename: 'ProjectMember';
  }[];
  university: {
    id: string;
    name: string;
    image: string;
    __typename: 'University';
  };
  integrations: any[];
  universityDepartment: string;
  fieldOfStudy: string;
  year: number;
  institution: string;
  slackId: string;
  __typename: 'User';
}

interface IData {
  user: IMember[];
}

export interface IWithMember {
  member?: IMember;
  memberLoading: boolean;
}

interface IQueryVaraibles {
  profileURL: string;
}

export default (WrapperComponent: any) => (props: RouteComponentProps<{ profileURL: string }>) => (
  <Query<IData, IQueryVaraibles> query={MEMBER} variables={{ profileURL: props.match.params.profileURL }}>
    {({ data, loading }) => <WrapperComponent {...props} member={data.user} memberLoading={loading} />}
  </Query>
);
