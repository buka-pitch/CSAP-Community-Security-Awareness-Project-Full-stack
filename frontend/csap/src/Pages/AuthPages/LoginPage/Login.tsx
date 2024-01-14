import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setUser } from "../../../Feature/User/UserSlice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../../Feature/store";
import { useEffect, useState } from "react";
import axios from "../../../Utils/axiosInstance";
import { CircularProgress, TextField } from "@mui/material";
const schema = yup.object({
  // eslint-disable-next-line no-control-regex
  email: yup
    .string()
    .required("Email is Required!")
    .matches(
      /^(?=.{1,256})(?=.{1,64}@.{1,255}$)[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Please use a valid Email!"
    ),
  password: yup
    .string()
    .required("Password Required !")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message:
        "Password must be at least one letter one number and one Charachter, No Space",
    }),
});

type FormInputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.value);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);
    setError("");
    const response = await axios
      .post(
        "/auth/login",
        {
          username: data.email,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data?.id) {
          console.log(res.data.data);
          console.log(res);
          dispatcher(setUser(res.data));
          dispatcher(setIsAuthenticated(true));
          setIsLoading(false);

          navigate(from, { replace: true });
        }
      })

      .catch((err) => {
        console.log(err);
        // err.response.message && setError(err.response.message);
        // setError(err.response.data.message);
        // setIsLoading(false);
        setError(err.message);
        return err;
      });
    setIsLoading(false);
    console.log(response);
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <CardHeader>
            <h2>Login</h2>
          </CardHeader>
          <Form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
            <FormWrapper>
              <InputWrapper>
                {/* <label htmlFor="email">Email</label> */}
                <TextField
                  sx={{ width: "100%", height: "40px", marginBottom: "30px" }}
                  placeholder="Email"
                  label="Email"
                  type="email"
                  id="email"
                  {...register("email", {
                    required: true,
                    maxLength: 50,
                    minLength: 5,
                  })}
                />

                {errors.email && <Error>{errors.email?.message}</Error>}
              </InputWrapper>

              <InputWrapper>
                {/* <label htmlFor="password">Password</label> */}
                <TextField
                  sx={{ width: "100%", height: "40px", marginBottom: "30px" }}
                  placeholder="Password"
                  label="Password"
                  type="password"
                  id="password"
                  {...register("password")}
                />
                {/* <TextInput
                  type="password"
                  id="password"
                  {...register("password")}
                /> */}
                {errors.password && <Error>{errors.password?.message}</Error>}
              </InputWrapper>
              <InputWrapper>
                {!isLoading ? (
                  <Greenbutton type="submit">Login</Greenbutton>
                ) : (
                  <Greenbutton type="submit">
                    <CircularProgress
                      sx={{ height: "50%", width: "50%", color: "blueviolet" }}
                    />
                  </Greenbutton>
                )}
                {error && <Error>{error}</Error>}
              </InputWrapper>
            </FormWrapper>
            <InputWrapper>
              <FormWrapper>
                <span>
                  Have an account ? Register{" "}
                  <NavLink to="/register">HERE</NavLink>
                </span>{" "}
                <span>
                  Forget Password
                  <NavLink to="/reset"> HERE</NavLink>
                </span>
              </FormWrapper>
            </InputWrapper>
          </Form>
        </CardContent>
        <CardCover></CardCover>
      </Card>
    </Container>
  );
};

const Greenbutton = styled.button`
  background-color: #00ff00;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 20px;
  box-shadow: 10px 5px 5px 5px blanchedalmond;
  &:hover {
    box-shadow: 10px 5px 5px 0px blanchedalmond;
    cursor: pointer;
  }
`;
const Error = styled.p`
  width: 90%;
  color: red;
  border: 1px solid red;
  padding: 10px;
`;

const InputWrapper = styled.div`
  /* height: 100px; */
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: start;
  justify-content: center;
  /* background-color: violet; */
`;
const FormWrapper = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* background-colorred; */
`;
const Form = styled.form`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CardHeader = styled.div`
  height: 60px;
  width: 100%;

  font-family: Georgia, "Times New Roman", Times, serif;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: blueviolet;
  color: white;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 999;
`;

const Card = styled.div`
  width: 70%;
  height: 80%;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  overflow: hidden;

  /* justify-content: center;
  align-items: center; */
`;

const CardCover = styled.div`
  flex: 1;
  /* width: 50%;
  height: 100%; */
  display: flex;

  background-image: url("https://online.king.edu/wp-content/uploads/2018/09/Social-Media-Security.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  /* background-blend-mode: darken; */
`;

const CardContent = styled.div`
  flex: 1;

  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  background-color: #fff;
`;
