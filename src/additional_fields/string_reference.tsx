import {
  AdditionalFieldDelegate,
  Entity,
  EntityReference,
  PreviewSize,
  ReferencePreview,
} from '@firecms/core';

type Extractor<T extends Record<string, unknown>> = (entity: Entity<T>) => string;

function extractValue<T extends Record<string, unknown>>(value: string | Extractor<T>, entity: Entity<T>): string {
  return typeof value === 'function' ? value(entity) : value;
}

export const stringRefAdditionalField = <T extends Record<string, unknown>>({
  key,
  name,
  id = (entity: Entity<T>) => entity.id,
  path,
  width,
  size = 'medium',
}: {
  key: string;
  name: string;
  id: string | Extractor<T>;
  path: string | Extractor<T>;
  width?: number;
  size?: PreviewSize;
}): AdditionalFieldDelegate<T> => ({
  key,
  name,
  width,
  Builder: ({ entity }) => {
    const idValue = extractValue(id, entity);
    const pathValue = extractValue(path, entity);

    return (
      <ReferencePreview
        size={size}
        reference={new EntityReference(pathValue, idValue)} />
    );
  },
});
