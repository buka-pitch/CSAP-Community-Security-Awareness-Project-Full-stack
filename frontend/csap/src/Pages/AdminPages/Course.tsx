import styled from "styled-components";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { RootState } from "../../Feature/store";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "Course",
    width: 150,
    editable: true,
  },

  {
    field: "Description",

    width: 150,
  },
  {
    field: "Lessons",
    type: "number",
    width: 100,
  },
  {
    field: "Actions",
    description: "Edit or Manage a Course",
    sortable: false,
    width: 160,
  },
];
type ROW = {
  id: number;
  Course: string;
  Description: string;
  Lessons: number;
}[];
const rows: ROW = [];

function Course() {
  const course = useSelector((state: RootState) => state.course.value);
  course.forEach((i, index) => {
    return rows.push({
      id: index,
      Course: i.title,
      Description: i.description,
      Lessons: 0,
    });
  });
  return (
    <Container>
      <CourseHeader>CSAP Security Courses</CourseHeader>
      <div></div>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const CourseHeader = styled.div`
  display: flex;
  align-self: start;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  background-color: #fff;
`;
export default Course;
