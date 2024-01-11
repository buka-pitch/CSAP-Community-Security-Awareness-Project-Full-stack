import {
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../../Feature/store";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../Hooks/useFetch";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  ArrowCircleRightOutlined,
  Book,
} from "@mui/icons-material";
import { setCurrentLessons } from "../../../Feature/Course/CurrentLesson";
import axios from "../../../Utils/axiosInstance";
import { useEffect, useState } from "react";

function LessonPage() {
  const { lessonTitle } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const user: string = useSelector(
    (state: RootState) => state.user.value.user.id
  );
  const lessons = useSelector((state: RootState) => state.lesson.value);
  const dispatch = useDispatch();
  const currentLesson = useSelector(
    (state: RootState) => state.currentLesson.value
  );
  let Current = lessons.indexOf(
    lessons.find((item) => item.id === currentLesson.currentLesson)!
  );

  const lesson = lessons[Current];
  // alert(Current);
  // alert(lessons.length);
  let next = 1;
  if (lessons.length - 1 > Current) {
    Current += 1;
  } else {
    setIsCompleted(true);
  }
  const handleContinueBtn = () => {
    setIsLoading(false);

    dispatch(
      setCurrentLessons({
        courseId: lessons[Current]?.courseId,
        currentLesson: lessons[Current]?.id,
      })
    );
    axios.post(`/course/save-user-lesson-data`, {
      courseId: lessons[Current]?.courseId,
      currentLesson: lessons[Current]?.id,
      userId: user,
    });

    setIsLoading(false);
  };
  return (
    <Container>
      {isCompleted ? (
        <>Completed</>
      ) : (
        <Modal>
          <Header>
            <CenterText>{lesson.title}</CenterText>
            <RowWrapper itemProp="flex-end">
              <Book style={{ color: "blueviolet" }} />
              <Typography variant="body1">{lesson.createdAt}</Typography>
            </RowWrapper>
          </Header>
          <Divider />

          <ArticleWrapper>{lesson?.description}</ArticleWrapper>
          <NavigationButtons>
            {!isCompleted ? (
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
            ) : (
              <></>
            )}
          </NavigationButtons>
        </Modal>
      )}
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
`;

const Modal = styled.div`
  width: 90%;
  height: 100%;
  background-color: #fff;
  position: relative;
`;
const ArticleWrapper = styled.article`
  width: 80%;
  height: 100%;
  padding: 40px;
  display: flex;
  align-items: start;
  justify-content: start;
`;
const Header = styled.div`
  top: 0px;
  width: 100%;
  height: 100px;
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
