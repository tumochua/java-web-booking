import React, { useEffect, useState } from 'react';
import Scene from "../Scene";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Snackbar,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Modal,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    IconButton,
    Paper
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { apiCreateRole, apiGetAllRole } from "../../services/roleService";
import { apiGetAllPermissions, apiCreatePermissions } from "../../services/permissions";
import DeleteIcon from '@mui/icons-material/Delete';
const modalStyle = {
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

const schemaPermissions = yup.object().shape({
    namePermissions: yup.string().required("Name Permissions Required"),
    descriptionPermissions: yup.string().required("Description Permissions Required"),
});

const schemaRoles = yup.object().shape({
    nameRoles: yup.string().required("Name Role Required"),
    descriptionRoles: yup.string().required("Description Role Required"),
});

function Roles() {
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [type, setType] = useState("role");
    const [open, setOpen] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [defaultPermissions, setDefaultPermissions] = useState([]);
    const [render, setRender] = useState(false);
    const [roles, setRoles] = useState([]);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(type === "permissions" ? schemaPermissions : schemaRoles),
    });

    const handleOpen = (type) => {
        setOpen(true);
        setType(type);
        reset();
        setSelectedPermissions([...defaultPermissions]); // Set default permissions when opening modal
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackBarOpen(false);
    };

    const onSubmit = async (data) => {
        try {
            if (type === "role") {
                const roleData = {
                    name: data.nameRoles,
                    description: data.descriptionRoles,
                    permissions: selectedPermissions,
                };
                // console.log(roleData);

                try {
                    const res = await apiCreateRole(roleData);
                    console.log(res);
                    setSnackBarMessage("Role created successfully.");
                    setSnackBarOpen(true);
                } catch (error) {
                    console.error("Failed to create role:", error);
                    const errorMessage = error.response?.data?.message || "Failed to create role.";
                    setSnackBarMessage(errorMessage);
                    setSnackBarOpen(true);
                }
            }
            if (type === 'permissions') {
                const permissionsData = {
                    name: data?.namePermissions,
                    description: data?.descriptionPermissions
                }

                try {
                    const res = await apiCreatePermissions(permissionsData);
                    if (res?.data?.code === 1000) {
                        setRender(!render);
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            handleClose();
        } catch (error) {
            const errorResponse = error?.response?.data;
            setSnackBarMessage(errorResponse.message);
            setSnackBarOpen(true);
        }
    };

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const res = await apiGetAllPermissions();
                const fetchedPermissions = res?.data?.result || [];
                setPermissions(fetchedPermissions); // Save permissions list from server to state

                // Set default permissions (first permission in the list) when permissions are fetched
                if (fetchedPermissions.length > 0) {
                    setDefaultPermissions([fetchedPermissions[0].name]);
                    setSelectedPermissions([fetchedPermissions[0].name]); // Set default selected permission
                }
            } catch (error) {
                console.error("Failed to fetch permissions:", error);
            }
        };

        fetchPermissions();
    }, [render]);

    useEffect(() => {
        try {
            (async () => {
                const res = await apiGetAllRole()
                if (res.data?.code === 1000) {
                    setRoles(res.data?.result);
                }
            })()
        } catch (error) {
            console.log(error);
        }
    }, [])


    const handleDeleteRole = (roleName) => {
        console.log('Delete role:', roleName);
        // Thêm logic xóa role ở đây
    };

    const handleDeletePermission = (permissionName) => {
        console.log('Delete permission:', permissionName);
        // Thêm logic xóa permission ở đây
    };

    return (
        <Scene>
            <Box>
                <Button
                    variant="contained"
                    sx={{
                        mr: 2,
                    }}
                    onClick={() => handleOpen("permissions")}
                >
                    Create Permissions
                </Button>
                <Button variant="contained" onClick={() => handleOpen("role")}>
                    Create Role
                </Button>
            </Box>

            <Snackbar
                open={snackBarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackBarMessage}
                </Alert>
            </Snackbar>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Card sx={{ p: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="h1" gutterBottom>
                                {type === "permissions" ? "Create A Permission" : "Create A Role"}
                            </Typography>
                            <Box
                                component="form"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                {type === "permissions" ? (
                                    <>
                                        <Box>
                                            <Controller
                                                name="namePermissions"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Name"
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                        error={!!errors.namePermissions}
                                                        helperText={errors.namePermissions?.message}
                                                    />
                                                )}
                                            />
                                        </Box>

                                        <Box>
                                            <Controller
                                                name="descriptionPermissions"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Description"
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                        error={!!errors.descriptionPermissions}
                                                        helperText={errors.descriptionPermissions?.message}
                                                    />
                                                )}
                                            />
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        <Box>
                                            <Controller
                                                name="nameRoles"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Name Role"
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                        error={!!errors.nameRoles}
                                                        helperText={errors.nameRoles?.message}
                                                    />
                                                )}
                                            />
                                        </Box>

                                        <Box>
                                            <Controller
                                                name="descriptionRoles"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Description Role"
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                        error={!!errors.descriptionRoles}
                                                        helperText={errors.descriptionRoles?.message}
                                                    />
                                                )}
                                            />
                                        </Box>

                                        <Box>
                                            <FormControl fullWidth margin="normal" error={!!errors.permissions}>
                                                <InputLabel id="permissions-label">Permissions</InputLabel>
                                                <Select
                                                    labelId="permissions-label"
                                                    multiple
                                                    value={selectedPermissions}
                                                    onChange={(event) => setSelectedPermissions(event.target.value)}
                                                    renderValue={(selected) => (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {selected.map((name) => (
                                                                <Chip
                                                                    key={name}
                                                                    label={name}
                                                                    style={{ margin: 2 }}
                                                                />
                                                            ))}
                                                        </Box>
                                                    )}
                                                    MenuProps={{
                                                        PaperProps: {
                                                            style: {
                                                                maxHeight: 224, // Set the max height of the menu
                                                                width: 250,
                                                            },
                                                        },
                                                    }}
                                                >
                                                    {permissions && permissions.map((permission) => (
                                                        <MenuItem key={permission?.name} value={permission?.name}>
                                                            {permission?.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </>
                                )}
                                <Button
                                    type="submit"
                                    variant
                                    ="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    sx={{
                                        mt: "15px",
                                        mb: "25px",
                                    }}
                                >
                                    Save
                                </Button>
                                <Divider />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Modal>

            <Box>
                <Typography variant="h4" gutterBottom>
                    Roles and Permissions
                </Typography>

                <TableContainer component={Paper} sx={{ mb: 3 }}>
                    <Typography variant="h5" gutterBottom sx={{ p: 2 }}>
                        Roles
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Permissions</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roles.map((role) => (
                                <TableRow key={role.name}>
                                    <TableCell>{role.name}</TableCell>
                                    <TableCell>{role.description}</TableCell>
                                    <TableCell>
                                        {role.permissions.map((permission) => permission.name).join(', ')}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDeleteRole(role.name)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TableContainer component={Paper}>
                    <Typography variant="h5" gutterBottom sx={{ p: 2 }}>
                        Permissions
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {permissions.map((permission) => (
                                <TableRow key={permission.name}>
                                    <TableCell>{permission.name}</TableCell>
                                    <TableCell>{permission.description}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDeletePermission(permission.name)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Scene>
    );
}

export default Roles;
