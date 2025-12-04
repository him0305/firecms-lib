import {
  EntityReference,
  FieldProps,
  ReferenceFieldBinding,
} from '@firecms/core';

interface ReferenceFieldProps {
  path: string;
}

export default function ReferenceField({
  property,
  value,
  ...props
}: FieldProps<string, ReferenceFieldProps>) {
  const customProps = property.customProps as ReferenceFieldProps | undefined;
  const customPath = customProps?.path;

  if (!customPath) {
    throw new Error('ReferenceField requires customProps.path to be defined');
  }

  return (
    <ReferenceFieldBinding
      {...props}
      property={{ ...property, path: customPath } as unknown as typeof property}
      value={value ? new EntityReference(value, customPath) : undefined}
    />
  );
}
