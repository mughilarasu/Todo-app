import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import moment from "moment/moment";
import DialogComponent from "./DialogComponent";
import TableToolbar from "./TableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";

const headCells = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "startDate",
    label: "Start Date",
  },
  {
    id: "endDate",
    label: "End Date",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "options",
    label: "Options",
  },
];

export default function EnhancedTable() {
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [operation, setOperation] = React.useState(null);
  const [editID, seteditID] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    id: "",
    name: "",
    startDate: null,
    endDate: null,
    status: "pending",
  });

  // task multi select logic starts //

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // task multi select logic ends //

  // dialog logic starts //

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // dialog logic ends //

  // add new task logic

  const addNewData = () => {
    let copyFormData={...formData};
    let newObj = Object.assign(copyFormData, { id: data.length + 1 });
    let newData = [...data, newObj];
    setData(newData);
    resetState();
  };

  // update task logic

  const updateNewData = () => {
    let newData = data.map((d) => (d.id === editID ? formData : d));
    setData(newData);
    resetState();
  };

  // delete single task logic

  const DeleteData = (id) => {
    let newData = data.filter((f) => {
      return id !== f.id;
    });
    setData(newData);
  };

  // delete multi task logic

  const DeleteDataAll = () => {
    let newData = data.filter((f) => {
      return !selected.includes(f.id);
    });
    setData(newData);
    setSelected([]);
  };

  // filter logic

  let tableData = data.filter(
    (f) =>
      f.name.toString().toLowerCase().includes(search) ||
      moment(f.startDate).format("DD/MM/YYYY").includes(search) ||
      moment(f.endDate).format("DD/MM/YYYY").includes(search)
  );

  // reset logic

  const resetState = () => {
    handleClose();
    setOperation(null);
    seteditID(null);
    setFormData({
      id: "",
      name: "",
      startDate: null,
      endDate: null,
      status: "pending",
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, height: "calc(95vh - 64px)" }}>
        <TableToolbar
          numSelected={selected.length}
          setSearch={setSearch}
          search={search}
          DeleteDataAll={DeleteDataAll}
          handleClickOpen={handleClickOpen}
          setOperation={setOperation}
          resetState={resetState}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
            stickyHeader
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data.length}
              headCells={headCells}
            />
            <TableBody>
              {tableData.length > 0 ? (
                tableData.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">
                        {row.startDate
                          ? moment(row.startDate).format("DD/MM/YYYY")
                          : "-"}
                      </TableCell>
                      <TableCell align="center">
                        {row.endDate
                          ? moment(row.endDate).format("DD/MM/YYYY")
                          : "-"}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Tooltip title={row.status}>
                          {row.status === "completed" ? (
                            <CheckIcon sx={{ color: "green" }} />
                          ) : (
                            <CancelIcon sx={{ color: "red" }} />
                          )}
                        </Tooltip>{" "}
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit">
                          <IconButton
                            disabled={isItemSelected}
                            onClick={() => {
                              setOperation("UPDATE");
                              seteditID(row.id);
                              setFormData(row);
                              handleClickOpen();
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" sx={{ ml: 1 }}>
                          <IconButton
                            disabled={isItemSelected}
                            onClick={() => DeleteData(row.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow
                  style={{
                    height: 53 * 1,
                  }}
                >
                  <TableCell colSpan={6} align="center">
                    No Task Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <DialogComponent
        operation={operation}
        open={open}
        formData={formData}
        setFormData={setFormData}
        addNewData={addNewData}
        updateNewData={updateNewData}
        resetState={resetState}
      />
    </Box>
  );
}
