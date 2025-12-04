import {
  EntityReference,
  PropertyPreviewProps,
  ReferencePreview,
} from '@firecms/core';

type ReferenceArrayPreviewCustomProps = {
  path: string;
  previewProperties?: string[];
};

export default function ReferenceArrayPreview({
  value: values,
  customProps,
  ...props
}: PropertyPreviewProps<string[], ReferenceArrayPreviewCustomProps>) {
  return (
    values && (
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
            size="medium"
            reference={new EntityReference(value, customProps!.path)}
            previewProperties={customProps!.previewProperties}
          />
        ))}
      </div>
    )
  );
}
