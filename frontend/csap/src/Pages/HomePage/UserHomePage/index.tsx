import { Container } from "../../../../MainStyle";
import img from "../../../assets/tg.png";
import styled from "styled-components";
import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "../../../Utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../../../Feature/Course/CourseSlice";
import { RootState } from "../../../Feature/store";
import useFetch, { ACTIONS } from "../../../Hooks/useFetch";
// import { setCourses } from "../../../Feature/Course/CourseSlice";
function UserHomePage() {
  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.course);
  const courseData = useFetch({
    url: "/course/featured",
    data: [],
    method: ACTIONS.GET_REQUEST,
  });
  if (courseData.error) alert(courseData.error);
  if (!courseData.error && !courseData.loading) {
    const data = courseData.data?.data;
    console.log(data);
    dispatch(setCourses(courseData.data?.data));
  }

  return (
    <Container>
      <HotStory>Security Comes First Start Learning now!</HotStory>
      <ContainerHeader>
        <Typography
          sx={{
            color: "GrayText",
            height: "20px",
            position: "absolute",
            top: "10px",
            left: "30px",
          }}
        >
          Featured Courses
        </Typography>
        {courses &&
          courses.value.map((item) => (
            <Navlinks to={"/course/" + item.title} key={item.title}>
              <HCard>
                <CardMedia content={item.title} image={img} />
                <HCardHeader title={item.title} />
                {/* <p>{item.description}</p> */}
                <CardAction itemProp={item.title} LinkComponent={NavLink}>
                  <h3>Enroll Now!</h3>
                </CardAction>
              </HCard>
            </Navlinks>
          ))}
        {courseData.loading && <CircularProgress />}
      </ContainerHeader>
    </Container>
  );
}
const CardAction = styled(CardActionArea)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  color: GrayText;
`;
const Navlinks = styled(NavLink)`
  text-decoration: none;
  color: white;
`;
const ContainerHeader = styled.div`
  display: flex;
  align-self: start;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  border-radius: 25px;
  gap: 20px;
  overflow: hidden;
  background-color: #f7f6f6;
  position: relative;
`;

const HCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  border-radius: 20px 20px 0px 0px;
  box-shadow: 0px 5px 20px 1px blueviolet;
`;
const HCardHeader = styled(CardHeader)`
  height: 60%;
  width: 80%;
  color: white;
  text-align: center;
  background-color: black;
  /* border-radius: 25px; */
`;
const HotStory = styled.div`
  background-color: yellow;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;
export default UserHomePage;
