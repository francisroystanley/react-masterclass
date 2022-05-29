import { useEffect, useState } from "react";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, Checkbox, Container, IconButton } from "@mui/material";
import { GridColumns, GridRowsProp, GridSortModel } from "@mui/x-data-grid";

import SocialInteractionsModal from "./Modal";
import SocialInteractionsNotification from "./Notification";
import { useTypedDispatch, useTypedSelector } from "../../hooks";
import { ConfirmModal, Datagrid } from "../../shared";
import { deleteSocialInteraction, fetchSocialInteractionNotification, fetchSocialInteractions } from "../../slices/socialInteraction";
import { TFilterParam, TModalReason, TSocialInteractionWithId } from "../../types";

import "./Main.scss";

type TState = {
  deleteSocialInteractionId?: string;
  editingSocialInteraction?: TSocialInteractionWithId;
  filter: TFilterParam;
  isConfirmModalOpen: boolean;
  isLoading: boolean;
  isModalOpen: boolean;
  rows: GridRowsProp;
  showLastTwoWeeks: boolean;
};

const SocialInteractions = () => {
  const columns: GridColumns = [
    {
      editable: true,
      field: "name",
      flex: 3,
      headerAlign: "center",
      headerName: "Name"
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
      field: "isSocialDistancing",
      flex: 1.5,
      headerAlign: "center",
      headerName: "Social Distancing",
      type: "boolean"
    },
    {
      field: "actions",
      flex: 1,
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ row }) => [
        <IconButton color="primary" onClick={() => openModal(row as TSocialInteractionWithId)}>
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
    isLoading: false,
    isModalOpen: false,
    rows: [],
    showLastTwoWeeks: false
  });
  const socialInteractionState = useTypedSelector(state => state.socialInteraction);

  const handleConfirmModalClose = async (reason: TModalReason) => {
    if (reason === "backdropClick") return;

    setState(prevState => ({ ...prevState, isConfirmModalOpen: false }));

    if (reason === "okButton") {
      await dispatch(deleteSocialInteraction(state.deleteSocialInteractionId!));
      dispatch(fetchSocialInteractions(state.filter));
      dispatch(fetchSocialInteractionNotification());
    }
  };

  const handleDeleteClick = (deleteSocialInteractionId: string) => {
    setState(prevState => ({ ...prevState, deleteSocialInteractionId, isConfirmModalOpen: true }));
  };

  const handleModalClose = (reason: TModalReason) => {
    if (reason === "backdropClick") return;

    setState(prevState => ({ ...prevState, isModalOpen: false }));

    if (reason === "saveButton") {
      dispatch(fetchSocialInteractions(state.filter));
      dispatch(fetchSocialInteractionNotification());
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

  const openModal = (editingSocialInteraction?: TSocialInteractionWithId) => {
    setState(prevState => ({ ...prevState, editingSocialInteraction, isModalOpen: true }));
  };

  useEffect(() => {
    (async () => {
      setState(prevState => ({ ...prevState, isLoading: true }));
      await dispatch(fetchSocialInteractions(state.filter));
    })();
  }, [dispatch, state.filter]);

  useEffect(() => {
    setState(prevState => ({ ...prevState, isLoading: false, rows: socialInteractionState.socialInteractions || [] }));
  }, [socialInteractionState.socialInteractions]);

  return (
    <div className="social-interactions">
      <Container>
        <h1 className="mb-5">Social Interactions List</h1>
        <div className="notifications mb-5">
          <SocialInteractionsNotification />
        </div>
        <div className="filter-records">
          <Checkbox checked={state.showLastTwoWeeks} onChange={e => handleShowLastTwoWeeks(e.target.checked)} />
          <span className="label">Display records within last 14 days</span>
        </div>
        <div className="d-flex table-container mb-3">
          <Datagrid
            columns={columns}
            getRowClassName={({ row }) => (!row.isSocialDistancing ? "bg-red" : "")}
            getRowId={row => row._id}
            loading={state.isLoading}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            onSortModelChange={handleSortChange}
            page={state.filter.page!}
            pageSize={state.filter.pageSize!}
            rowCount={socialInteractionState.totalCount || 0}
            rows={[...state.rows]}
          />
        </div>
        <Button variant="contained" startIcon={<Add />} onClick={() => openModal()}>
          <span>Add Social Interaction</span>
        </Button>
        {state.isModalOpen && <SocialInteractionsModal socialInteraction={state.editingSocialInteraction} onClose={(e, reason) => handleModalClose(reason)} />}
        {state.isConfirmModalOpen && (
          <ConfirmModal title="Delete Social Interaction" modalBody={confirmModalBody} onClose={(e, reason) => handleConfirmModalClose(reason)} />
        )}
      </Container>
    </div>
  );
};

export default SocialInteractions;
