import { useNavigate, useParams } from "react-router-dom";

import {
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import useFetch, { ACTIONS } from "../../../Hooks/useFetch";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Feature/store";
import { setLessons } from "../../../Feature/Course/LessonSlice";

import { Approval, ArrowForward, Quiz } from "@mui/icons-material";
import axios from "../../../Utils/axiosInstance";
import { useState } from "react";
import {
  setCurrentLessons,
  setNumberofLessons,
} from "../../../Feature/Course/CurrentLesson";
import Loading from "../../../Components/LoadingComponent/Loading";

function CourseDetail() {
  const { courseTitle } = useParams();
  const dispatch = useDispatch();

  const Courses = useSelector((state: RootState) => state.course.value).find(
    (course) => course.title === courseTitle
  );

  const user = useSelector((state: RootState) => state.user.value.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const data = useFetch({
    url: `/course/lessons/${Courses?.id}`,
    method: ACTIONS.GET_REQUEST,
    data: [],
  });

  if (data.data.data.length > 0) {
    dispatch(setNumberofLessons(data.data.data.length));
    dispatch(setLessons(data.data.data));
  }

  const handleEnroll = async () => {
    setIsLoading(true);
    dispatch(
      setCurrentLessons({
        courseId: Courses?.id,
        currentLesson: data.data.data[0].id,
      })
    );
    axios
      .post(`/course/save-user-lesson-data`, {
        courseId: Courses?.id,
        currentLesson: data.data.data[0].id,
        userId: user.id,
      })
      .then((res) => {
        setIsLoading(false);
        if (res.status == 200) {
          navigate(`/course/${courseTitle}/${data.data.data[0].id}`);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
    setIsLoading(false);
  };
  return (
    <Container>
      <Grid container spacing={2}>
        <GridWrap item xs={12} sm={12} md={12} lg={12}>
          <CourseHeader>
            <Typography variant="h1" sx={{ fontFamily: "Salsa", fontSize: 25 }}>
              {Courses?.title}
            </Typography>
          </CourseHeader>
        </GridWrap>

        <GridWrap item xs={12} sm={12} md={2} lg={2}></GridWrap>
        <GridWrap item xs={12} sm={12} md={8} lg={8}>
          <Typography
            variant="body1"
            sx={{ fontFamily: "sans-serif", fontSize: 20 }}
          >
            {Courses?.description}
          </Typography>
          <Grid container spacing={2}>
            <LessonsView>
              <Typography
                style={{
                  position: "absolute",
                  top: "0px",
                  left: 15,
                  margin: "10px",
                }}
              >
                Lessons Covered in this Course :
                <Divider />
              </Typography>
              {!data.loading && !data.error ? (
                data.data.data.map((item) => {
                  return (
                    <ScrollContainer>
                      <GridWrap item xs={12} sm={12} md={8} lg={8}>
                        <ArrowForward />
                      </GridWrap>
                      <GridWrap item xs={12} sm={12} md={8} lg={8}>
                        <Card
                          style={{
                            backgroundColor: "lightsteelblue",
                            color: "black",
                            fontWeight: "bold",
                            width: "200px",
                            height: "100%",
                            padding: "10px",
                            // boxShadow: "0px 0px 20px 10px grey",
                            zIndex: 999,
                          }}
                        >
                          <CardHeader
                            title={item.title}
                            titleTypographyProps={{ fontSize: 15 }}
                          />
                        </Card>
                      </GridWrap>
                    </ScrollContainer>
                  );
                })
              ) : (
                <GridWrap item xs={12} sm={12} md={12} lg={12}>
                  <Loading />
                </GridWrap>
              )}
            </LessonsView>
          </Grid>

          <Container>
            {!data.loading && data.data.data.length === 0 ? (
              <>Please check back letter Comming Soon</>
            ) : (
              <Button
                onClick={handleEnroll}
                style={{
                  backgroundColor: "greenyellow",
                  color: "blueviolet",
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  borderRadius: "15px",
                  width: "40%",
                }}
              >
                Start Learning
              </Button>
            )}
            <Paper sx={{ padding: "20px", margin: "10px" }}>
              <Typography
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Quiz />
                This Course also Contain some Quiz Questions
              </Typography>
            </Paper>
            <Paper sx={{ padding: "20px", margin: "10px" }}>
              <Typography
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Approval />
                You Will Recive a Completetion Certificate After Completing This
                Course
              </Typography>
            </Paper>
          </Container>
        </GridWrap>
        <GridWrap item xs={12} sm={12} md={12} lg={2}></GridWrap>
      </Grid>
    </Container>
  );
}
const ScrollContainer = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LessonsView = styled.div`
  padding-top: 50px;
  margin-bottom: 70px;
  margin-top: 50px;
  width: 100%;
  max-width: 90vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CourseHeader = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const GridContent = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const GridWrap = styled(Grid)`
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export default CourseDetail;
