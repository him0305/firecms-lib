import { PropertyPreviewProps } from '@firecms/core';
import { getPreviewOffset } from '../utils';

export function ImagePreview({
  value,
  height,
  size
}: PropertyPreviewProps<string>) {
  return <img
    src={value}
    style={{
      objectFit: "contain",
      borderRadius: "4px",
      maxHeight: `calc(${height}px - ${getPreviewOffset(size)}px)`,
    }}
  />;
}
