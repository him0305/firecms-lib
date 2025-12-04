import {
  AdditionalFieldDelegate,
  Entity,
  EntityReference,
  ReferencePreview,
} from '@firecms/core';

export const referenceAdditionalField = <T extends Record<string, unknown>>({
  key,
  name,
  path,
  idExtractor = (entity: Entity<T>) => entity.id,
  width,
}: {
  key: string;
  name: string;
  path: string;
  idExtractor?: (entity: Entity<T>) => string;
  width?: number;
}): AdditionalFieldDelegate<T> => ({
  key,
  name,
  width,
  Builder: ({ entity }) => (
    <ReferencePreview
      size="medium"
      reference={new EntityReference(idExtractor(entity), path)}
    />
  ),
});
