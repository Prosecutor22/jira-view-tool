import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//@mui
import {
  Card,
  Button,
  Container,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TextField
} from "@mui/material";
// components
import Scrollbar from "../../components/scrollbar";
import ConfirmPopup from "../../components/confirm-popup";
import ListHead from "../../components/list-head";
import Notification from "../../components/notification";

const TABLE_HEAD = [
  { id: "course_id", label: "#####", align: "left" },
  { id: "class_id", label: "#####", align: "left" },
  { id: "student_id", label: "#####", align: "left" },
  { id: "student_name", label: "#####", align: "left" },
  { id: "cost ", label: "#####", align: "left" },
  { id: "register_date", label: "#####", align: "left" },
  { id: "option" }
];

//--------------------------------------------------

const toDateFormat = (date) => {
  return date.split("T")[0];
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//--------------------------------------------------

export default function HandleClassRegisterPage() {
  const navigate = useNavigate();

  //-------------------------------------------------------------
  const [registerList, setRegisterList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/admin/projects")
      .then((res) => {
        var myList = res.data.registers;
        setRegisterList(myList);
      })
      .catch((error) => navigate('/', {replace: true}));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //--------------------------------------
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  //--------------------------------------
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmParams, setConfirmParams] = useState({});

  const handleOpenConfirm = (course_id, class_id, student_id) => {
    setConfirmParams({
      course_id,
      class_id,
      student_id
    });
    setOpenConfirm(true);
  };

  const [openNoti, setOpenNoti] = useState(false);
  const handleCloseNoti = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNoti(false);
  };

  const [actStatus, setActStatus] = useState(false);
  const [actMessage, setActMessage] = useState("");

  const confirmAction = ({course_id, class_id, student_id}) => {
    axios
      .put("/api/admin/handle-register", {
        course_id,
        class_id,
        student_id,
        status: "paid"
      })
      .then((res) => {
        setOpenConfirm(false);
        setRegisterList(registerList.filter(register => {
          return register.course_id !== course_id || register.class_id !== class_id || register.student_id !== student_id
        }));
        setActStatus(true);
        setOpenNoti(true);
      })
      .catch((error) => {
        setOpenConfirm(false);
        setActStatus(false);
        if (error.response) setActMessage(error.response.data.message);
        else setActMessage(error.message);
        setOpenNoti(true);
      });
  }

  const [textSearch, setTextSearch] = useState('');
  const handleSearchChange = (e) => {
    setTextSearch(e.target.value.toLowerCase());
  }
  //--------------------------------------
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - registerList.length) : 0;
  //--------------------------------------

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            List of Projects
          </Typography>

          <TextField 
            id="outlined-search" 
            label="Search by name" 
            type="search" 
            onChange={handleSearchChange}
          />
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <ListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {registerList
                    .filter(register => register.student_name.toLowerCase().includes(textSearch))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((register, idx) => {
                      const {
                        course_id,
                        class_id,
                        student_id,
                        student_name,
                        cost,
                        register_date,
                      } = register;

                      return (
                        <TableRow hover key={idx} tabIndex={-1}>
                          <TableCell align="left">{course_id}</TableCell>

                          <TableCell align="left">{class_id}</TableCell>

                          <TableCell align="left">{student_id}</TableCell>

                          <TableCell align="left">{student_name}</TableCell>

                          <TableCell align="left">{numberWithCommas(cost)}</TableCell>

                          <TableCell align="left">{toDateFormat(register_date)}</TableCell>

                          <TableCell
                            align="left"
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Button
                              variant="outlined"
                              sx={{ fontSize: "13px", borderRadius: 30 }}
                              onClick={() => handleOpenConfirm(course_id, class_id, student_id)}
                            >
                              Xác nhận thanh toán
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={registerList.filter(register => register.student_name.toLowerCase().includes(textSearch)).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <ConfirmPopup
        open={openConfirm}
        setOpen={setOpenConfirm}
        content="Bạn có chắc chắn muốn xác nhận thanh toán cho yêu cầu đăng ký này?"
        confirmParams={confirmParams}
        confirmAction={confirmAction}
      />
      <Notification
        open={openNoti}
        handleClose={handleCloseNoti}
        status={actStatus}
        message={actMessage}
      />
    </>
  );
}