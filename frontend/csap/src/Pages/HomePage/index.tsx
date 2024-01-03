import { useSelector } from "react-redux";
import { RootState } from "../../Feature/store";
import { useEffect, useState } from "react";
import axios from "../../Utils/axiosInstance";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import Insta from "../../assets/instagram.png";
import CustomBanner, {
  Container,
  ContentWrapper,
  Screen,
} from "../../Components/HeaderBanner";
import { fabClasses } from "@mui/material";
import {
  ArrowBack,
  Book,
  BookOnline,
  GetAppRounded,
  Instagram,
  Scanner,
  Search,
  X,
} from "@mui/icons-material";
import styled from "styled-components";
function HomePage() {
  const [data, setData] = useState([]);
  const user = useSelector((state: RootState) => state.user.value);
  const cookie = new Cookies();
  useEffect(() => {
    console.log(cookie.getAll());
  }, []);
  return (
    <>
      <Container itemProp="linear-gradient(90deg, #1cb5e0 0%, #000851 100%)">
        <Screen />
        <ContentWrapper>
          <LogoText>CSAP - Community Security Awarness Project</LogoText>

          <LogoIcons>
            <img src={Insta} alt="Instagram Security" width={100} />
            <img src={Insta} alt="Instagram Security" width={100} />
            <img src={Insta} alt="Instagram Security" width={100} />
            <img src={Insta} alt="Instagram Security" width={100} />
          </LogoIcons>
        </ContentWrapper>
      </Container>
      <CustomBanner
        data={[
          {
            icon: BookOnline,
            headerText: "CSAP - Community Secuirty Awarness Project",
            actionBtnText: "Get Started",
            descriptionText: "Learn to Protect your self from social threats",
            imgUrl: null,
          },
          {
            icon: Search,
            headerText: "CSAP (URL & FILE Scanner)",
            actionBtnText: "Start Scan Now!",
            descriptionText:
              "Scan any link and File for malisious Content or Spam",
            imgUrl: null,
          },
        ]}
      />
      <CustomBanner data={[]} />
      <Link to="/login">Login</Link>
      HomePage
      <p>{user.user?.Email}</p>
      {/* {data.map((item) => { */}
      {/* return <p>{item.title}</p>; */}
      {/* })} */}
    </>
  );
}
const LogoIcons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;
const LogoText = styled.div`
  color: white;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  font-size: x-large;
  z-index: 99;
`;
export default HomePage;
