import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Typography } from "@mui/material";

const RichTextEditor: React.FC = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const savedContent = localStorage.getItem("richTextData");
    if (savedContent) setContent(savedContent);
  }, []);

  const handleChange = (value: string) => {
    setContent(value);
    localStorage.setItem("richTextData", value);
  };

  return (
    <Box sx={{ width: "60%", margin: "auto", padding: 3 }}>
      <Typography variant="h4" textAlign="center" mb={2}>
        Rich Text Editor
      </Typography>
      <ReactQuill value={content} onChange={handleChange} />
    </Box>
  );
};

export default RichTextEditor;
