import { useSelector } from "react-redux";
import { RootState } from "../../Feature/store";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import CustomBanner, {
  ActionButton,
  Container,
  Screen,
} from "../../Components/HeaderBanner";
import { BookOnline, Search } from "@mui/icons-material";
import styled from "styled-components";
import socialIcons from "../../assets/avater.png";
import bgimg from "../../assets/bg.jpg";
import Typewriter from "typewriter-effect";
import { Typography } from "@mui/material";
import { Navlinks } from "./UserHomePage/Styles";
//...

function HomePage() {
  document.title = "CSAP - Security Awareness - Homepage";
  const user = useSelector((state: RootState) => state.user.value);

  return (
    <>
      <HeaderContainer itemProp={bgimg}>
        {/* <Screen /> */}
        <HeaderVoid>
          <img src={socialIcons} height={500} />
        </HeaderVoid>
        <HeaderContent>
          <Glass></Glass>
          <Typography
            variant="h1"
            fontSize={40}
            color="black"
            fontFamily={"serif"}
          >
            CSAP
          </Typography>
          <Typography variant="h1" fontSize={28} color={"black"}>
            Community Security Awareness Project
          </Typography>
          <Typography variant="h1" fontSize={20} color={"black"}>
            <Typewriter
              options={{
                strings: [
                  "Learn the Fundamental Security to Protect your social Existance",
                  "Secure Social Media Accounts For your Digital wellbeing",
                  "Learn and Practise how to protect your self from the trending Attack Vectors",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </Typography>
          <Navlinks to="/course">
            <ActionButton>Get Started</ActionButton>
          </Navlinks>
        </HeaderContent>
        {/* <HeaderImg itemProp={socialIcons}></HeaderImg> */}
      </HeaderContainer>
      <Container></Container>
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
    </>
  );
}
const HeaderContent = styled.div`
  width: 100%;
  height: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px;
  gap: 30px;
  color: white;
  z-index: 999;
  opacity: 100%;
  position: relative;
  /* border: 4px double black; */
`;
const Glass = styled.div`
  width: 80%;
  height: 50%;
  padding: 30px;
  background-color: #e4e3e3;
  opacity: 10%;
  z-index: -1;
  border-radius: 20px;
  position: absolute;
  overflow: hidden;
`;
const Content = styled.div``;
const HeaderVoid = styled.div`
  flex: 1;
  margin: 30px;
`;
const HeaderContainer = styled.div`
  width: 100%;
  height: 90vh;
  /* background-color: #fff; */
  border: 1px solid grey;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  /* background: linear-gradient(45deg, #1cb5e0 0%, #000851 100%); */
  background: url(${(props) => props.itemProp});
  background-position: 0vw;
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  background-size: 100%;

  border: none;
  /* padding: 20px; */
  position: relative;
  /* background:  */
  overflow: hidden;
`;
const HeaderImg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
  background: url(${() => socialIcons});
  z-index: 999;
  background-position: 0vw;
  /* background-repeat: no-repeat; */
  background-blend-mode: multiply;
  background-size: 100%;
  border: none;
  padding: 20px;

  overflow: hidden;
  clip-path: circle(50% at 100% 40%);
  /* clip-path: circle(50% at 50% 100%); */
`;
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
