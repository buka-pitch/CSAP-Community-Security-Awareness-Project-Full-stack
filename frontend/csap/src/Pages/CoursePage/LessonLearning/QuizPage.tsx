import { Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import axios from "../../../Utils/axiosInstance";
import QuizBuilder from "./QuizBuilder";
import {
  BarChart,
  Book,
  Check,
  NineK,
  Quiz,
  Star,
  X,
} from "@mui/icons-material";
import { current } from "@reduxjs/toolkit";
import Loading from "../../../Components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../../../Feature/store";

function QuizPage() {
  const { courseTitle, lessonId, questionId } = useParams();
  const location = useLocation();
  const [question, setQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [current, setCurrent] = useState(0);
  const navigation = useNavigate();
  const user = useSelector((state: RootState) => state.user.value.user);

  useEffect(() => {
    setIsLoading(true);
    document.title = ` Quiz - ${courseTitle} CSAP`;
    setQuestion([]);
    axios
      .get(`/course/lesson/quiz/${lessonId}`)
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data.data);
          setQuestion(res.data.data);
        }
      })
      .catch((err) => {
        setError(err);
        redirect("/notfound");
      });
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleContinueBtn = (userAnswer: string) => {
    setIsLoading(true);
    axios
      .post("/course/lesson/quiz/" + lessonId + "/answer", {
        userId: user.id,
        questionId: question[current].id,
        answer: userAnswer,
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.correct === true) {
            setCorrectAnswers((prev) => prev + 1);

            const currentIndex = question.indexOf(
              question.find((item) => item.id === question[current].id)!
            );
            if (question.length - 1 !== currentIndex) {
              setCurrent((prev) => prev + 1);
              navigation(
                `/course/${courseTitle}/${lessonId}/quiz/${
                  question[current + 1]
                }`
              );
              setIsLoading(false);
            } else {
              navigation(`/course/${courseTitle}/${lessonId}/cert`, {
                replace: true,
              });
            }
          }
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setIsLoading(false);
      });

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
            <Quiz style={{ color: "blueviolet" }} />
            <Typography>Quiz</Typography>
          </RowWrapper>
          <Typography>
            Please complete the following Quiz questions based on what you
            learned previously.
          </Typography>
          <RowWrapper itemProp="flex-end">
            <BarChart />
            {current} / {question.length}
          </RowWrapper>{" "}
          <RowWrapper itemProp="flex-end">
            <Check />
            {correctAnswers} / {question.length}
          </RowWrapper>
        </Header>
        <Divider />
        {isLoading || question.length == 0 ? (
          <Loading />
        ) : (
          <QuestionBar>
            <QuestionText>{question[current]?.question}</QuestionText>
            <ChooseBox>
              {question[current]?.choice?.map((item, index) => {
                return (
                  <ChooseItem
                    key={item}
                    onClick={(e) => {
                      handleContinueBtn(e.currentTarget.innerText);
                    }}
                  >
                    {item}
                  </ChooseItem>
                );
              })}
            </ChooseBox>
          </QuestionBar>
        )}
      </Modal>
    </Container>
  );
}
const ChooseItem = styled.div`
  flex: 1;
  border: 1px solid blueviolet;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #fff;
    cursor: pointer;
  }
  &:active {
    border: 2px solid yellow;
  }
`;
const ChooseBox = styled.div`
  background-color: #d6d4d4;
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const QuestionText = styled.h1`
  padding: 10px;
  background-color: #fff;
  /* font-family: sans-serif; */
  font-weight: 300;
  text-align: center;
`;
const QuestionBar = styled.div`
  width: 80%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
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
  height: 100%;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
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

export default QuizPage;
