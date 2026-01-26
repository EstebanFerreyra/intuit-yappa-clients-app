import { DataGrid, type GridColDef } from "@mui/x-data-grid";

type DataTableProps<T extends { id: number | string }> = {
  rows: T[];
  columns: GridColDef<T>[];
  pageSizeOptions?: number[];
  checkboxSelection?: boolean;
  onRowSelect?: (row: T | null) => void;
};

const DataTable = <T extends { id: number | string }>({
  rows,
  columns,
  pageSizeOptions = [5],
  checkboxSelection = false,
  onRowSelect,
}: DataTableProps<T>) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSizeOptions={pageSizeOptions}
      checkboxSelection={checkboxSelection}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: pageSizeOptions[0] },
        },
      }}
      sx={{ height: "100%" }}
      disableMultipleRowSelection
      onRowSelectionModelChange={(selection) => {
        if (!onRowSelect) return;

        const ids = selection.ids;

        if (ids.size === 0) {
          onRowSelect(null);
          return;
        }

        const selectedId = Array.from(ids)[0];

        const selectedRow = rows.find(
          (row) => String(row.id) === String(selectedId),
        );

        onRowSelect(selectedRow ?? null);
      }}
    />
  );
};

export default DataTable;
