import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { saveUser } from "../store/Store";
// import { RootState } from "../store/Store";

const UserForm: React.FC = () => {
  const dispatch = useDispatch();
  // const existingUsers = useSelector((state: RootState) => state.user); 
  const [userDetails, setUserDetails] = useState({
    id: "",
    fullName: "",
    homeAddress: "",
    emailAddress: "",
    phoneNumber: "",
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes!";
      }
    };
    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [hasUnsavedChanges]);

  const createUniqueUserId = () => `USER-${Math.floor(Math.random() * 100000)}`;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
    setHasUnsavedChanges(true);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("userList") || "[]");

    // check exsisting users
    if (storedUsers.some((user: any) => user.emailAddress === userDetails.emailAddress)) {
      setNotificationMessage("This email is already registered!");
      setShowNotification(true);
      return;
    }

    const newUser = { ...userDetails, id: createUniqueUserId() };
    const updatedUserList = [...storedUsers, newUser];

    localStorage.setItem("userList", JSON.stringify(updatedUserList));
    dispatch(saveUser(updatedUserList));

    setNotificationMessage("User added successfully!");
    setShowNotification(true);

    setUserDetails({ id: "", fullName: "", homeAddress: "", emailAddress: "", phoneNumber: "" });
    setHasUnsavedChanges(false);
  };

  return (
    <Box sx={{ width: "50%", margin: "auto", padding: 3 }}>
      <Typography variant="h4" textAlign="center" mb={2}>
        User Registration
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField fullWidth name="fullName" label="Full Name" value={userDetails.fullName}
          onChange={handleInputChange} required />

        <TextField fullWidth name="homeAddress" label="Home Address" value={userDetails.homeAddress}
          onChange={handleInputChange} required sx={{ my: 2 }} />

        <TextField fullWidth name="emailAddress" label="Email Address" type="email" value={userDetails.emailAddress}
          onChange={handleInputChange} required />

        <TextField fullWidth name="phoneNumber" label="Phone Number" type="tel" value={userDetails.phoneNumber} 
        onChange={handleInputChange} required sx={{ my: 2 }} />

        <Button type="submit" variant="contained" fullWidth>
          Register
        </Button>
      </form>

      {/* showing notification */}
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={() => setShowNotification(false)}
        message={notificationMessage}
      />
    </Box>
  );
};

export default UserForm;

