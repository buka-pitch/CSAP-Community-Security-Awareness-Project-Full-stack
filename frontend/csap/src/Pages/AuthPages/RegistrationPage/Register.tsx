import styled, { keyframes } from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { RootState } from "../../../Feature/store";
import { useState } from "react";
import axios from "../../../Utils/axiosInstance";
import { CircularProgress, TextField } from "@mui/material";
import { Check, Email, Password, Person } from "@mui/icons-material";
const schema = yup
  .object({
    FirstName: yup.string().required("First Name is Required!"),
    LastName: yup.string().required("First Name is Required!"),
    // eslint-disable-next-line no-control-regex
    Email: yup
      .string()
      .required("Email is Required!")
      .matches(
        /^(?=.{1,256})(?=.{1,64}@.{1,255}$)[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        "Please use a valid Email!"
      ),
    Password: yup
      .string()
      .required("Password Required !")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message:
          "Password nust be at least one letter one number and one Charachter",
        excludeEmptyString: true,
      }),
    ConfirmPassword: yup
      .string()
      .required("Password Required !")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message:
          "Password nust be at least one letter one number and one Charachter",
        excludeEmptyString: true,
      }),
  })
  .required();

type FormInputs = {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
};
export const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  // const dispatcher = useDispatch();
  // const navigate = useNavigate();
  // const user = useSelector((state: RootState) => state.user.value);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true);
    setError("");
    axios
      .post("/auth/register", {
        Name: data.FirstName + " " + data.LastName,
        Email: data.Email,
        Password: data.Password,
      })
      .then(async (res) => {
        if (res.status === 201) {
          console.log("success", res.data);
          const sendOtp = await axios
            .get(
              `/auth/new-user-activation?userId=${res.data.data.id}&email=${res.data.data.Email}`
            )
            .then((resData) => {
              if (resData.status === 200 && resData.data.status === "Success") {
                setMessage(resData.data.message);
              }
            })
            .catch((error) => {
              setError(error.response.data.message);
            });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
        setLoading(false);
      });
  };
  return (
    <Container>
      <Card>
        <CardContent>
          <CardHeader>
            <h2>Signup CSAP Account</h2>
          </CardHeader>
          {message ? (
            <Message>{message}</Message>
          ) : (
            <Form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
              <FormWrapper>
                <FormFieldWrapper>
                  <Person />
                  <InputWrapper>
                    <TextField
                      sx={{
                        width: "100%",
                        height: "40px",
                        marginBottom: "30px",
                      }}
                      placeholder="First Name"
                      label="First Name"
                      type="text"
                      id="firstname"
                      {...register("FirstName", {
                        required: true,
                        maxLength: 50,
                        minLength: 5,
                      })}
                    />
                    {errors.FirstName && (
                      <Error>{errors.FirstName?.message}</Error>
                    )}
                  </InputWrapper>
                </FormFieldWrapper>
                <FormFieldWrapper>
                  <Person />
                  <InputWrapper>
                    <TextField
                      sx={{
                        width: "100%",
                        height: "40px",
                        marginBottom: "30px",
                      }}
                      placeholder="Last Name"
                      label="Last Name"
                      type="text"
                      id="lastname"
                      {...register("LastName", {
                        required: true,
                        maxLength: 50,
                        minLength: 5,
                      })}
                    />
                    {errors.LastName && (
                      <Error>{errors.LastName?.message}</Error>
                    )}
                  </InputWrapper>
                </FormFieldWrapper>
                <FormFieldWrapper>
                  <Email />
                  <InputWrapper>
                    {/* <label htmlFor="email">Email</label> */}

                    <TextField
                      sx={{
                        width: "100%",
                        height: "40px",
                        marginBottom: "30px",
                      }}
                      placeholder="Email"
                      label="Email"
                      type="email"
                      id="email"
                      {...register("Email", {
                        required: true,
                        maxLength: 50,
                        minLength: 5,
                      })}
                    />
                    {errors.Email && <Error>{errors.Email?.message}</Error>}
                  </InputWrapper>
                </FormFieldWrapper>
                <FormFieldWrapper>
                  <Password />
                  <InputWrapper>
                    {/* <label htmlFor="email">Email</label> */}
                    <TextField
                      sx={{
                        width: "100%",
                        height: "40px",
                        marginBottom: "30px",
                      }}
                      placeholder="Password"
                      label="Password"
                      type="password"
                      id="password"
                      {...register("Password", {
                        required: true,
                        maxLength: 50,
                        minLength: 5,
                      })}
                    />
                    {errors.Password && (
                      <Error>{errors.Password?.message}</Error>
                    )}
                  </InputWrapper>

                  <InputWrapper>
                    {/* <label htmlFor="email">Email</label> */}
                    <TextField
                      sx={{
                        width: "100%",
                        height: "40px",
                        marginBottom: "30px",
                      }}
                      placeholder="Confirm Password"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      {...register("ConfirmPassword", {
                        required: true,
                        maxLength: 50,
                        minLength: 5,
                      })}
                    />
                    {errors.ConfirmPassword && (
                      <Error>{errors.ConfirmPassword?.message}</Error>
                    )}
                  </InputWrapper>
                </FormFieldWrapper>
              </FormWrapper>
              <ErrMsg>{error && <Error>{error}</Error>}</ErrMsg>

              <InputWrapper>
                {loading ? (
                  <Greenbutton disabled onClick={handleSubmit(onSubmit)}>
                    <p>SignUp</p>
                    <CircularProgress />
                  </Greenbutton>
                ) : (
                  <Greenbutton type="submit" onClick={handleSubmit(onSubmit)}>
                    <p>SignUp</p>
                    {loading ? <CircularProgress /> : <Check />}
                  </Greenbutton>
                )}
              </InputWrapper>
            </Form>
          )}
        </CardContent>
        <CardCover></CardCover>
      </Card>
    </Container>
  );
};

const keyframe = keyframes`
 from {
  translate: 0px -600px ;
 }
 to {translate:0px}
`;
const Message = styled.div`
  width: 90%;
  height: 80%;
  align-self: center;
  background-color: blueviolet;
  padding: 10px;
  border-radius: 25px;
  animation: ${keyframe} 1s ease-in;
  color: white;
`;
const ErrMsg = styled.div`
  width: 70%;
`;
const FormFieldWrapper = styled.div`
  /* height: 100%; */
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 10px;
`;
const Greenbutton = styled.button`
  background-color: #00ff00;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: large;
  gap: 15px;
  width: 70%;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  /* background-color: violet; */
`;
const FormWrapper = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* background-colorred; */
`;
const Form = styled.form`
  width: 100%;
  min-height: 70%;
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
  flex: 2;

  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  background-color: #fff;
`;
