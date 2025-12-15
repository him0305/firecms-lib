import {
  AdditionalFieldDelegate,
  Entity,
  EntityReference,
  PreviewSize,
  ReferencePreview,
} from '@firecms/core';


type AssumedEntityValues = Record<string, unknown>;
type Extractor<T extends AssumedEntityValues> = (entity: Entity<T>) => string;

const defaultIdExtractor = (entity: Entity<AssumedEntityValues>) => entity.id;

function extractValue<T extends AssumedEntityValues>(value: string | Extractor<T>, entity: Entity<T>): string {
  return typeof value === 'function' ? value(entity) : value;
}

export const stringRefAdditionalField = <T extends AssumedEntityValues>({
  key,
  name,
  id = defaultIdExtractor,
  path,
  width,
  size = 'medium',
}: {
  key: string;
  name: string;
  id?: string | Extractor<T>;
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
