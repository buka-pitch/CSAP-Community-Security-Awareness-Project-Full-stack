import { CardMedia, CircularProgress, Typography } from "@mui/material";
import img from "../../../assets/tg.png";

import {
  CardAction,
  ContainerHeader,
  HCard,
  HCardHeader,
  Navlinks,
} from "./Styles";
import { NavLink } from "react-router-dom";
import { CourseState } from "../../../Feature/Course/CourseSlice";
import { FetchState } from "../../../Hooks/useFetch";
import { Container } from "../../../../MainStyle";

type props = {
  courses: CourseState;
  courseData: FetchState;
};
function CourseHeader({ courses, courseData }: props) {
  return (
    <Container>
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
        {courses.value.length > 0 &&
          courses.value.map((item) => (
            <Navlinks to={"/course/" + item.title} key={item.title}>
              <HCard>
                <CardMedia
                  sx={{ height: "100%", width: "100%" }}
                  image={img}
                  children={
                    <HCardHeader
                      sx={{ color: "blueviolet" }}
                      title={item.title}
                    />
                  }
                />
                {/* <p>{item.description}</p> */}
              </HCard>
            </Navlinks>
          ))}
        {courses.value.length === 0 && courseData.loading && (
          <CircularProgress />
        )}
      </ContainerHeader>
    </Container>
  );
}

export default CourseHeader;
