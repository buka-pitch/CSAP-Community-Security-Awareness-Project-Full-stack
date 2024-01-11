import { Card, CardActionArea, CardHeader } from "@mui/material";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const CardAction = styled(CardActionArea)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  color: GrayText;
`;
export const Navlinks = styled(NavLink)`
  text-decoration: none;
  color: white;
`;
export const ContainerHeader = styled.div`
  display: flex;
  align-self: start;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  border-radius: 25px;
  gap: 20px;
  overflow: hidden;
  background-color: #f7f6f6;
  position: relative;
`;

export const HCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  border-radius: 20px 20px 0px 0px;
  box-shadow: 0px 5px 20px 1px blueviolet;
`;
export const HCardHeader = styled(CardHeader)`
  height: 100%;
  width: 90%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0px 0px 10px black;
  font-weight: bold;
  text-align: center;
  /* background-color: blueviolet; */
  /* border-radius: 25px; */
`;
export const HotStory = styled.div`
  background-color: yellow;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
`;
