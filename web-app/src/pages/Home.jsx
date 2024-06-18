
import Scene from "./Scene";
import PauseOnHover from "../components/Slick";
import DoctorSlick from "../components/DoctorSlick";
// import { Box, Card, CircularProgress, Typography } from "@mui/material";

export default function Home() {



  return (
    <Scene>
      {/* <Typography variant="h5" component="h1" gutterBottom>
        Home Page
      </Typography> */}
      <PauseOnHover></PauseOnHover>
      <DoctorSlick></DoctorSlick>



    </Scene>
  );
}
