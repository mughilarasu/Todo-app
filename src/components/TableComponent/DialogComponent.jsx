import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DialogComponent(props) {
  const {
    operation,
    open,
    formData,
    setFormData,
    addNewData,
    updateNewData,
    resetState,
  } = props;

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>{operation} TASK</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <TextField
            autoFocus
            id="name"
            label="Name"
            type="text"
            variant="outlined"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            sx={{
              m: 1,
              width: "92%",
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={formData.startDate}
              inputFormat="dd/MM/yyyy"
              onChange={(newValue) => {
                setFormData({
                  ...formData,
                  startDate: newValue,
                });
              }}
              renderInput={(params) => (
                <TextField
                  sx={{
                    m: 1,
                    width: "92%",
                  }}
                  {...params}
                  id="startDate"
                  fullWidth
                  variant="outlined"
                  error={false}
                  onKeyDown={(e) => e.preventDefault()}
                />
              )}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="End Date"
              value={formData.endDate}
              inputFormat="dd/MM/yyyy"
              onChange={(newValue) => {
                setFormData({
                  ...formData,
                  endDate: newValue,
                });
              }}
              renderInput={(params) => (
                <TextField
                  sx={{
                    m: 1,
                    width: "92%",
                  }}
                  {...params}
                  id="endDate"
                  fullWidth
                  variant="outlined"
                  error={false}
                  onKeyDown={(e) => e.preventDefault()}
                />
              )}
            />
          </LocalizationProvider>

          <FormControl
            sx={{
              m: 1,
              width: "92%",
            }}
          >
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.status}
              label="Status"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value,
                })
              }
            >
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"completed"}>Completed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetState} color="primary">
            Cancel
          </Button>
          <Button
            onClick={
              operation === "ADD"
                ? addNewData
                : operation === "UPDATE"
                ? updateNewData
                : null
            }
            color="primary"
            disabled={formData.name===""}
          >
            {operation}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
