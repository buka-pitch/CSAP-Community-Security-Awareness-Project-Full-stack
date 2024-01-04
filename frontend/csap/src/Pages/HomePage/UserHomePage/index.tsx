import React from "react";
import { Container, ContainerHeader } from "../../../../MainStyle";
import img from "../../../assets/tg.png";
import styled from "styled-components";
import { Card, CardActionArea, CardHeader, CardMedia } from "@mui/material";
import { NavLink } from "react-router-dom";
function UserHomePage() {
  return (
    <Container>
      <HotStory>Security Comes First Start Learning now!</HotStory>
      <ContainerHeader>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "300px",
            height: "200px",
          }}
        >
          <CardMedia content="sdfsd" image={img} />
          <CardHeader title="First Course" />
          <CardActionArea LinkComponent={NavLink}>
            <h3>Enroll Now!</h3>
          </CardActionArea>
        </Card>{" "}
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "300px",
            height: "200px",
          }}
        >
          <CardMedia content="sdfsd" image={img} />
          <CardHeader title="First Course" />
          <CardActionArea LinkComponent={NavLink}>
            <h3>Enroll Now!</h3>
          </CardActionArea>
        </Card>{" "}
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "300px",
            height: "200px",
          }}
        >
          <CardMedia content="sdfsd" image={img} />
          <CardHeader title="First Course" />
          <CardActionArea LinkComponent={NavLink}>
            <h3>Enroll Now!</h3>
          </CardActionArea>
        </Card>{" "}
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "300px",
            height: "200px",
          }}
        >
          <CardMedia content="sdfsd" image={img} />
          <CardHeader title="First Course" />
          <CardActionArea LinkComponent={NavLink}>
            <h3>Enroll Now!</h3>
          </CardActionArea>
        </Card>
      </ContainerHeader>
    </Container>
  );
}

const HotStory = styled.div`
  background-color: yellow;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;
export default UserHomePage;
