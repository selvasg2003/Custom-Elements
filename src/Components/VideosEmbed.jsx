import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { VideoDescriptionMessage } from "../utils/Constants";

const VideosEmbed = ({ onClose }) => {
  const [fields, setFields] = useState([
    { title: "", date: "", url: "", embedId: "" },
  ]);
  const [isOpen, setIsOpen] = useState(true);
  const [isValidUrl, setIsValidUrl] = useState(false);

  useEffect(() => {
    if (window.CustomElement) {
      try {
        window.CustomElement.init((element, context) => {
          let parsedValue = [];
          try {
            parsedValue = element.value
              ? JSON.parse(element.value)
              : [{ title: "", date: "", url: "", embedId: "" }];
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
          setFields(parsedValue);
        });

        setTimeout(() => {
          const height =
            document.getElementById("yt_element")?.scrollHeight || 400;
          window.CustomElement.setHeight(height);
        }, 200);
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  useEffect(() => {
    if (window.CustomElement) {
      try {
        const height =
          document.getElementById("yt_element")?.scrollHeight || 400;
        window.CustomElement.setHeight(height);
        window.CustomElement.setValue(JSON.stringify(fields));
      } catch (e) {
        console.log(e);
      }
    }
  }, [fields]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newFields = [...fields];

    if (name === "url") {
      let videoId;
      let embedUrl;
      if (isValidHttpsUrl(value)) {
        setIsValidUrl(true);
      } else {
        setIsValidUrl(false);
      }

      if (value.indexOf("vimeo") !== -1) {
        const { videoId, videoId2 } = extractVimeoID(value);
        embedUrl = videoId
          ? `https://player.vimeo.com/video/${videoId}?h=${videoId2}`
          : "";
      } else {
        videoId = extractYouTubeID(value);
        embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : "";
      }
      newFields[index]["embedId"] = embedUrl || "";
    }

    newFields[index][name] = value;
    setFields(newFields);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.(); // Call onClose if provided
  };

  if (!isOpen) return null;

  const addField = () => {
    setFields([...fields, { title: "", date: "", url: "", embedId: "" }]);
  };

  const removeField = (index) => {
    if (fields.length > 1) {
      setFields(fields.filter((_, i) => i !== index));
    }
  };

  const extractYouTubeID = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  function isValidHttpsUrl(url) {
    const regex = /^https:\/\/(www\.)?[\w-]+(\.[\w-]+)+([/?#].*)?$/;
    return regex.test(url);
  }

  // const extractVimeoID = (url) => {
  //   const regex = /vimeo\.com\/(\d+)/;
  //   const match = url.match(regex);
  //   return match ? match[1] : null;
  // };

  function extractVimeoID(url) {
    const regex = /vimeo\.com\/(\d+)\/([\w\d]+)/;
    const match = url.match(regex);

    if (match) {
      const videoId = match[1]; // First ID (video ID)
      const videoId2 = match[2]; // Second ID (hash)
      return { videoId, videoId2 };
    }
    return { videoId: null, videoId2: null };
  }

  return (
    <div
      id="yt_element"
      className="rounded-xl p-6 w-[600px] bg-white shadow-lg flex flex-col"
    >
      <div className="w-full flex justify-between items-center border-b pb-2">
        <h2 className="text-xl font-semibold text-gray-800">Embedded Videos</h2>
        {/* <CloseOutlinedIcon
          className="cursor-pointer text-gray-500 hover:text-red-500"
          onClick={handleClose}
        /> */}
      </div>

      <div className="mt-5">
        {fields.map((field, index) => (
          <div
            key={index}
            className="border p-4 rounded-md mb-4 bg-gray-100 relative"
          >
            <div className="w-full flex justify-end">
              <CloseOutlinedIcon
                className="cursor-pointer text-gray-500 hover:text-red-500"
                onClick={() => removeField(index)}
              />
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              name="title"
              className="border rounded-md p-2 w-full"
              value={field.title}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter title..."
            />
            <label className="block text-sm font-medium text-gray-700 mt-3">
              Date:
            </label>
            <input
              type="date"
              name="date"
              className="border rounded-md p-2 w-full"
              value={field.date}
              onChange={(e) => handleChange(index, e)}
              max={new Date().toISOString().split("T")[0]}
            />
            <label className="block text-sm font-medium text-gray-700 mt-3">
              Video URL:
            </label>
            <p className="text-gray-500 text-sm mb-2">
              {VideoDescriptionMessage}
            </p>{" "}
            {/* Description placed below the label */}
            <input
              type="text"
              name="url"
              className="border rounded-md p-2 w-full"
              value={field.url}
              onChange={(e) => handleChange(index, e)}
              placeholder="Paste a Video URL..."
            />
            {!isValidUrl && (
              <span className="text-red-500 text-sm">Enter a valid URL.</span>
            )}{" "}
            {field.embedId && (
              <div className="mt-4">
                <iframe
                  width="100%"
                  height="250"
                  src={field.embedId}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`Embedded video ${index}`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addField}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
      >
        ➕ Add More
      </button>
    </div>
  );
};

VideosEmbed.propTypes = {
  onClose: PropTypes.func,
};

export default VideosEmbed;
