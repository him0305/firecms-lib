import {
  AdditionalFieldDelegate,
  Entity,
  EntityReference,
  PreviewSize,
  ReferencePreview,
} from '@firecms/core';

export const stringRefAdditionalField = <T extends Record<string, unknown>>({
  key,
  name,
  path,
  idExtractor = (entity: Entity<T>) => entity.id,
  width,
  size = 'medium',
}: {
  key: string;
  name: string;
  path: string;
  idExtractor?: (entity: Entity<T>) => string;
  width?: number;
  size?: PreviewSize;
}): AdditionalFieldDelegate<T> => ({
  key,
  name,
  width,
  Builder: ({ entity }) => (
    <ReferencePreview
      size={size}
      reference={new EntityReference(idExtractor(entity), path)}
    />
  ),
});
