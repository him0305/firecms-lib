import { PropertyPreviewProps } from '@firecms/core';
import { getPreviewOffset } from '../utils';

export function ImagesPreview({
  value: values,
  height,
  size,
}: PropertyPreviewProps<string[]>) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "4px",
        alignItems: "center",
        overflowX: "auto",
        maxHeight: `calc(${height}px - ${getPreviewOffset(size)}px)`,
      }}
    >
      {values.map((value, idx) => (
        <img
          key={idx}
          src={value}
          style={{
            objectFit: "contain",
            borderRadius: "4px",
            maxHeight: '100%',
          }}
        />
      ))}
    </div>
  );
}
