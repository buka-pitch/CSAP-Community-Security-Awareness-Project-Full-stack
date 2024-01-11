import styled from "styled-components";
import { Icon, IconClasses, IconProps, colors } from "@mui/material";
import { ReactElement, ReactNode } from "react";
import { SvgIconComponent } from "@mui/icons-material";

type Props = {
  data: {
    icon: SvgIconComponent;
    headerText: string | null;
    descriptionText: string | null;
    actionBtnText: string | null;
    imgUrl: string | null;
  }[];
};

function CustomBanner({ data }: Props) {
  return (
    <Container
      itemProp={
        data.length > 0 && data[0].imgUrl
          ? data[0].imgUrl
          : "linear-gradient(90deg, #1cb5e0 0%, #000851 100%)"
      }
    >
      <Screen />
      {data.map((item) => {
        const ICon = item.icon;
        return (
          <ContentWrapper>
            <Glass />
            <div>
              <Icon
                component={ICon}
                sx={{ color: "#afe958", width: "100px", height: "100px" }}
              />
            </div>
            <HeaderText>{item.headerText}</HeaderText>
            <Description>{item.descriptionText}</Description>
            <ActionButton>{item.actionBtnText}</ActionButton>
          </ContentWrapper>
        );
      })}
    </Container>
  );
}

export const Container = styled.div`
  width: 100%;
  height: 90vh;
  background-color: #fff;
  border: 1px solid grey;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  background: ${(prop) =>
    prop.itemProp || "linear - gradient(90deg, #1cb5e0 0 %, #000851 100 %)"};
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
export const Glass = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e4e3e3;
  opacity: 10%;
  border-radius: 20px;
  position: absolute;
  overflow: hidden;
`;
export const ContentWrapper = styled.div`
  width: 40%;
  height: 100%;
  margin: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;
export const Screen = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 40%;
  z-index: 1;
`;

export const HeaderText = styled.h2`
  color: white;
  z-index: 99;
  margin: 0;
  padding: 20px;
  font-size: 21px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;

export const Description = styled.p`
  z-index: 99;
  color: antiquewhite;
  font-family: Arial, Helvetica, sans-serif;
  text-justify: auto;
`;

export const ActionButton = styled.button`
  background-color: #afe958;
  z-index: 99;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 20px;
  border: transparent;
  border-radius: 20px;
  color: blueviolet;
  font-weight: bold;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: medium;
  box-shadow: 0px 0px 20px 0px blueviolet;
  &:hover {
    cursor: pointer;
    background-color: blueviolet;
    color: #afe958;
    box-shadow: 0px 0px 20px 0px #afe958;
  }
`;

export default CustomBanner;
