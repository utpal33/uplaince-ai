import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { Box, Button, Typography, Avatar } from "@mui/material";
import Counter from "./Counter";
import UserForm from "./UserForm";
import RichTextEditor from "./RichTextEditor";



const Auth: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSuccess = (credentialResponse: any) => {
    const { credential } = credentialResponse;
    const userObject = JSON.parse(atob(credential.split(".")[1]));
    setUser(userObject);
    localStorage.setItem("userProfile", JSON.stringify(userObject));
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("userProfile");
  };

  return (
    <GoogleOAuthProvider clientId='188049901225-tr6pd30i991u9acdttaogd96dp0uqmo5.apps.googleusercontent.com'>
      <Box sx={{ textAlign: "center", padding: 3 }}>
        {user ? (
          <>
            {/* Show User Info */}
            <Avatar src={user.picture} alt={user.name} sx={{ width: 80, height: 80, margin: "auto" }} />
            <Typography variant="h5" sx={{ mt: 1 }}>
              Welcome, {user.name}!
            </Typography>
            <Typography variant="body1">{user.email}</Typography>
            <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleLogout}>
              Logout
            </Button>

            
            <Counter />
            <UserForm />
            <RichTextEditor />
          </>
        ) : (
          <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login Failed")} />
        )}
      </Box>
    </GoogleOAuthProvider>
  );
};

export default Auth;

