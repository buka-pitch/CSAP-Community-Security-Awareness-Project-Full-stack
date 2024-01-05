import { Location, RouteProps, useParams } from "react-router-dom";
import useFetch, { ACTIONS } from "../../Hooks/useFetch";
import { CircularProgress } from "@mui/material";
function CourseDetail({ match }: RouteProps) {
  const { courseTitle } = useParams();

  const couresinfo = useFetch({
    url: `/course/${courseTitle}`,
    method: ACTIONS.GET_REQUEST,
    data: [],
  });
  console.log(couresinfo.data.data.id);
  return (
    <div>
      {courseTitle}
      {couresinfo.data.data.id}
      {couresinfo.data.data.description}
      {couresinfo.loading && <CircularProgress />}
    </div>
  );
}

export default CourseDetail;
