import {
  EntityReference,
  FieldProps,
  ReferenceFieldBinding,
} from '@firecms/core';

interface StringReferenceFieldProps {
  path: string;
}

export function StringRefField({
  property,
  customProps,
  value,
  ...props
}: FieldProps<string, StringReferenceFieldProps>) {
  const { path } = customProps;

  if (!path) {
    throw new Error('StringReferenceField requires `customProps.path` to be defined');
  }

  return (
    <ReferenceFieldBinding
      {...props}
      customProps={customProps}
      property={{ ...property, path }}
      value={value ? new EntityReference(value, path) : undefined}
    />
  );
}
