import { useRef } from "react";
import { DataGrid, GridColumns, GridRowId, GridRowsProp, useGridApiRef } from "@mui/x-data-grid";
import { Button, Container } from "@mui/material";
import { Add, Close, Delete, Edit, Save } from "@mui/icons-material";

import "./SocialInteractions.scss";

const SocialInteractions = () => {
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
  const rows: GridRowsProp = [
    { id: 1, place: "Snow", date: new Date("11/2/2021"), hours: 3, isCrowded: false },
    { id: 2, place: "Lannister", date: new Date("12/23/2021"), hours: 2, isCrowded: false },
    { id: 3, place: "Los Angeles", date: new Date("1/25/2021"), hours: 4, isCrowded: true },
    { id: 4, place: "Stark", date: new Date("8/9/2021"), hours: 1, isCrowded: false },
    { id: 5, place: "Targaryen", date: new Date("9/16/2021"), hours: 0, isCrowded: true },
    { id: 6, place: "Manila", date: new Date("9/1/2021"), hours: 10, isCrowded: false }
  ];
  const editRow = useRef<GridRowId>("");

  const handleEditClick = (id: GridRowId) => (event: React.MouseEvent) => {
    event.stopPropagation();

    if (editRow.current) return;

    editRow.current = id;
    apiRef.current.setRowMode(id, "edit");
  };

  const handleSaveClick = (id: GridRowId) => async (event: React.MouseEvent) => {
    editRow.current = "";
    event.stopPropagation();
    // Wait for the validation to run
    const isValid = await apiRef.current.commitRowChange(id);
    if (isValid) {
      apiRef.current.setRowMode(id, "view");
    }
  };

  const handleDeleteClick = (id: GridRowId) => (event: React.MouseEvent) => {
    event.stopPropagation();
    apiRef.current.updateRows([{ id, _action: "delete" }]);
  };

  const handleCancelClick = (id: GridRowId) => (event: React.MouseEvent) => {
    event.stopPropagation();
    editRow.current = "";
    apiRef.current.setRowMode(id, "view");
  };

  return (
    <div className="visited-places">
      <Container>
        <h1 className="mb-5">Visited Places List</h1>
        <Button variant="contained" startIcon={<Add />}>
          <span>Go Back</span>
        </Button>
        <div className="d-flex table-container mb-3">
          <DataGrid
            columns={columns}
            disableColumnFilter
            disableSelectionOnClick
            editMode="row"
            onRowEditStart={(param, event) => (event.defaultMuiPrevented = true)}
            onRowEditStop={(param, event) => (event.defaultMuiPrevented = true)}
            onCellFocusOut={(param, event) => (event.defaultMuiPrevented = true)}
            pageSize={5}
            pagination
            paginationMode="server"
            rows={rows}
            rowsPerPageOptions={[5]}
            sortingMode="server"
          />
        </div>
        <Button variant="contained" startIcon={<Add />}>
          <span>Add Visited Place</span>
        </Button>
      </Container>
    </div>
  );
};

export default SocialInteractions;
