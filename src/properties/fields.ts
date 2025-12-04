import { buildProperty } from '@firecms/core';
import ReferenceField from '../custom_fields/reference';
import ReferencePreview from '../custom_previews/reference';
import ReferenceArrayPreview from '../custom_previews/reference_array';

export function referenceStringProperty({
  name,
  path,
  columnWidth = 300,
  editable = true,
  previewProperties,
}: {
  name: string;
  path: string;
  columnWidth?: number;
  editable?: boolean;
  previewProperties?: string[];
}) {
  return buildProperty({
    disabled: false,
    editable,
    columnWidth: columnWidth,
    dataType: 'string',
    name,
    Preview: ReferencePreview,
    Field: ReferenceField,
    customProps: { path, previewProperties },
  });
}

export function referenceStringArrayProperty({
  name,
  path,
  columnWidth = 300,
  previewProperties,
}: {
  name: string;
  path: string;
  columnWidth?: number;
  previewProperties?: string[];
}) {
  return buildProperty<string[]>({
    disabled: false,
    name,
    columnWidth: columnWidth,
    dataType: 'array',
    of: {
      dataType: 'string',
    },
    Preview: ReferenceArrayPreview,
    customProps: { path, previewProperties },
  });
}
