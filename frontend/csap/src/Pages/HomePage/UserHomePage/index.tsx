import { Container } from "../../../../MainStyle";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../../../Feature/Course/CourseSlice";
import { RootState } from "../../../Feature/store";
import useFetch, { ACTIONS, FetchState } from "../../../Hooks/useFetch";
import { HotStory } from "./Styles";
import CourseHeader from "./CourseHeader";
import { Typography } from "@mui/material";

function UserHomePage() {
  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.course);
  const courseData: FetchState = useFetch({
    url: "/course/featured",
    data: [],
    method: ACTIONS.GET_REQUEST,
  });

  if (!courseData.error && !courseData.loading) {
    dispatch(setCourses(courseData.data?.data));
  }

  return (
    <Container>
      <HotStory>
        <Typography>Security Comes First Start Learning now!</Typography>
      </HotStory>
      <CourseHeader courses={courses} courseData={courseData} />
    </Container>
  );
}

export default UserHomePage;
