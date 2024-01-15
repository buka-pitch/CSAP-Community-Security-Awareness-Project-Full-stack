import { useParams } from "react-router-dom";
import useFetch, { ACTIONS } from "../../../Hooks/useFetch";
import { Document, pdfjs, Thumbnail, Outline, Page } from "react-pdf";

import { useEffect, useMemo, useState } from "react";
import axios from "../../../Utils/axiosInstance";
import Loading from "../../../Components/LoadingComponent/Loading";
import styled from "styled-components";
import { height, width } from "pdfkit/js/page";
import { useSelector } from "react-redux";
import { RootState } from "../../../Feature/store";

function Certificate() {
  const { courseTitle, lessonId } = useParams();
  const [pdfData, setPdfData] = useState(null);
  const [Data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user.value.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let data = {
          FullName: user.Name,
          CourseName: courseTitle,
        };
        let res = await fetch(
          "http://localhost:5000/course/lesson/certificate",
          {
            body: JSON.stringify(data),
            credentials: "include",
            mode: "cors",
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        const blob = await res.blob();
        //   const blob = new Blob(blobdata, { type: "application/pdf" });
        console.log(blob);
        setPdfData(blob);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const memoizedPdfBlob = useMemo(() => pdfData, [pdfData]);
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  return (
    <Container>
      {memoizedPdfBlob && !loading ? (
        <Document
          file={memoizedPdfBlob}
          renderMode="canvas"
          children={
            <>
              <Thumbnail pageNumber={1} loading={<Loading />} />
            </>
          }
        />
      ) : (
        <Loading />
      )}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default Certificate;
