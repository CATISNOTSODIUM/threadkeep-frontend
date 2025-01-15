import React, { useState } from "react";
import NavBar from "../components/common/nav-bar.tsx";
import { createUser } from "../api/users.ts";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  HStack
} from "@chakra-ui/react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
    setMessage("Pending ...")
    const userRequest = await createUser(username, password);
    if (userRequest.error) {
      setMessage(userRequest.error);
      return;
    }
    navigate("/signin");
  };
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-2">
      <div>
        <NavBar />
        <FormControl>
          <div className="font-bold text-3xl w-full text-center py-5">
            Register
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
          <FormHelperText>Password is optional</FormHelperText>
          <div className="text-red-500 max-w-64">
              {message}
          </div>
          <HStack className="mt-1">
              <Button className="w-full" colorScheme="teal" onClick={handleRegister}>
                Submit
              </Button>
              <Button className="w-full" colorScheme="pink" onClick={() => navigate('/signin')}>
                Go back
              </Button>
          </HStack>
          
        </FormControl>
      </div>
    </div>
  );
}
