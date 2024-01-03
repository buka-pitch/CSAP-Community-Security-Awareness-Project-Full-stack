import { Outlet } from "react-router-dom";
import Navbar from "./Components/NavBar";
import styled from "styled-components";
import { Box } from "@mui/material";
import Footer from "./Components/Footer";

function Layout() {
  return (
    <Box
      component={RootContainer}
      sx={{
        flexGrow: 1,
        backgroundColor: "rebeccapurple",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: 0,
      }}
    >
      <Navbar />
      <MainContentArea>
        <Outlet />
      </MainContentArea>
      <Footer />
    </Box>
  );
}
const MainContentArea = styled.div`
  min-height: 60vh;
  width: 100%;
`;
const RootContainer = styled.div`
  margin: 0;
  padding: 0;
  /* position: relative; */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  background-color: #ebebeb;
`;

export default Layout;
