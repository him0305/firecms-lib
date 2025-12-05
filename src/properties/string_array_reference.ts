import { buildProperty } from '@firecms/core';
import ReferenceArrayPreview from '../custom_previews/string_array_reference';

export function buildStringArrayRefProperty({
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
