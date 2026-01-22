import { DataGrid, type GridColDef } from "@mui/x-data-grid";

type DataTableProps<T extends { id: number | string }> = {
  rows: T[];
  columns: GridColDef<T>[];
  pageSizeOptions?: number[];
  checkboxSelection?: boolean;
};

const DataTable = <T extends { id: number | string }>({
  rows,
  columns,
  pageSizeOptions = [7, 14],
  checkboxSelection = false,
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
    />
  );
};

export default DataTable;
