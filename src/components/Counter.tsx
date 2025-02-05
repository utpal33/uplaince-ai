import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Button, Box, Typography } from "@mui/material";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);


  const backgroundSpring = useSpring({
    backgroundColor: `rgba(255, 0, 0, ${count * 0.1})`,
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div
      style={{
        ...backgroundSpring,
        height: "50vh",
        width:"50vw",
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
        justifyContent:"center",
        marginLeft:"25vw",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2">Counter: {count}</Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => setCount(count + 1)} sx={{ mx: 1 }}>
            Increment
          </Button>
          <Button variant="contained" color="error" onClick={() => setCount(count - 1)} >
            Decrement
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setCount(0)} sx={{ mx: 1 }}>
            Reset
          </Button>
        </Box>
      </Box>
    </animated.div>
  );
};

export default Counter;