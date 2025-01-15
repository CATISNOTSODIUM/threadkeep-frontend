import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/common/nav-bar.tsx";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/auth/authApiSlice.ts";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/auth/authSlice.ts";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setMessage("");
  }, [username, password]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setMessage("Pending ...")
    try {
      const name = username;
      if (name === "") {
        setMessage("Missing Username");
        return;
      }
      const userData = await login({ name, password }).unwrap();
      dispatch(setCredentials({ ...userData.payload }));
      setUsername("");
      setPassword("");
      navigate("/threads");
    } catch (error) {
      if (!error?.response) {
        setMessage("Cannot connect to server");
      } else if (error.response?.status === 400) {
        setMessage("Invalid request");
      } else if (error.response?.status === 401) {
        setMessage("Unauthorized");
      } else {
        setMessage("Login Failed");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-2">
      <div>
        <NavBar />
        <FormControl>
          <div className="font-bold text-3xl w-full text-center py-5">
            Sign In
          </div>
          <FormLabel>Username</FormLabel>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (Optional)"
          />
          <div className="text-red-500 max-w-64">
              {message}
          </div>
          <FormHelperText>
            <div className="text-gray-600">
              Haven't registered? You can registered{" "}
              <span
                className="font-bold cursor-pointer"
                onClick={() => navigate("/register")}
              >
                here
              </span>
              .
            </div>
          </FormHelperText>
          
          <Button className="w-full my-5" colorScheme="teal"  onClick={handleSignIn}>
            Submit
          </Button>
        </FormControl>
      </div>
    </div>
  );
}
