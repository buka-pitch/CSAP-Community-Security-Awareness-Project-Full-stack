import { useRouteError } from "react-router-dom";
import styled from "styled-components";
export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <Container>
      <HeaderErrorText>Oops!</HeaderErrorText>
      <p>Sorry Something Went Wrong!</p>
      <h4>404 - Not Found</h4>
    </Container>
  );
}

const Container = styled.div`
  /* width: ; */
  height: 90dvh;
  background-color: whitesmoke;
  color: Black;
  font-size: medium;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 4px solid red;
`;

const HeaderErrorText = styled.h3`
  color: red;
  background-color: #757474;
  padding: 10px;
  margin: 10px;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
