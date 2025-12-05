import {
  EntityReference,
  PropertyPreviewProps,
  ReferencePreview,
} from '@firecms/core';

type StringArrayReferencePreviewCustomProps = {
  path: string;
  previewProperties?: string[];
};

export default function StringArrayRefPreview({
  value: values,
  customProps,
  size = 'medium',
  ...props
}: PropertyPreviewProps<string[], StringArrayReferencePreviewCustomProps>) {
  if (!customProps) return null;
  if (values.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {values.map((value) => (
        <ReferencePreview
          {...props}
          key={value}
          size={size}
          reference={new EntityReference(value, customProps.path)}
          previewProperties={customProps.previewProperties}
        />
      ))}
    </div>
  );
}
