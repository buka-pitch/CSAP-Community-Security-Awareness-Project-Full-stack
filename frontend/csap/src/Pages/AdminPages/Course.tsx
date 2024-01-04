import styled from "styled-components";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "Course",
    width: 150,
    editable: true,
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

const rows = [
  { id: 1, Course: "Snow", Lessons: 2 },
  { id: 2, Course: "Lannister", Lessons: 5 },
  { id: 3, Course: "Lannister", Lessons: 7 },
  { id: 4, Course: "Stark", Lessons: 3 },
  { id: 5, Course: "Targaryen", Lessons: 2 },
  { id: 6, Course: "Melisandre", Lessons: 1 },
  { id: 7, Course: "Clifford", Lessons: 2 },
  { id: 8, Course: "Frances", Lessons: 2 },
  { id: 9, Course: "Roxie", Lessons: 5 },
];

function Course() {
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
