import React, { useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import { usePlayerContext } from "../contexts/PlayerContext";

const Player = () => {
  const [name, setUsername] = useState(""); // Fixed the useState initialization
  const { signInPlayer } = usePlayerContext();

  const handleLogin = () => {
    if (name) {
      signInPlayer({ username: name });
    }
  };

  return (
    <>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid item xs={8}>
          <TextField
            required
            id="outlined-required"
            label="Required"
            value={name} // Added value attribute for controlled component
            onChange={(event) => setUsername(event.target.value)}
            placeholder="username"
          />
        </Grid>
        <Grid item xs={4}>
          <Button onClick={handleLogin}>Sign In</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Player;
