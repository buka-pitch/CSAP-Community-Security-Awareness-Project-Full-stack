import { Box, Divider, Grid, colors } from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import styled from "styled-components";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useEffect } from "react";
import api from "../../Utils/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../../Feature/store";
import { setUserCount } from "../../Feature/Admin/AdminStatsSlice";
import { CircleOutlined, CircleRounded, History } from "@mui/icons-material";
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function Dashboard() {
  const dashboardStats = useSelector(
    (state: RootState) => state.admin.value.usersCount
  );
  useEffect(() => {
    const getUserstats = async () => {
      const res = await api.get("/admin");
      const data = await res.data;

      if ((await res.status) === 200) {
        console.log(data);
        // setUserCount(data.)
      }
    };
    getUserstats();
  }, []);
  return (
    <Container>
      <p>Dashboard</p>
      {/* </StatsWrapper> */}
      <StatsWrapper>
        <Grid container spacing={1}>
          <Grid item xs>
            <StatsWrapper>
              <StatsCard>
                <CardWrapper>
                  <CardHeader>
                    <p>users +</p>
                  </CardHeader>
                  <CardContent>
                    <StatusCircle>
                      <CircleOutlined
                        sx={{
                          // position: "",
                          color: "blueviolet",
                          height: "50px",
                          width: "100px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 90,
                        }}
                      ></CircleOutlined>
                      <StatusNumber>5</StatusNumber>
                    </StatusCircle>
                  </CardContent>
                </CardWrapper>
              </StatsCard>
            </StatsWrapper>
          </Grid>

          <Grid item xs>
            <StatsWrapper>
              <StatsCard>
                <CardWrapper>
                  <CardHeader>
                    <p>users +</p>
                  </CardHeader>
                  <CardContent>
                    <StatusCircle>
                      <CircleOutlined
                        sx={{
                          // position: "",
                          color: "blueviolet",
                          height: "50px",
                          width: "100px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 90,
                        }}
                      ></CircleOutlined>
                      <StatusNumber>5</StatusNumber>
                    </StatusCircle>
                  </CardContent>
                </CardWrapper>
              </StatsCard>
            </StatsWrapper>
          </Grid>
          <Grid item xs>
            <StatsWrapper>
              <StatsCard>
                <CardWrapper>
                  <CardHeader>
                    <p>users +</p>
                  </CardHeader>
                  <CardContent>
                    <StatusCircle>
                      <CircleOutlined
                        sx={{
                          // position: "",
                          color: "blueviolet",
                          height: "50px",
                          width: "100px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 90,
                        }}
                      ></CircleOutlined>
                      <StatusNumber>5</StatusNumber>
                    </StatusCircle>
                  </CardContent>
                </CardWrapper>
              </StatsCard>
            </StatsWrapper>
          </Grid>
          <Grid item xs>
            <StatsWrapper>
              <StatsCard>
                <CardWrapper>
                  <CardHeader>
                    <p>users +</p>
                  </CardHeader>
                  <CardContent>
                    <StatusCircle>
                      <CircleOutlined
                        sx={{
                          // position: "",
                          color: "blueviolet",
                          height: "50px",
                          width: "100px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 90,
                        }}
                      ></CircleOutlined>
                      <StatusNumber>5</StatusNumber>
                    </StatusCircle>
                  </CardContent>
                </CardWrapper>
              </StatsCard>
            </StatsWrapper>
          </Grid>
          <Grid item xs>
            <StatsWrapper>
              <StatsCard>
                <CardWrapper>
                  <CardHeader>
                    <p>users +</p>
                  </CardHeader>
                  <CardContent>
                    <StatusCircle>
                      <CircleOutlined
                        sx={{
                          // position: "",
                          color: "blueviolet",
                          height: "50px",
                          width: "100px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 90,
                        }}
                      ></CircleOutlined>
                      <StatusNumber>5</StatusNumber>
                    </StatusCircle>
                  </CardContent>
                </CardWrapper>
              </StatsCard>
            </StatsWrapper>
          </Grid>
          <Grid item xs>
            <StatsWrapper>
              <StatsCard>
                <CardWrapper>
                  <CardHeader>
                    <p>users +</p>
                  </CardHeader>
                  <CardContent>
                    <StatusCircle>
                      <CircleOutlined
                        sx={{
                          // position: "",
                          color: "blueviolet",
                          height: "50px",
                          width: "100px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 90,
                        }}
                      ></CircleOutlined>
                      <StatusNumber>5</StatusNumber>
                    </StatusCircle>
                  </CardContent>
                </CardWrapper>
              </StatsCard>
            </StatsWrapper>
          </Grid>
        </Grid>
      </StatsWrapper>
      <StatsWrapper>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <ChartWrapper>
              <p>Course Completed By Users</p>
              <Divider />
              <PieChart
                title="Users"
                colors={["orange", "cyan", "purple"]} // Use palette
                height={150}
                series={[
                  {
                    data: [
                      { value: 4, color: "orange", label: "Completed" },
                      { value: 10, color: "cyan", label: "Enrolled" },
                      { value: 1, color: "purple", label: "Not Active" }, // Use color property
                      // ...
                    ],
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                    arcLabel: "value",
                  },
                ]}
              >
                <>okey</>
              </PieChart>
            </ChartWrapper>
          </Grid>
          <Grid item xs>
            <ChartWrapper></ChartWrapper>
          </Grid>
          <Grid item xs={4}>
            <ChartWrapper>
              <p>Activity</p>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["group A", "group B", "group C"],
                  },
                ]}
                series={[
                  { data: [4, 3, 5], label: "Challenge" },
                  { data: [1, 6, 3], label: "Files" },
                  { data: [2, 5, 6], label: "Urls" },
                ]}
                width={500}
                height={300}
              />
            </ChartWrapper>
          </Grid>
        </Grid>
      </StatsWrapper>
      <StatsWrapper>
        <Grid container spacing={3}>
          <Grid item xs>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Grid>
          <Grid item xs>
            <CardHeader>
              <p>Admin History</p>
            </CardHeader>

            <GridContainer itemProp="transparent">
              <StatsCard itemProp="100%">
                <StatsWrapper>
                  <History />
                  <CardContent>Buka Added a new Courses</CardContent>
                </StatsWrapper>
              </StatsCard>{" "}
              <StatsCard itemProp="100%">
                <StatsWrapper>
                  <History />
                  <CardContent>Buka Added a new Courses</CardContent>
                </StatsWrapper>
              </StatsCard>{" "}
              <StatsCard itemProp="100%">
                <StatsWrapper>
                  <History />
                  <CardContent>Buka Added a new Courses</CardContent>
                </StatsWrapper>
              </StatsCard>{" "}
              <StatsCard itemProp="100%">
                <StatsWrapper>
                  <History />
                  <CardContent>Buka Added a new Courses</CardContent>
                </StatsWrapper>
              </StatsCard>
            </GridContainer>
          </Grid>
        </Grid>
      </StatsWrapper>{" "}
    </Container>
  );
}

const GridContainer = styled.div`
  width: 100%;

  min-height: 200px;
  height: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.itemProp || "white"};
  /* padding: 20px; */
  /* margin: 10px; */
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* padding: 20px; */
  gap: 10px;
  overflow: scroll;
`;

const StatsWrapper = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ChartWrapper = styled.div`
  width: 100%;

  min-height: 200px;
  height: 100px;

  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const StatsCard = styled(Box)`
  width: ${(props) => props.itemProp || "150px"};
  height: 70px;
  background-color: white;
  /* border-radius: 20px; */
  margin-top: 10px;
`;

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CardHeader = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusCircle = styled.div`
  /* position: relative; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusNumber = styled.div`
  position: absolute;
  color: blueviolet;
  z-index: 100;
  font-size: large;
  font-weight: bold;
`;
export default Dashboard;
