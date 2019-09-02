import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: AuthToken;
  user: User;
};

export type AuthToken = {
  __typename?: 'AuthToken';
  expiresIn: Scalars['Int'];
  accessToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthPayload;
  signup: AuthPayload;
  verifyEmail: Scalars['Boolean'];
  resendVerifyEmail: Scalars['Boolean'];
  changePassword: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
  deleteUser: User;
  updateUser: User;
  inviteNewUser: User;
  completeInvitation: AuthPayload;
  createProject: ProjectType;
  deleteProject: ProjectType;
  updateProject: ProjectType;
  deleteTestSession: TestSessionType;
  updateTestSession: TestSessionType;
  deleteTest: TestType;
  deleteVariation: VariationType;
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationSignupArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type MutationChangePasswordArgs = {
  password: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationResetPasswordArgs = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};

export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type MutationInviteNewUserArgs = {
  email: Scalars['String'];
};

export type MutationCompleteInvitationArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type MutationCreateProjectArgs = {
  data: ProjectDataArgs;
};

export type MutationDeleteProjectArgs = {
  projectId: Scalars['String'];
};

export type MutationUpdateProjectArgs = {
  data: ProjectDataArgs;
  projectId: Scalars['String'];
};

export type MutationDeleteTestSessionArgs = {
  testSessionId: Scalars['String'];
};

export type MutationUpdateTestSessionArgs = {
  data: TestSessionDataArgs;
  testSessionId: Scalars['String'];
};

export type MutationDeleteTestArgs = {
  testId: Scalars['String'];
};

export type MutationDeleteVariationArgs = {
  variationId: Scalars['String'];
};

export type ProjectDataArgs = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type ProjectType = {
  __typename?: 'ProjectType';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  project: ProjectType;
  projects: Array<ProjectType>;
  projectsCount: Scalars['Int'];
  testSession: TestSessionType;
  testSessions: Array<TestSessionType>;
  testSessionsCount: Scalars['Int'];
  test: TestType;
  tests: Array<TestType>;
  testsCount: Scalars['Int'];
  variation: VariationType;
  variations: Array<VariationType>;
  variationsCount: Scalars['Int'];
};

export type QueryProjectArgs = {
  projectId: Scalars['String'];
};

export type QueryTestSessionArgs = {
  testSessionId: Scalars['String'];
};

export type QueryTestSessionsArgs = {
  where?: Maybe<TestSessionDataArgs>;
};

export type QueryTestSessionsCountArgs = {
  where?: Maybe<TestSessionDataArgs>;
};

export type QueryTestArgs = {
  testId: Scalars['String'];
};

export type QueryVariationArgs = {
  variationId: Scalars['String'];
};

export type QueryVariationsArgs = {
  testId: Scalars['String'];
};

export type QueryVariationsCountArgs = {
  testId: Scalars['String'];
};

export type TestSessionDataArgs = {
  id?: Maybe<Scalars['ID']>;
  diffImageKey?: Maybe<Scalars['String']>;
  imageKey?: Maybe<Scalars['String']>;
  misMatchPercentage?: Maybe<Scalars['Float']>;
  misMatchTolerance: Scalars['Float'];
  isSameDimensions?: Maybe<Scalars['Boolean']>;
  state: Scalars['String'];
  stateComment?: Maybe<Scalars['String']>;
  autoBaseline: Scalars['Boolean'];
};

export type TestSessionType = {
  __typename?: 'TestSessionType';
  id: Scalars['ID'];
  diffImageKey?: Maybe<Scalars['String']>;
  imageKey?: Maybe<Scalars['String']>;
  misMatchPercentage?: Maybe<Scalars['Float']>;
  misMatchTolerance: Scalars['Float'];
  isSameDimensions?: Maybe<Scalars['Boolean']>;
  state: Scalars['String'];
  stateComment?: Maybe<Scalars['String']>;
  autoBaseline: Scalars['Boolean'];
};

export type TestType = {
  __typename?: 'TestType';
  id: Scalars['ID'];
  name: Scalars['String'];
  project?: Maybe<ProjectType>;
  variations: Array<VariationType>;
};

export type UpdateUserInput = {
  email: Scalars['String'];
  forename?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  forename?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  apiKey: Scalars['String'];
  active: Scalars['Boolean'];
};

export type VariationType = {
  __typename?: 'VariationType';
  id: Scalars['ID'];
  browserName: Scalars['String'];
  deviceName: Scalars['String'];
  additionalData?: Maybe<Scalars['JSON']>;
  baseline?: Maybe<TestSessionType>;
  testSessions: Array<TestSessionType>;
};
export type AllProjectsQueryVariables = {};

export type AllProjectsQuery = { __typename?: 'Query' } & {
  projects: Array<{ __typename?: 'ProjectType' } & ProjectDataFragment>;
};

export type AddProjectMutationVariables = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type AddProjectMutation = { __typename?: 'Mutation' } & {
  createProject: { __typename?: 'ProjectType' } & ProjectDataFragment;
};

export type DeleteProjectMutationVariables = {
  projectId: Scalars['String'];
};

export type DeleteProjectMutation = { __typename?: 'Mutation' } & {
  deleteProject: { __typename?: 'ProjectType' } & Pick<ProjectType, 'id'>;
};

export type ProjectDataFragment = { __typename?: 'ProjectType' } & Pick<
  ProjectType,
  'id' | 'name' | 'description'
>;

export type GetVariationQueryVariables = {
  variationId: Scalars['String'];
};

export type GetVariationQuery = { __typename?: 'Query' } & {
  variation: { __typename?: 'VariationType' } & VariationDataFragment;
};

export type AllVariationsQueryVariables = {
  testId: Scalars['String'];
};

export type AllVariationsQuery = { __typename?: 'Query' } & {
  variations: Array<{ __typename?: 'VariationType' } & VariationDataFragment>;
};

export type DeleteVariationMutationVariables = {
  id: Scalars['String'];
};

export type DeleteVariationMutation = { __typename?: 'Mutation' } & {
  deleteVariation: { __typename?: 'VariationType' } & Pick<VariationType, 'id'>;
};

export type VariationDataFragment = { __typename?: 'VariationType' } & Pick<
  VariationType,
  'id' | 'deviceName' | 'additionalData' | 'browserName'
> & {
    testSessions: Array<
      { __typename?: 'TestSessionType' } & Pick<
        TestSessionType,
        | 'id'
        | 'diffImageKey'
        | 'imageKey'
        | 'misMatchPercentage'
        | 'misMatchTolerance'
        | 'state'
        | 'stateComment'
        | 'autoBaseline'
      >
    >;
  };
export const ProjectDataFragmentDoc = gql`
  fragment ProjectData on ProjectType {
    id
    name
    description
  }
`;
export const VariationDataFragmentDoc = gql`
  fragment VariationData on VariationType {
    id
    deviceName
    additionalData
    browserName
    testSessions {
      id
      diffImageKey
      imageKey
      misMatchPercentage
      misMatchTolerance
      state
      stateComment
      autoBaseline
    }
  }
`;
export const AllProjectsDocument = gql`
  query allProjects {
    projects {
      ...ProjectData
    }
  }
  ${ProjectDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class AllProjectsGQL extends Apollo.Query<
  AllProjectsQuery,
  AllProjectsQueryVariables
> {
  document = AllProjectsDocument;
}
export const AddProjectDocument = gql`
  mutation addProject($name: String!, $description: String) {
    createProject(data: { name: $name, description: $description }) {
      ...ProjectData
    }
  }
  ${ProjectDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class AddProjectGQL extends Apollo.Mutation<
  AddProjectMutation,
  AddProjectMutationVariables
> {
  document = AddProjectDocument;
}
export const DeleteProjectDocument = gql`
  mutation deleteProject($projectId: String!) {
    deleteProject(projectId: $projectId) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class DeleteProjectGQL extends Apollo.Mutation<
  DeleteProjectMutation,
  DeleteProjectMutationVariables
> {
  document = DeleteProjectDocument;
}
export const GetVariationDocument = gql`
  query getVariation($variationId: String!) {
    variation(variationId: $variationId) {
      ...VariationData
    }
  }
  ${VariationDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class GetVariationGQL extends Apollo.Query<
  GetVariationQuery,
  GetVariationQueryVariables
> {
  document = GetVariationDocument;
}
export const AllVariationsDocument = gql`
  query allVariations($testId: String!) {
    variations(testId: $testId) {
      ...VariationData
    }
  }
  ${VariationDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class AllVariationsGQL extends Apollo.Query<
  AllVariationsQuery,
  AllVariationsQueryVariables
> {
  document = AllVariationsDocument;
}
export const DeleteVariationDocument = gql`
  mutation deleteVariation($id: String!) {
    deleteVariation(variationId: $id) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class DeleteVariationGQL extends Apollo.Mutation<
  DeleteVariationMutation,
  DeleteVariationMutationVariables
> {
  document = DeleteVariationDocument;
}