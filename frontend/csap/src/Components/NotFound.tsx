import styled from "styled-components";

function NotFound() {
  return (
    <Container>
      <Modal>NotFound</Modal>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #dfdbdb;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Modal = styled.div`
  width: 90%;
  height: 100%;
  background-color: #fff;
  position: relative;
`;
export default NotFound;
