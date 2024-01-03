import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  TextField,
} from "@mui/material";
import { Container } from "../../Components/HeaderBanner";
import {
  AddBox,
  AddCircle,
  AddPhotoAlternate,
  DragHandle,
  DragIndicator,
  FileOpen,
  ScannerOutlined,
} from "@mui/icons-material";
import styled from "styled-components";
import axios from "../../Utils/axiosInstance";
import { SubmitHandler, useForm } from "react-hook-form";
import { DragEvent, useState } from "react";

type FormInputs = {
  url: string;
};

function Scanner() {
  const [files, setFiles] = useState<FileList>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data.url);
    // const response = await axios
    // .post(
    //   "/auth/login",
    //   {
    //     url: data.url,
    //   },
    //   { withCredentials: true }
    // )
    // .then((res) => {})
    // .catch((err) => {});
  };
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Card sx={{ width: "40%", margin: "20px" }}>
        <CardHeader title="Scan Url" />
        <CardContent
          children={
            <>
              <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  placeholder="Url"
                  type="url"
                  label="Url"
                  id="Url"
                  sx={{ width: "100%" }}
                  {...register("url")}
                />
              </form>
              {errors.url && <p>{errors.url?.message}</p>}
            </>
          }
        />
      </Card>
      <Card sx={{ width: "40%", margin: "20px" }}>
        <CardHeader title=" Scan File" />
        <CardContent
          children={
            <>
              <Box
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files.length > 0)
                    setFiles(e.dataTransfer.files);
                  console.log(e.dataTransfer.files);
                }}
                sx={{
                  width: "100%",
                  height: "100px",
                  bgcolor: "#d1d1d1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton>
                  <AddCircle sx={{ color: "blueviolet" }} />
                </IconButton>
              </Box>
            </>
          }
        />
      </Card>{" "}
      <Row>
        <h2>{files && files[0]?.name}</h2>
        <h2>{files && files[0]?.type}</h2>
        <h2>{files && files[0]?.lastModified}</h2>
      </Row>
    </Box>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: column;
`;
export default Scanner;
