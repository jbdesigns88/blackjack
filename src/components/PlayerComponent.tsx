import React, { useState } from "react";
import { TextField, Grid, Button,Paper,Typography } from "@mui/material";
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
    <Grid
    container
    justifyContent="center"
    alignItems="center"
    sx={{ height: "100vh", padding: "20px" }}
  >
    <Grid item xs={12} sm={8} md={6} lg={4}>
      <Paper elevation={3} sx={{ padding: "20px" }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: "20px", textAlign: "center" }}>
          Player Sign In
        </Typography>
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="Username"
          value={name}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter your username"
          margin="normal"
          variant="outlined"
        />
        <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
          <Button variant="contained" color="primary" onClick={handleLogin} sx={{  color: "#173517",backgroundColor:"#FFD700","&:hover": {
      backgroundColor: "#E6C200",
    },}}>
            Sign In
          </Button>
        </Grid>
      </Paper>
    </Grid>
  </Grid>

  );
};

export default Player;
