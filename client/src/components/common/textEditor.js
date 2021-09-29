import React from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

const TextEditor = (props) => {
  const modules = {
    // ImageResize: [
    //   {
    //     modules: ['Resize', 'DisplaySize', 'Toolbar'],
    //   },
    // ],

    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["image", "code-block"],
      // ['link', 'blockquote'],
      // [{ list: 'ordered' }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "imageBlot", // #5 Optinal if using custom formats
  ];
  return (
    <div>
      <ReactQuill
        formats={formats}
        modules={modules}
        onChange={props.handleDescChange}
        defaultValue={props.defaultValue}
        preserveWhitespace={true}
      />
    </div>
  );
};

export default TextEditor;
