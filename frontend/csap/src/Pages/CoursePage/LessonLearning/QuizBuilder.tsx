import { Typography } from "@mui/material";
import styled from "styled-components";

type props = {
  questions: {
    answer: string;
    choice: string[];
    createdAt: Date;
    id: string;
    img: string;

    lastSeen: Date;
    lessonId: string;
    question: string;
  }[];
};

function QuizBuilder({ questions }: props) {
  return <Container></Container>;
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
export default QuizBuilder;
