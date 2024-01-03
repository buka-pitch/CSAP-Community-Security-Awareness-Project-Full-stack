import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import styled from "styled-components";

function AdminLayout() {
  return (
    <ContainerLayout>
      <SideNavigation>
        <SideNav />
      </SideNavigation>
      <OutletLayout>
        <Outlet />
      </OutletLayout>
    </ContainerLayout>
  );
}

const ContainerLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  color: black;
  /* gap: 20px; */
  /* justify-content: start; */
`;

const SideNavigation = styled.div`
  /* width: 200px; */
  flex: 1;
`;

const OutletLayout = styled.div`
  flex: 6;
`;
export default AdminLayout;
