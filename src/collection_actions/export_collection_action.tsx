import {
  CollectionActionsProps,
  Entity,
  useSnackbarController,
} from '@firecms/core';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DownloadIcon,
  IconButton,
} from '@firecms/ui';
import { useState } from 'react';

export function ExportCollectionActions({
  collection,
  context,
  tableController,
  collectionEntitiesCount,
}: CollectionActionsProps) {
  const snackbarController = useSnackbarController();
  const [open, setOpen] = useState(false);

  const inferCollectionDisplayName = (): string => {
    const base =
      collection.name || collection.id || collection.path || 'Collection';
    const humanize = (s: string) => {
      const spaced = s
        .replace(/[_-]+/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\s+/g, ' ')
        .trim();
      return spaced
        .split(' ')
        .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
        .join(' ');
    };
    return humanize(String(base));
  };
  const collectionDisplayName = inferCollectionDisplayName();

  const formatTimestampForFilename = (): string => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return (
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
      `-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
    );
  };

  const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const escapeCsvCell = (value: unknown): string => {
    if (value === null || value === undefined) return '';
    const str = typeof value === 'string' ? value : JSON.stringify(value);
    const needsQuotes = /[",\n]/.test(str);
    const escaped = str.replace(/"/g, '""');
    return needsQuotes ? `"${escaped}"` : escaped;
  };

  const buildCSV = (entities: Entity[]) => {
    const propertyKeys = Object.keys(collection.properties || {});
    const headers = ['id', ...propertyKeys];
    const headerLine = headers.map(escapeCsvCell).join(',');
    const lines = [headerLine];
    for (const entity of entities) {
      const rowValues = headers.map((key) => {
        const value =
          key === 'id'
            ? entity.id
            : (entity.values as Record<string, unknown>)?.[key];
        return escapeCsvCell(value);
      });
      lines.push(rowValues.join(','));
    }
    return lines.join('\n');
  };

  const exportAll = async () => {
    try {
      snackbarController.open({
        type: 'info',
        message: 'Preparing CSV export...',
      });

      const batchSize = 500;
      let startAfter: Entity | undefined = undefined;
      const all: Entity[] = [];

      // Respect current filters/search if available
      const currentFilters = tableController?.filterValues;
      const currentSort = tableController?.sortBy;
      const currentSearch = tableController?.searchString;

       
      while (true) {
        const batchResult: unknown = await context.dataSource.fetchCollection({
          path: collection.path,
          collection,
          filter: currentFilters,
          limit: batchSize,
          startAfter,
          orderBy: currentSort?.[0],
          order: currentSort?.[1],
          searchString: currentSearch,
        });

        // Type guard for Entity array
        const batch: Entity[] = Array.isArray(batchResult)
          ? (batchResult as Entity[])
          : [];

        if (!batch || batch.length === 0) break;
        all.push(...batch);
        if (batch.length < batchSize) break;
        startAfter = batch[batch.length - 1];
      }
       

      const csv = buildCSV(all);
      const baseName = collection.id || collection.path || 'export';
      const filename = `${baseName}-${formatTimestampForFilename()}.csv`;
      downloadCSV(csv, filename);

      snackbarController.open({
        type: 'success',
        message: `Exported ${all.length} record(s) from ${collectionDisplayName} to ${filename}`,
      });
    } catch (e: unknown) {
      console.error(e);
      snackbarController.open({
        type: 'error',
        message: e instanceof Error ? e.message : 'Failed to export collection',
      });
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        title="Export"
        aria-label="Export"
      >
        <DownloadIcon />
      </IconButton>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle>Export {collectionDisplayName} data</DialogTitle>
        <DialogContent>
          Are you sure to export
          {typeof collectionEntitiesCount === 'number'
            ? ` ${collectionEntitiesCount} record${
                collectionEntitiesCount === 1 ? '' : 's'
              } `
            : ''}
          to CSV?
          <br />
          This will include currently applied filters and search.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={() => void exportAll()}>Export</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
