import React, { FunctionComponent, useEffect, useState } from "react";
import { uploadImage } from "../../services/UsersService/UsersService";
import FileBase64 from "../../utils/test";
import "./UserDetailsExpanded.css";

interface UsersExpandedProps {
  userId: string;
}

const UserDetailsExpanded: FunctionComponent<UsersExpandedProps> = (props) => {
  const [image, setImage] = useState<string>("");
  useEffect(() => {}, []);
  const handleImageAdd = async (file: any) => {
    await uploadImage(file.base64);
    setImage(file.base64);
  };
  return (
    <div className="expanded-user-container">
      <img
        className="expanded-user-picture"
        src={image}
        alt="photo"
        width="200"
      ></img>
      <FileBase64 multiple={false} onDone={handleImageAdd} />
      <div className="expanded-user-info">
        <div>email: </div>
        <div>phone: </div>
      </div>
    </div>
  );
};

export default UserDetailsExpanded;
