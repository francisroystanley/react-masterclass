import { useEffect, useState } from "react";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, Checkbox, Container, IconButton } from "@mui/material";
import { GridColumns, GridRowsProp, GridSortModel } from "@mui/x-data-grid";

import VisitedPlacesModal from "./Modal";
import { useTypedDispatch, useTypedSelector } from "../../hooks";
import { ConfirmModal, Datagrid } from "../../shared";
import { deleteVisitedPlace, fetchVisitedPlaceNotification, fetchVisitedPlaces } from "../../slices/visitedPlace";
import { TFilterParam, TModalReason, TVisitedPlaceWithId } from "../../types";

import "./Main.scss";
import VisitedPlacesNotification from "./Notification";

type TState = {
  deleteVisitedPlaceId?: string;
  editingVisitedPlace?: TVisitedPlaceWithId;
  filter: TFilterParam;
  isConfirmModalOpen: boolean;
  isLoading: boolean;
  isModalOpen: boolean;
  rows: GridRowsProp;
  showLastTwoWeeks: boolean;
};

const VisitedPlaces = () => {
  const columns: GridColumns = [
    {
      editable: true,
      field: "place",
      flex: 3,
      headerAlign: "center",
      headerName: "Place"
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
      flex: 1.2,
      headerAlign: "center",
      headerName: "Hours",
      type: "number"
    },
    {
      align: "center",
      editable: true,
      field: "isCrowded",
      flex: 1.2,
      headerAlign: "center",
      headerName: "Crowded",
      type: "boolean"
    },
    {
      field: "actions",
      flex: 1,
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ row }) => [
        <IconButton color="primary" onClick={() => openModal(row as TVisitedPlaceWithId)}>
          <Edit />
        </IconButton>,
        <IconButton color="error" onClick={() => handleDeleteClick(row._id)}>
          <Delete />
        </IconButton>
      ]
    }
  ];
  const confirmModalBody = "Do you want to proceed?";
  const dispatch = useTypedDispatch();
  const [state, setState] = useState<TState>({
    filter: { page: 0, pageSize: 5 },
    isConfirmModalOpen: false,
    isLoading: true,
    isModalOpen: false,
    rows: [],
    showLastTwoWeeks: false
  });
  const visitedPlaceState = useTypedSelector(state => state.visitedPlace);

  const handleConfirmModalClose = async (reason: TModalReason) => {
    if (reason === "backdropClick") return;

    setState(prevState => ({ ...prevState, isConfirmModalOpen: false }));

    if (reason === "okButton") {
      await dispatch(deleteVisitedPlace(state.deleteVisitedPlaceId!));
      dispatch(fetchVisitedPlaces(state.filter));
      dispatch(fetchVisitedPlaceNotification());
    }
  };

  const handleDeleteClick = (deleteVisitedPlaceId: string) => {
    setState(prevState => ({ ...prevState, deleteVisitedPlaceId, isConfirmModalOpen: true }));
  };

  const handleModalClose = (reason: TModalReason) => {
    if (reason === "backdropClick") return;

    setState(prevState => ({ ...prevState, isModalOpen: false }));

    if (reason === "saveButton") {
      dispatch(fetchVisitedPlaces(state.filter));
      dispatch(fetchVisitedPlaceNotification());
    }
  };

  const handleShowLastTwoWeeks = (showLastTwoWeeks: boolean) => {
    let fromDate: Date | undefined;

    if (showLastTwoWeeks) {
      fromDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 14);
    }

    setState(prevState => ({ ...prevState, filter: { ...prevState.filter, fromDate }, showLastTwoWeeks }));
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

  const onPageChange = (page: number) => {
    setState(prevState => ({ ...prevState, filter: { ...prevState.filter, page } }));
  };

  const onPageSizeChange = (pageSize: number) => {
    setState(prevState => ({ ...prevState, filter: { ...prevState.filter, pageSize } }));
  };

  const openModal = (editingVisitedPlace?: TVisitedPlaceWithId) => {
    setState(prevState => ({ ...prevState, editingVisitedPlace, isModalOpen: true }));
  };

  useEffect(() => {
    (async () => {
      await dispatch(fetchVisitedPlaces(state.filter));
    })();
  }, [dispatch, state.filter]);

  useEffect(() => {
    (async () => {
      dispatch(fetchVisitedPlaceNotification());
    })();
  }, [dispatch]);

  useEffect(() => {
    setState(prevState => ({ ...prevState, isLoading: false, rows: visitedPlaceState.visitedPlaces || [] }));
  }, [visitedPlaceState.visitedPlaces]);

  return (
    <div className="visited-places">
      <Container>
        <h1 className="mb-3">Visited Places List</h1>
        <div className="notifications mb-5">
          <VisitedPlacesNotification />
        </div>
        <div className="filter-records">
          <Checkbox checked={state.showLastTwoWeeks} onChange={e => handleShowLastTwoWeeks(e.target.checked)} />
          <span className="label">Display records within last 14 days</span>
        </div>
        <div className="d-flex table-container mb-3">
          <Datagrid
            columns={columns}
            getRowClassName={({ row }) => (row.isCrowded ? "bg-red" : "")}
            getRowId={row => row._id}
            loading={state.isLoading}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            onSortModelChange={handleSortChange}
            page={state.filter.page!}
            pageSize={state.filter.pageSize!}
            rowCount={visitedPlaceState.totalCount || 0}
            rows={[...state.rows]}
          />
        </div>
        <Button variant="contained" startIcon={<Add />} onClick={() => openModal()}>
          <span>Add Visited Place</span>
        </Button>
        {state.isModalOpen && <VisitedPlacesModal visitedPlace={state.editingVisitedPlace} onClose={(e, reason) => handleModalClose(reason)} />}
        {state.isConfirmModalOpen && (
          <ConfirmModal title="Delete Visited Place" modalBody={confirmModalBody} onClose={(e, reason) => handleConfirmModalClose(reason)} />
        )}
      </Container>
    </div>
  );
};

export default VisitedPlaces;
