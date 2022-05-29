import { useEffect, useRef, useState } from "react";
import { Clear, Save } from "@mui/icons-material";
import { AutocompleteRenderInputParams, Button, Checkbox, Grid, TextField, Typography } from "@mui/material";

import { useTypedDispatch, useTypedSelector } from "../../hooks";
import { AutoComplete, Modal } from "../../shared";
import { addVisitedPlace, fetchVisitedPlacePlaces, updateVisitedPlace } from "../../slices/visitedPlace";
import { TModalReason, TVisitedPlaceWithId, TVisitedPlaceForm, TAutoCompleteOption } from "../../types";

import "./Modal.scss";

type TProps = {
  onClose: (event: {}, reason: TModalReason) => void;
  visitedPlace?: TVisitedPlaceWithId;
};

const VisitedPlacesModal = (props: TProps) => {
  const { onClose, visitedPlace } = props;
  const dispatch = useTypedDispatch();
  const { places } = useTypedSelector(state => state.visitedPlace);
  const today = new Date().toLocaleDateString("en-CA");
  const formRef = useRef<TVisitedPlaceForm>({
    place: { value: null, error: false },
    date: { value: today, error: false },
    hours: { value: 0, error: false },
    isCrowded: { value: false, error: false }
  });
  const [, setForm] = useState<TVisitedPlaceForm>({
    place: { value: null, error: false },
    date: { value: today, error: false },
    hours: { value: 0, error: false },
    isCrowded: { value: false, error: false }
  });
  const [placeOptions, setPlaceOptions] = useState<TAutoCompleteOption[]>([]);
  const visitedPlaceRef = useRef<TVisitedPlaceWithId>();

  const handleChange = (name: string, value: string | boolean | number | null) => {
    if (name === "hours") {
      value = value ? +value : null;
    }

    formRef.current[name] = { value, error: false };
    setForm(prevState => ({ ...prevState, [name]: { value, error: false } }));
  };

  const onSubmit = async () => {
    let isNotEqual = true;

    Object.keys(formRef.current).forEach(validateFields);

    const isInvalid = Object.values(formRef.current).some(field => field.error);

    if (isInvalid) return;

    const data: any = {
      place: formRef.current.place.value!,
      date: formRef.current.date.value!,
      hours: formRef.current.hours.value!,
      isCrowded: formRef.current.isCrowded.value!
    };

    if (visitedPlace) {
      data._id = visitedPlace._id;
      isNotEqual = Object.keys(data).some(field => visitedPlaceRef.current![field] !== data[field]);
    }

    if (isNotEqual) {
      const fnAction = visitedPlace ? updateVisitedPlace : addVisitedPlace;

      await dispatch(fnAction(data));
    }

    onClose({}, isNotEqual ? "saveButton" : "okButton");
  };

  const renderInput = (params: AutocompleteRenderInputParams) => <TextField {...params} error={formRef.current.place.error} />;

  const validateFields = (name: string) => {
    const { value } = formRef.current[name];
    let error = false;
    let errMsg: string | null = null;

    switch (name) {
      case "place":
        if (!value?.trim()) {
          error = true;
          errMsg = "Required";
        }

        break;
      case "date":
        if (!value) {
          error = true;
          errMsg = "Required";
        } else if (new Date(value).setHours(0, 0, 0) > new Date().getTime()) {
          error = true;
          errMsg = "Date should not be greater than today";
        }

        break;
      case "hours":
        if (!value) {
          error = true;
          errMsg = "Required";
        } else if (value > 24) {
          error = true;
          errMsg = "Hour should not be greater than 24";
        } else if (value < 0.5) {
          error = true;
          errMsg = "Hour should not be less than 0.5";
        } else if (!/^\d{1,2}(\.5)?$/.test(value.toString())) {
          error = true;
          errMsg = "Invalid hour format";
        }

        break;
      default:
        return;
    }

    formRef.current[name].error = error;
    formRef.current[name].errMsg = errMsg;
    setForm(prevState => ({ ...prevState, [name]: { ...prevState[name], error, errMsg } }));
  };

  const modalBody = (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={4}>
        <Typography component="label" variant="body1">
          Place
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <AutoComplete
          clearOnBlur
          freeSolo
          handleHomeEndKeys
          selectOnFocus
          onBlur={() => validateFields("place")}
          onChange={(e, val) => handleChange("place", val?.inputValue || val?.label || val)}
          options={placeOptions}
          renderInput={renderInput}
          size="small"
          value={formRef.current.place.value}
        />
      </Grid>
      <Grid item xs={4} />
      {formRef.current.place.errMsg && (
        <>
          <Grid item xs={4} />
          <Grid item xs={8} className="error-message">
            {formRef.current.place.errMsg}
          </Grid>
        </>
      )}
      <Grid item xs={4}>
        <Typography component="label" variant="body1">
          Date
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          type="date"
          size="small"
          value={formRef.current.date.value}
          inputProps={{
            max: today
          }}
          onBlur={() => validateFields("date")}
          onChange={e => handleChange("date", e.target.value)}
          error={formRef.current.date.error}
        />
      </Grid>
      <Grid item xs={4} />
      {formRef.current.date.errMsg && (
        <>
          <Grid item xs={4} />
          <Grid item xs={8} className="error-message">
            {formRef.current.date.errMsg}
          </Grid>
        </>
      )}
      <Grid item xs={4}>
        <Typography component="label" variant="body1">
          Hours
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          type="number"
          size="small"
          value={formRef.current.hours.value}
          onBlur={() => validateFields("hours")}
          onChange={e => handleChange("hours", e.target.value)}
          inputProps={{ min: 0.5, max: 24, step: 0.5 }}
          error={formRef.current.hours.error}
        />
      </Grid>
      <Grid item xs={4} />
      {formRef.current.hours.errMsg && (
        <>
          <Grid item xs={4} />
          <Grid item xs={8} className="error-message">
            {formRef.current.hours.errMsg}
          </Grid>
        </>
      )}
      <Grid item xs={4}>
        <Typography component="label" variant="body1">
          Crowded
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Checkbox checked={formRef.current.isCrowded.value} onChange={e => handleChange("isCrowded", e.target.checked)} />
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );

  const modalFooter = (
    <>
      <Button startIcon={<Clear />} variant="contained" color="warning" onClick={() => onClose({}, "cancelButton")}>
        <span>Cancel</span>
      </Button>
      <Button startIcon={<Save />} variant="contained" color="success" onClick={onSubmit}>
        <span>Save</span>
      </Button>
    </>
  );

  useEffect(() => {
    dispatch(fetchVisitedPlacePlaces());
  }, [dispatch]);

  useEffect(() => {
    if (!visitedPlace) return;

    visitedPlaceRef.current = { ...visitedPlace };

    Object.keys(formRef.current).forEach(field => {
      if (field === "date") {
        visitedPlaceRef.current!.date = new Date(visitedPlace.date).toLocaleDateString("en-CA");
      }

      formRef.current[field].value = visitedPlaceRef.current![field];
    });

    setForm(formRef.current);
  }, [visitedPlace]);

  useEffect(() => {
    if (places?.length) {
      setPlaceOptions(places);
    }
  }, [places]);

  return (
    <Modal id="visited-places-modal" modalBody={modalBody} modalFooter={modalFooter} onClose={onClose} title={`${visitedPlace ? "Edit" : "Add"} Visited Place`} />
  );
};

export default VisitedPlacesModal;
