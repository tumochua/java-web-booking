import { Facebook, YouTube } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

function Footer() {
    return (
        <Box sx={
            {
                bgcolor: "rgba(59, 130, 246, .5)",
                padding: '10px',

            }
        }>
            <Box sx={
                {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: 'center'
                }
            }>
                <Typography variant="h5" component="h1" gutterBottom sx={
                    { color: '#fff' }
                }>
                    © 2024 BookingCare.
                </Typography>
                <Box sx={
                    {
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center'
                    }
                }>
                    <i className="fa-brands fa-tiktok"></i>
                    <Facebook></Facebook>
                    <YouTube></YouTube>
                </Box>
            </Box>
        </Box>
    );
}

export default Footer;