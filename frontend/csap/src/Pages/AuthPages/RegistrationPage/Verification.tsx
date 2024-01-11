import { useLocation, useParams } from "react-router-dom";
import useFetch, { ACTIONS } from "../../../Hooks/useFetch";
import { CircularProgress } from "@mui/material";

function EmailVerification() {
  const { otp } = useParams();
  const location = useLocation();
  const token = otp + location.hash;
  const verify = useFetch({
    url: `/auth/new-user-activation/otp/${token}`,
    data: [],
    method: ACTIONS.GET_REQUEST,
  });

  return (
    <div>
      Verification {otp}
      {token}
      <p>
        {verify.loading && <CircularProgress />}
        {verify.data.message}
      </p>
    </div>
  );
}

export default EmailVerification;
