import { buildProperty } from '@firecms/core';
import ReferenceField from '../custom_fields/string_reference';
import ReferencePreview from '../custom_previews/string_reference';

export function buildStringRefProperty({
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
