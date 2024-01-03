import styled from "styled-components";
import { AdminMenuItems } from "../../Utils/AdminMenuItems";
import { Icon } from "@mui/material";

function SideNav() {
  return (
    <Container>
      {AdminMenuItems.map((item) => (
        <MenuItem>
          <Icon sx={{ padding: "10px" }} component={item.icon} />

          <h5>{item.title}</h5>
        </MenuItem>
      ))}
    </Container>
  );
}

const MenuItem = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: start;
  font-family: Georgia, "Times New Roman", Times, serif;
  border-bottom: 1px solid #042658;

  &:hover {
    background-color: blueviolet;
    color: black;
    cursor: pointer;
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #03132b;
  color: whitesmoke;
  position: sticky;
`;
export default SideNav;
