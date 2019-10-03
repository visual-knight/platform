import { Injectable } from '@angular/core';
import {
  AllVariationsGQL,
  DeleteVariationGQL,
  AllVariationsQuery,
  AllVariationsDocument,
  GetVariationGQL
} from '../../core/types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VariationService {
  constructor(
    private allVariationsGQL: AllVariationsGQL,
    private deleteVariationGQL: DeleteVariationGQL,
    private getVariaitonGQL: GetVariationGQL
  ) {}

  variationList(testId: string) {
    return this.allVariationsGQL.watch({ testId }).valueChanges;
  }

  variation(variationId: string) {
    return this.getVariaitonGQL.watch({ variationId }).valueChanges;
  }

  delete(variationId: string) {
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
            query: AllVariationsDocument
          });
          data.variations = data.variations.filter(
            variation => variation.id !== variationId
          );
          store.writeQuery({ query: AllVariationsDocument, data });
        }
      }
    );
  }
}
