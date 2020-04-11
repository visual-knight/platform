import { Injectable } from '@angular/core';
import {
  AllVariationsGQL,
  DeleteVariationGQL,
  AllVariationsQuery,
  AllVariationsDocument,
  GetVariationGQL,
  AcceptNewBaselineGQL,
  DeclineTestSessionGQL
} from '../../core/types';
import { first } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class VariationService {
  constructor(
    private allVariationsGQL: AllVariationsGQL,
    private deleteVariationGQL: DeleteVariationGQL,
    private getVariaitonGQL: GetVariationGQL,
    private acceptNewBaseLineGQL: AcceptNewBaselineGQL,
    private declineTestSessionGQL: DeclineTestSessionGQL,
    private apollo: Apollo
  ) {}

  variationList(testId: string) {
    return this.allVariationsGQL.watch({ testId }).valueChanges;
  }

  variation(variationId: string) {
    return this.getVariaitonGQL.watch({ variationId }).valueChanges;
  }

  delete(testId: string, variationId: string) {
    return this.deleteVariationGQL.mutate(
      { id: variationId },
      {
        update: (
          store,
          {
            data: {
              deleteVariation: { id }
            }
          }
        ) => {
          const data: AllVariationsQuery = store.readQuery({
            query: AllVariationsDocument,
            variables: {
              testId
            }
          });
          data.variations = data.variations.filter(
            variation => variation.id !== id
          );
          store.writeQuery({
            query: AllVariationsDocument,
            variables: {
              testId
            },
            data
          });
        }
      }
    );
  }

  acceptNewBaseline(comment: string, testSessionId: string, variationId: string) {
    this.acceptNewBaseLineGQL
      .mutate({ comment, testSessionId, variationId })
      .pipe(first())
      .subscribe();
  }

  declineTestSession(comment: string, testSessionId: string) {
    this.declineTestSessionGQL
      .mutate({ comment, testSessionId })
      .pipe(first())
      .subscribe();
  }

  setSelectedTestSession(testSessionId: string) {
    this.apollo.getClient().writeData({
      data: { selectedTestSession: testSessionId }
    });
  }
}
