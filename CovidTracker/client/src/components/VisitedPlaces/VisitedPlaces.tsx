import { useEffect, useRef, useState } from "react";
import { DataGrid, GridColumns, GridRowId, GridRowsProp, GridSortModel, useGridApiRef } from "@mui/x-data-grid";
import { Button, Container } from "@mui/material";
import { Add, Close, Delete, Edit, Save } from "@mui/icons-material";

import { useTypedDispatch, useTypedSelector } from "../../hooks";

import "./VisitedPlaces.scss";
import { fetchVisitedPlaces } from "../../slices/visitedPlace";
import { TFilterParam } from "../../types";

type TState = {
  isLoading: boolean;
  filter: TFilterParam;
  rows: GridRowsProp;
};

const VisitedPlaces = () => {
  const apiRef = useGridApiRef();
  const columns: GridColumns = [
    {
      editable: true,
      field: "place",
      flex: 3,
      headerAlign: "center",
      headerName: "Place",
      renderCell: row => {
        apiRef.current = row.api;

        return row.value;
      }
    },
    {
      align: "center",
      editable: true,
      field: "date",
      flex: 1.5,
      headerAlign: "center",
      headerName: "Date",
      type: "date",
      valueFormatter: ({ value }) => new Date(value).toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" })
    },
    {
      align: "center",
      editable: true,
      field: "hours",
      flex: 1,
      headerAlign: "center",
      headerName: "Hours",
      type: "number"
    },
    {
      align: "center",
      editable: true,
      field: "isCrowded",
      flex: 1,
      headerAlign: "center",
      headerName: "Crowded",
      type: "boolean"
    },
    {
      field: "actions",
      flex: 1.75,
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isEditMode = apiRef.current.getRowMode(id) === "edit";

        if (isEditMode) {
          return [
            <Button variant="contained" color="success" startIcon={<Save />} onClick={handleSaveClick(id)}>
              <span>Save</span>
            </Button>,
            <Button variant="contained" color="warning" startIcon={<Close />} onClick={handleCancelClick(id)}>
              <span>Cancel</span>
            </Button>
          ];
        }

        return [
          <Button variant="contained" color="primary" startIcon={<Edit />} onClick={handleEditClick(id)}>
            <span>Edit</span>
          </Button>,
          <Button variant="contained" color="error" startIcon={<Delete />} onClick={handleDeleteClick(id)}>
            <span>Delete</span>
          </Button>
        ];
      }
    }
  ];
  const dispatch = useTypedDispatch();
  const editRow = useRef<GridRowId>("");
  const [state, setState] = useState<TState>({ filter: { page: 0, pageSize: 5 }, isLoading: false, rows: [] });
  const visitedPlaceState = useTypedSelector(state => state.visitedPlace);

  const handleCancelClick = (id: GridRowId) => (event: React.MouseEvent) => {
    event.stopPropagation();
    editRow.current = "";
    apiRef.current.setRowMode(id, "view");
  };

  const handleDeleteClick = (id: GridRowId) => (event: React.MouseEvent) => {
    event.stopPropagation();
    apiRef.current.updateRows([{ id, _action: "delete" }]);
  };

  const handleEditClick = (id: GridRowId) => (event: React.MouseEvent) => {
    event.stopPropagation();

    if (editRow.current) return;

    editRow.current = id;
    apiRef.current.setRowMode(id, "edit");
  };

  const handleSaveClick = (id: GridRowId) => async (event: React.MouseEvent) => {
    editRow.current = "";
    event.stopPropagation();
    const isValid = await apiRef.current.commitRowChange(id);
    if (isValid) {
      apiRef.current.setRowMode(id, "view");
    }
  };

  const handleSortChange = ([model]: GridSortModel) => {
    let sortValue: undefined | string = undefined;

    if (model) {
      const { field, sort } = model;
      const prefix = sort === "desc" ? "-" : "";
      sortValue = prefix + field;
    }

    setState(prevState => ({ ...prevState, filter: { ...prevState.filter, sort: sortValue } }));
  };

  useEffect(() => {
    (async () => {
      setState(prevState => ({ ...prevState, isLoading: true, rows: [] }));
      await dispatch(fetchVisitedPlaces(state.filter));
    })();
  }, [dispatch, state.filter]);

  useEffect(() => {
    setState(prevState => ({ ...prevState, isLoading: false, rows: visitedPlaceState.visitedPlaces || [] }));
  }, [visitedPlaceState.visitedPlaces]);

  return (
    <div className="visited-places">
      <Container>
        <h1 className="mb-5">Visited Places List</h1>
        <div className="d-flex table-container mb-3">
          <DataGrid
            columns={columns}
            disableColumnFilter
            disableSelectionOnClick
            editMode="row"
            getRowId={row => row._id}
            loading={state.isLoading}
            onRowEditStart={(param, event) => (event.defaultMuiPrevented = true)}
            onRowEditStop={(param, event) => (event.defaultMuiPrevented = true)}
            onCellFocusOut={(param, event) => (event.defaultMuiPrevented = true)}
            onPageChange={page => setState(prevState => ({ ...prevState, filter: { ...prevState.filter, page } }))}
            onPageSizeChange={pageSize => setState(prevState => ({ ...prevState, filter: { ...prevState.filter, pageSize } }))}
            onSortModelChange={handleSortChange}
            page={state.filter.page!}
            pageSize={state.filter.pageSize!}
            pagination
            paginationMode="server"
            rows={state.rows}
            rowCount={visitedPlaceState.totalCount || 0}
            rowsPerPageOptions={[5, 25, 100]}
            sortingMode="server"
            sx={{
              height: `${(state.rows.length || 1) * 52 + 111}px`
            }}
          />
        </div>
        <Button variant="contained" startIcon={<Add />}>
          <span>Add Visited Place</span>
        </Button>
      </Container>
    </div>
  );
};

export default VisitedPlaces;
