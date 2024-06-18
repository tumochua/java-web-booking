
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    TextField,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material";

import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../../services/userService";

export default function CreateUsers() {

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackBarOpen(false);
    };



    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [dob, setDob] = useState("");
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const req = {
                username, password, firstname, lastname, email, phonenumber, address, dob, roles: ["USER"]
            }
            const response = await signUp(req)
            console.log(response);
        } catch (error) {
            const errorResponse = error?.response?.data;
            setSnackBarMessage(errorResponse.message);
            setSnackBarOpen(true);
        }
    };

    return (
        <>
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
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
                bgcolor={"#f0f2f5"}
            >
                <Card
                    sx={{
                        minWidth: 500,
                        maxWidth: 400,
                        boxShadow: 3,
                        borderRadius: 3,
                        padding: 4,
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" component="h1" gutterBottom>
                            Create a account
                        </Typography>
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
                                //type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <TextField
                                label="firstname"
                                //type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                            <TextField
                                label="lastname"
                                //type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                            <TextField
                                label="email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="phonenumber"
                                type="number"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={phonenumber}
                                onChange={(e) => setPhonenumber(e.target.value)}
                            />
                            <TextField
                                label="address"
                                //type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <TextField
                                type="date"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                            <Button
                                color="success"
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                            >
                                Create
                            </Button>
                            <Divider></Divider>
                        </Box>

                        <Box display="flex" flexDirection="column" width="100%" gap="25px">


                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            sx={{
                                mt: "15px",
                                mb: "25px",
                            }}
                        >
                            <Link to={'/login'} className='disabled'>
                                Login
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
