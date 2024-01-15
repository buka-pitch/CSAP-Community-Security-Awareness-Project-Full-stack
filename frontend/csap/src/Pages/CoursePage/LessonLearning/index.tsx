import { Divider, IconButton, Skeleton, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../../Feature/store";
import { setCurrentLessons } from "../../../Feature/Course/CurrentLesson";
import axios from "../../../Utils/axiosInstance";
import { useEffect, useState } from "react";
import useFetch, { ACTIONS } from "../../../Hooks/useFetch";
import { LessonState } from "../../../Feature/Course/LessonSlice";
import { useSelector } from "react-redux";
import { ArrowCircleRight, Book, History, Star } from "@mui/icons-material";
import Loading from "../../../Components/LoadingComponent/Loading";
import QuizPage from "./QuizPage";

function LessonPage() {
  const { lessonId, courseTitle } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const user: string = useSelector(
    (state: RootState) => state.user.value.user.id
  );
  const [lessonData, setLessonData] = useState<LessonState>();
  const [error, setError] = useState("");
  const lessons = useSelector((state: RootState) => state.lesson.value);
  const navigation = useNavigate();
  const location = useLocation();
  const quiz = useFetch({
    url: "/course/lesson/quiz/" + lessonId + "/first",
    data: [],
    method: ACTIONS.GET_REQUEST,
  });
  // const dispatch = useDispatch();
  // const currentLesson = useSelector(
  //   (state: RootState) => state.currentLesson.value
  // );
  let CreatedDate;

  useEffect(() => {
    setLessonData({});
    axios
      .get(`/course/lesson/${lessonId}`)
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data.data);
          setLessonData(res.data.data);
          document.title = `${lessonData?.title} - ${courseTitle} - CSAP`;
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, [location]);

  CreatedDate = new Date(lessonData?.createdAt).toDateString();

  const handleContinueBtn = () => {
    setIsLoading(false);
    const currentIndex = lessons.indexOf(
      lessons.find((item) => item.id === lessonId)!
    );
    if (lessons.length - 1 !== currentIndex) {
      navigation(`/course/${courseTitle}/${lessons[currentIndex + 1].id}`, {});
    } else {
      navigation(
        `/course/${courseTitle}/${lessonId}/quiz/${quiz.data.data.id}`
      );
    }
    setIsLoading(false);
  };
  return (
    <Container>
      <Modal>
        <Header>
          <RowWrapper itemProp="flex-start">
            <Star style={{ color: "gold" }} />
            <p>{courseTitle}</p>
            <Divider />
          </RowWrapper>

          <RowWrapper itemProp="flex-start">
            <Book style={{ color: "blueviolet" }} />
            <Typography variant="body1">
              {lessonData?.createdAt ? (
                CreatedDate
              ) : (
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "100%", height: "100%" }}
                />
              )}
            </Typography>
          </RowWrapper>
          <RowWrapper itemProp="flex-start">
            <History style={{ color: "blueviolet" }} />

            <Typography variant="body1">
              {lessons.length ? (
                `${lessons.indexOf(
                  lessons.find((item) => item.id === lessonId)!
                )} / ${lessons.length}`
              ) : (
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "100%", height: "100%" }}
                />
              )}
            </Typography>
          </RowWrapper>
          {lessonData?.title ? (
            <CenterText>{lessonData.title}</CenterText>
          ) : (
            <Skeleton variant="rectangular" width={100} height={100} />
          )}
        </Header>
        <Divider />
        {lessonData?.description ? (
          <ArticleWrapper>{lessonData?.description}</ArticleWrapper>
        ) : (
          <Loading />
        )}
        <NavigationButtons>
          <IconButton
            onClick={handleContinueBtn}
            title="Next"
            style={{ color: "greenyellow", backgroundColor: "blueviolet" }}
          >
            <Typography>Continue</Typography>
            <ArrowCircleRight
              style={{ height: "50px", width: "50px", color: "greeyellow" }}
            />
          </IconButton>
        </NavigationButtons>
      </Modal>
    </Container>
  );
}

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: ${(props) => props.itemProp};
  padding-left: 20px;
  padding-right: 20px;
  gap: 5px;
`;
const CenterText = styled(Typography)`
  display: flex;
  align-items: center;
  justify-items: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: large;
`;
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
  /* max-width: 70vw; */
  height: 100%;
  background-color: #fff;
  position: relative;
`;
const ArticleWrapper = styled.article`
  width: 100%;
  max-width: 80vw;
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: start;
  justify-content: center;
  font-size: large;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;
const Header = styled.div`
  top: 0px;
  width: 100%;
  height: 100px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const NavigationButtons = styled.div`
  position: absolute;
  bottom: 90px;
  right: 0px;
  padding: 50px;
  /* background-color: green; */
  /* width: 100%; */
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export default LessonPage;
