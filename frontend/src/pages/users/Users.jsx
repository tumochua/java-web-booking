import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Scene from "../Scene";
import {
    apiGetAllUsers,
    apiDeleteUser,
    apiUpdateUser,
    apiSearchUsers,
} from "../../services/userService";
import {
    Box,
    Card,
    CardContent,
    IconButton,
    Typography,
    Modal,
    Button,
    TextField,
    Divider,
    Snackbar,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TablePagination,
    TableSortLabel,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const ROWS_PER_PAGE = 5; // Số lượng hàng trên mỗi trang

function Users() {
    const [allUsers, setAllUsers] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [render, setRender] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [page, setPage] = useState(0); // Trang hiện tại
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "ascending",
    });

    useEffect(() => {
        (async () => {
            const response = await apiGetAllUsers();
            if (response?.data?.code === 1000) {
                setAllUsers(response?.data?.result);
            }
        })();
    }, [render]);

    const handleEdit = (user) => {
        setCurrentUser(user);
        handleOpen();
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setConfirmDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await apiDeleteUser(userToDelete.id);
            console.log(response);
            setSnackbarMessage(response?.data?.result);
            setSnackbarSeverity("success");
            setRender(!render);
        } catch (error) {
            setSnackbarMessage("Error deleting user");
            setSnackbarSeverity("error");
        } finally {
            setSnackbarOpen(true);
            setConfirmDeleteOpen(false);
            setUserToDelete(null);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({
            ...currentUser,
            [name]: value,
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await apiUpdateUser(currentUser.id, currentUser);
            console.log(response);
            setSnackbarMessage(response?.data?.result);
            setSnackbarSeverity("success");
            setRender(!render);
            handleClose();
        } catch (error) {
            setSnackbarMessage("Error updating user");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSearch = async (e) => {
        try {
            const response = await apiSearchUsers(searchTerm);
            if (response?.data?.code === 1000) {
                setAllUsers(response?.data?.result);
                setSortConfig({ key: null, direction: "ascending" }); // Reset sắp xếp khi tìm kiếm
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Xử lý khi người dùng thay đổi trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Hàm sắp xếp bảng
    const sortTable = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });

        const sortedUsers = [...allUsers];
        sortedUsers.sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === "ascending" ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === "ascending" ? 1 : -1;
            }
            return 0;
        });

        setAllUsers(sortedUsers);
    };

    // Tính chỉ số bắt đầu và kết thúc của các hàng trên trang hiện tại
    const startIndex = page * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Scene>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Card
                        sx={{
                            minWidth: 300,
                            maxWidth: 400,
                            boxShadow: 3,
                            borderRadius: 3,
                            padding: 4,
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h5"
                                component="h1"
                                gutterBottom
                            >
                                Edit User
                            </Typography>
                            {currentUser && (
                                <Box
                                    component="form"
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    width="100%"
                                    onSubmit={handleSave}
                                >
                                    <TextField
                                        label="Username"
                                        name="username"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={currentUser?.username}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        label="Email"
                                        name="email"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={currentUser?.email || ""}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        label="First Name"
                                        name="firstname"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={currentUser?.firstname || ""}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        label="Last Name"
                                        name="lastname"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={currentUser?.lastname || ""}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        label="Phone Number"
                                        name="phonenumber"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={currentUser?.phonenumber || ""}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        label="Address"
                                        name="address"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={currentUser?.address || ""}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        label="Date of Birth"
                                        name="dob"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={currentUser?.dob || ""}
                                        onChange={handleInputChange}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                        sx={{ mt: "15px", mb: "25px" }}
                                    >
                                        Save
                                    </Button>
                                    <Divider />
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            </Modal>

            <Dialog
                open={confirmDeleteOpen}
                onClose={() => setConfirmDeleteOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Delete"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setConfirmDeleteOpen(false)}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="primary"
                        autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <NavLink to={"/create-users"} className={"disabled active"}>
                Create User
            </NavLink>

            <Box sx={{ mt: 2 }}>
                <TextField
                    label="Search by Username or Email"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                    onClick={handleSearch}
                >
                    Search

                </Button>
            </Box>

            <Typography variant="h5" component="h1" gutterBottom sx={{ mt: 3 }}>
                List Users
            </Typography>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={sortConfig.key === "username"}
                                    direction={
                                        sortConfig.key === "username"
                                            ? sortConfig.direction
                                            : "asc"
                                    }
                                    onClick={() => sortTable("username")}
                                >
                                    User Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>

                                Email</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Roles</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allUsers &&
                            allUsers
                                .slice(startIndex, endIndex)
                                .map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>
                                            {user.email || "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            {`${user.firstname || "N/A"} ${user.lastname || "N/A"
                                                }`}
                                        </TableCell>
                                        <TableCell>
                                            {user.phonenumber || "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            {user.dob || "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            {user.address || "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            {user?.roles?.map((role) => (
                                                <span
                                                    key={role?.name}
                                                >{`${role?.name} `}</span>
                                            ))}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() =>
                                                    handleEdit(user)
                                                }
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                onClick={() =>
                                                    handleDeleteClick(user)
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={allUsers ? allUsers.length : 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={ROWS_PER_PAGE}
                rowsPerPageOptions={[]}
                sx={{ mt: 2, alignSelf: "center" }}
            />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage || ""}
                </Alert>
            </Snackbar>
        </Scene>
    );
}

export default Users;
