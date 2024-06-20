import React, { useState, useEffect } from "react";
import Scene from "../Scene";
import {
    Box,
    Button,
    TextField,
    Snackbar,
    Alert,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    IconButton,
    Tooltip,
    Typography
} from "@mui/material";
import { apiGetAllRole } from "../../services/roleService";
import { signUp, apiGetAllUsers, apiSearchUsers } from "../../services/userService";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";

export default function ManageDoctor() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [dob, setDob] = useState("");
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [doctorUsers, setDoctorUsers] = useState([]);


    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await apiGetAllRole();
                if (res.data?.code === 1000) {
                    setRoles(res.data?.result);
                }
            } catch (error) {
                console.error("Failed to fetch roles:", error);
            }
        };
        fetchRoles();
    }, []);

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackBarOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setModalOpen(true);
    };

    const handleConfirm = async () => {
        try {
            const req = {
                username,
                password,
                firstname,
                lastname,
                email,
                phonenumber,
                address,
                dob,
                roles: selectedRoles,
            }

            const res = await signUp(req);
            console.log(res);
            if (res?.data?.code === 1000) {
                setModalOpen(false);
            }
        } catch (error) {
            const errorResponse = error?.response?.data;
            setSnackBarMessage(errorResponse.message);
            setSnackBarOpen(true);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiGetAllUsers();
                if (response?.data?.code === 1000) {
                    const allUsers = response?.data?.result || [];
                    setUsers(allUsers);
                    const doctorUsers = allUsers?.filter(user =>
                        user.roles.some(role => role?.name === 'DOCTOR')
                    );
                    setDoctorUsers(doctorUsers);
                }
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await apiSearchUsers(searchTerm);
            if (response?.data?.code === 1000) {
                setUsers(response?.data?.result);
            }
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };


    return (
        <Scene>
            <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
                Create doctor
            </Button>
            <Snackbar
                open={snackBarOpen}
                onClose={handleCloseSnackBar}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackBarMessage}
                </Alert>
            </Snackbar>
            <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="md">
                <DialogTitle>Create Doctor</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Phone Number"
                            type="number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={phonenumber}
                            onChange={(e) => setPhonenumber(e.target.value)}
                        />
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <TextField
                            label="Date of Birth"
                            type="date"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="roles-label">Roles</InputLabel>
                            <Select
                                labelId="roles-label"
                                multiple
                                value={selectedRoles}
                                onChange={(e) => setSelectedRoles(e.target.value)}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                            >
                                {roles && roles.map((role) => (
                                    <MenuItem key={role?.name} value={role?.name}>
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
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
                List Doctor
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Roles</TableCell> {/* Add Roles column header */}
                            <TableCell>Actions</TableCell> {/* Add Actions column header */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {doctorUsers && doctorUsers.map((user) => (
                            <TableRow key={user?.id}>
                                <TableCell>{user?.username}</TableCell>
                                <TableCell>{user
                                    ?.email || 'N/A'}</TableCell>
                                <TableCell>{user?.firstname || 'N/A'} ${user.lastname || 'N/A'}</TableCell>
                                <TableCell>{user?.phonenumber || 'N/A'}</TableCell>
                                <TableCell>{user?.dob || 'N/A'}</TableCell>
                                <TableCell>{user?.address || 'N/A'}</TableCell>
                                <TableCell>
                                    {user?.roles?.map((role, index) => (
                                        <Chip key={index} label={role?.name} style={{ marginRight: 4 }} />
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <Link to={`/create-profile-doctor/${user?.id}`} >
                                        <Tooltip title="Create Profile Doctor">
                                            <IconButton>
                                                <AddCircleOutlineIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Scene>
    );
}

