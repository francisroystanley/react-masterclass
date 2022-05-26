import { useEffect, useState } from "react";
import { AutocompleteRenderInputParams, Checkbox, Grid, TextField, Typography } from "@mui/material";

import { useAutoComplete, useModal, useTypedDispatch } from "../../hooks";
import { TModalReason, TVisitedPlace, TVisitedPlaceForm } from "../../types";
import { addVisitedPlace } from "../../slices/visitedPlace";

type TProps = {
  onClose: (event: {}, reason: TModalReason) => void;
  open: boolean;
};

type TPlaceOption = {
  label: string;
  value: string;
};

const VisitedPlacesModal = (props: TProps) => {
  const { onClose, open } = props;
  const dispatch = useTypedDispatch();
  const today = new Date().toLocaleDateString("en-CA");
  const [errorForm, setErrorForm] = useState({ place: false, date: false, hours: false });
  const [form, setForm] = useState<TVisitedPlaceForm>({ place: null, date: today, hours: 0, isCrowded: false });
  const placeOptions: TPlaceOption[] = [];

  const handleChange = (name: string, value: string | boolean | number | null) => {
    if (name === "hours") {
      value = value ? +value : null;
    }

    setForm(prevState => ({ ...prevState, [name]: value }));
    setErrorForm(prevState => ({ ...prevState, [name]: false }));
  };

  const renderInput = (params: AutocompleteRenderInputParams) => <TextField {...params} error={errorForm.place} />;

  const validateFields = (name: string) => {
    let isInvalid = false;

    switch (name) {
      case "place":
        isInvalid = !form.place?.trim();
        break;
      case "date":
        isInvalid = !form.date || new Date(form.date).getFullYear() < 1970 || new Date(form.date).getTime() > new Date().getTime();
        break;
      case "hours":
        isInvalid = !form.hours || form.hours > 24 || form.hours < 0.5 || !/^\d{1,2}(\.5)?$/.test(form.hours.toString());
        break;
      default:
        return;
    }

    setErrorForm(prevState => ({ ...prevState, [name]: isInvalid }));
  };

  const Autocomplete = useAutoComplete({
    clearOnBlur: true,
    freeSolo: true,
    handleHomeEndKeys: true,
    selectOnFocus: true,
    onBlur: () => validateFields("place"),
    onChange: (e, val) => handleChange("place", val?.inputValue || val?.label || val),
    options: placeOptions,
    renderInput,
    size: "small",
    value: form.place
  });

  const body = (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={3}>
        <Typography component="label" variant="body1">
          Place
        </Typography>
      </Grid>
      <Grid item xs={5}>
        {Autocomplete}
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={3}>
        <Typography component="label" variant="body1">
          Date
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <TextField
          fullWidth
          type="date"
          size="small"
          value={form.date}
          inputProps={{
            max: today
          }}
          onBlur={() => validateFields("date")}
          onChange={e => handleChange("date", e.target.value)}
          error={errorForm.date}
        />
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={3}>
        <Typography component="label" variant="body1">
          Hours
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <TextField
          fullWidth
          type="number"
          size="small"
          value={form.hours}
          onBlur={() => validateFields("hours")}
          onChange={e => handleChange("hours", e.target.value)}
          inputProps={{ min: 0.5, max: 24, step: 0.5 }}
          error={errorForm.hours}
        />
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={3}>
        <Typography component="label" variant="body1">
          Crowded
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Checkbox checked={form.isCrowded} onChange={e => handleChange("isCrowded", e.target.checked)} />
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );

  const onSubmit = async () => {
    Object.keys(errorForm).forEach(validateFields);

    const isInvalid = Object.values(errorForm).some(val => val === true);

    if (isInvalid) return;

    await dispatch(addVisitedPlace(form as TVisitedPlace));
    onClose({}, "saveButton");
  };

  const modal = useModal({
    children: body,
    title: "Add Visited Place",
    onClose,
    onSubmit,
    open
  });

  useEffect(() => {
    console.log(form);
  }, [form]);

  return modal;
};

export default VisitedPlacesModal;
