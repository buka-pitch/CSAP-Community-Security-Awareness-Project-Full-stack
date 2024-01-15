import styled from "styled-components";
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import useFetch, { ACTIONS } from "../../Hooks/useFetch";
import { RootState } from "../../Feature/store";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { PieChart } from "@mui/x-charts";
import { useState } from "react";

function CoursePage() {
  const courses = useSelector((state: RootState) => state.course.value);
  const [lessons, setLessons] = useState([{}]);

  return (
    <MainContainer>
      <LessonHeader>
        <Card sx={{ width: "90%", height: "90%" }}>
          <CardHeader
            title="Current Lessons"
            titleTypographyProps={{ fontSize: "small" }}
          />
          <CardContent>
            <CoursesContainer itemProp="row">
              <Divider />
              {courses &&
                courses.map((item) => {
                  return (
                    <Navlinks itemProp="row" to={`/course/${item.title}`}>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <Card sx={{ width: "100%" }}>
                          <CardHeader
                            titleTypographyProps={{ fontSize: "small" }}
                            title={item?.title}
                            sx={{
                              bgcolor: "blueviolet",
                              color: "white",
                              minHeight: "100%",
                            }}
                          />
                        </Card>
                      </Grid>
                    </Navlinks>
                  );
                })}
            </CoursesContainer>
          </CardContent>
        </Card>
      </LessonHeader>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={10}>
          <Container>
            <CoursesContainer>
              <Typography>Courses</Typography>
              {courses &&
                courses.map((item) => {
                  return (
                    <Navlinks to={`/course/${item.title}`}>
                      <Card sx={{ width: "80%" }}>
                        <CardHeader
                          titleTypographyProps={{ fontSize: "small" }}
                          title={item?.title}
                          sx={{ bgcolor: "blueviolet", color: "white" }}
                        />
                        <CardContent>{item.description}</CardContent>
                      </Card>
                    </Navlinks>
                  );
                })}
              {courses &&
                courses.map((item) => {
                  return (
                    <Navlinks to={`/course/${item.title}`}>
                      <Card sx={{ width: "80%" }}>
                        <CardHeader
                          titleTypographyProps={{ fontSize: "small" }}
                          title={item?.title}
                          sx={{ bgcolor: "blueviolet", color: "white" }}
                        />
                        <Article>{item.description}</Article>
                      </Card>
                    </Navlinks>
                  );
                })}
              <Pagination defaultPage={1}></Pagination>
              {/* {courseUpdate.loading && <CircularProgress />} */}
            </CoursesContainer>
          </Container>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={6}>
          <ChallengeContainer>
            <Typography>Challenges</Typography>
          </ChallengeContainer>
        </Grid>
      </Grid>
    </MainContainer>
  );
}
const Navlinks = styled(NavLink)`
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    translate: 10px -10px;
  }
`;
const Article = styled(CardContent)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LessonHeader = styled.div`
  width: 100%;
  min-height: 300px;
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  /* width: 100%; */
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-size: small;
  padding: 10px;
  /* padding: 10px 10px; */
`;
const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;

  /* font-size: small; */
  /* padding: 10px 10px; */
`;

const CoursesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${(props) => props.itemProp || "column"};
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #fff;
  position: relative;
`;
const ChallengeContainer = styled.aside`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
export default CoursePage;
