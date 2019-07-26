import { Field, ObjectType, ID, Float } from 'type-graphql';
import { TestSessionState } from '@platform-community-edition/prisma';

// export enum TestSessionState {
//   PENDING,
//   UNRESOLVED,
//   ACCEPTED,
//   DECLINED
// }

// registerEnumType(TestSessionState, {
//   name: 'TestSessionState', // this one is mandatory
//   description: 'The state of the test session' // this one is optional
// });

@ObjectType()
export class TestSession {
  @Field(type => ID)
  id: number;

  @Field({ nullable: true })
  diffImageKey?: string;

  @Field({ nullable: true })
  imageKey?: string;

  @Field(type => Float, { nullable: true })
  misMatchPercentage?: number;

  @Field(type => Float)
  misMatchTolerance: number;

  @Field(type => Boolean, { nullable: true })
  isSameDimensions?: boolean;

  @Field(type => String)
  state: TestSessionState;

  @Field({ nullable: true })
  stateComment?: string;

  @Field(type => Boolean)
  autoBaseline: boolean;
}
