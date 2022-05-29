import { DataGrid, GridCallbackDetails, GridColumns, GridRowClassNameParams, GridRowIdGetter, GridSortModel } from "@mui/x-data-grid";

type TProps = {
  columns: GridColumns;
  getRowClassName?: (params: GridRowClassNameParams) => string;
  getRowId?: GridRowIdGetter;
  loading?: boolean;
  onPageChange?: (page: number, details: GridCallbackDetails) => void;
  onPageSizeChange?: (pageSize: number, details: GridCallbackDetails) => void;
  onSortModelChange?: (model: GridSortModel, details: GridCallbackDetails) => void;
  page?: number;
  pageSize?: number;
  rowCount?: number;
  rows: any[];
  rowsPerPageOptions?: number[];
};

const Datagrid = (props: TProps) => {
  const {
    columns,
    getRowClassName,
    getRowId,
    loading,
    onPageChange,
    onPageSizeChange,
    onSortModelChange,
    page,
    pageSize,
    rowCount = 0,
    rows,
    rowsPerPageOptions = [5, 25, 100]
  } = props;

  return (
    <DataGrid
      columns={columns}
      disableColumnFilter
      disableSelectionOnClick
      editMode="row"
      getRowClassName={getRowClassName}
      getRowId={getRowId}
      loading={loading}
      onRowEditStart={(param, event) => (event.defaultMuiPrevented = true)}
      onRowEditStop={(param, event) => (event.defaultMuiPrevented = true)}
      onCellFocusOut={(param, event) => (event.defaultMuiPrevented = true)}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onSortModelChange={onSortModelChange}
      page={page}
      pageSize={pageSize}
      pagination
      paginationMode="server"
      rows={rows}
      rowCount={rowCount}
      rowsPerPageOptions={rowsPerPageOptions}
      sortingMode="server"
      sx={{
        height: `${(rows.length || 1) * 52 + 111}px`
      }}
    />
  );
};

export default Datagrid;
