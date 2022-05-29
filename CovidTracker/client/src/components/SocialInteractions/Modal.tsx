import { useEffect, useRef, useState } from "react";
import { Clear, Save } from "@mui/icons-material";
import { AutocompleteRenderInputParams, Button, Checkbox, Grid, TextField, Typography } from "@mui/material";

import { useTypedDispatch, useTypedSelector } from "../../hooks";
import { AutoComplete, Modal } from "../../shared";
import { addSocialInteraction, fetchSocialInteractionNames, updateSocialInteraction } from "../../slices/socialInteraction";
import { TModalReason, TSocialInteractionWithId, TSocialInteractionForm, TAutoCompleteOption } from "../../types";

import "./Modal.scss";

type TProps = {
  onClose: (event: {}, reason: TModalReason) => void;
  socialInteraction?: TSocialInteractionWithId;
};

const SocialInteractionsModal = (props: TProps) => {
  const { onClose, socialInteraction } = props;
  const dispatch = useTypedDispatch();
  const { names } = useTypedSelector(state => state.socialInteraction);
  const today = new Date().toLocaleDateString("en-CA");
  const formRef = useRef<TSocialInteractionForm>({
    name: { value: null, error: false },
    date: { value: today, error: false },
    hours: { value: 0, error: false },
    isSocialDistancing: { value: false, error: false }
  });
  const [, setForm] = useState<TSocialInteractionForm>({
    name: { value: null, error: false },
    date: { value: today, error: false },
    hours: { value: 0, error: false },
    isSocialDistancing: { value: false, error: false }
  });
  const [nameOptions, setNameOptions] = useState<TAutoCompleteOption[]>([]);
  const socialInteractionRef = useRef<TSocialInteractionWithId>();

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
      name: formRef.current.name.value!,
      date: formRef.current.date.value!,
      hours: formRef.current.hours.value!,
      isSocialDistancing: formRef.current.isSocialDistancing.value!
    };

    if (socialInteraction) {
      data._id = socialInteraction._id;
      isNotEqual = Object.keys(data).some(field => socialInteractionRef.current![field] !== data[field]);
    }

    if (isNotEqual) {
      const fnAction = socialInteraction ? updateSocialInteraction : addSocialInteraction;

      await dispatch(fnAction(data));
    }

    onClose({}, isNotEqual ? "saveButton" : "okButton");
  };

  const renderInput = (params: AutocompleteRenderInputParams) => <TextField {...params} error={formRef.current.name.error} />;

  const validateFields = (name: string) => {
    const { value } = formRef.current[name];
    let error = false;
    let errMsg: string | null = null;

    switch (name) {
      case "name":
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
          Name
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <AutoComplete
          clearOnBlur
          freeSolo
          handleHomeEndKeys
          selectOnFocus
          onBlur={() => validateFields("name")}
          onChange={(e, val) => handleChange("name", val?.inputValue || val?.label || val)}
          options={nameOptions}
          renderInput={renderInput}
          size="small"
          value={formRef.current.name.value}
        />
      </Grid>
      <Grid item xs={4} />
      {formRef.current.name.errMsg && (
        <>
          <Grid item xs={4} />
          <Grid item xs={8} className="error-message">
            {formRef.current.name.errMsg}
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
          Social Distancing
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Checkbox checked={formRef.current.isSocialDistancing.value} onChange={e => handleChange("isSocialDistancing", e.target.checked)} />
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
    dispatch(fetchSocialInteractionNames());
  }, [dispatch]);

  useEffect(() => {
    if (!socialInteraction) return;

    socialInteractionRef.current = { ...socialInteraction };

    Object.keys(formRef.current).forEach(field => {
      if (field === "date") {
        socialInteractionRef.current!.date = new Date(socialInteraction.date).toLocaleDateString("en-CA");
      }

      formRef.current[field].value = socialInteractionRef.current![field];
    });

    setForm(formRef.current);
  }, [socialInteraction]);

  useEffect(() => {
    if (names?.length) {
      setNameOptions(names);
    }
  }, [names]);

  return (
    <Modal
      id="social-interactions-modal"
      modalBody={modalBody}
      modalFooter={modalFooter}
      onClose={onClose}
      title={`${socialInteraction ? "Edit" : "Add"} Social Interaction`}
    />
  );
};

export default SocialInteractionsModal;
