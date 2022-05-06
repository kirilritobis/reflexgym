import React, { FunctionComponent, useEffect } from "react";
import FileBase64 from "../../utils/test";
import "./UserDetailsExpanded.css";

interface UsersExpandedProps {
  userId: string;
}

// Base64 string data
const data =
  "MjYzMzI3MzMxXzQ3ODg0NjAzNzc4Nzc1NzJfMjA5MDM2MjI0MTk4MzM2NTA0OV9uLmpwZWc=";

// const Example = ({ data }) => <img  />
function hexToBase64(str: any) {
  return btoa(
    String.fromCharCode.apply(
      null,
      str
        .replace(/\r|\n/g, "")
        .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
        .replace(/ +$/, "")
        .split(" ")
    )
  );
}
// ReactDOM.render(, document.getElementById('container'))

// const UserDetailsExpanded: FunctionComponent<UsersExpandedProps> = (props) => {
//   useEffect(() => {}, []);

// return (
//   <div className="expanded-user-container">
//     <img
//       className="expanded-user-picture"
//       src={`data:image/jpeg;base64,${hexToBase64(data)}`}
//       // src="https://scontent.fsof10-1.fna.fbcdn.net/v/t31.18172-8/13415451_10205010226333838_6876085943965916846_o.jpg?_nc_cat=104&ccb=1-6&_nc_sid=174925&_nc_ohc=8YO_SW4lMOcAX8fWnt3&_nc_ht=scontent.fsof10-1.fna&oh=00_AT9Fe8kIKgeYd3hi8CP_GKUHP1l0niqXBa4EO6lS41o4dg&oe=629B2897"
//       alt="photo"
//       width="200"
//     ></img>
//     <FileBase64
//       type="file"
//       multiple={false}
//       onDone={({ base64 }) => setItem({ ...item, image: base64 })}
//     />
//     <div className="expanded-user-info">
//       <div>email: </div>
//       <div>phone: </div>
//     </div>
//   </div>
// );
// };v

// export default UserDetailsExpanded;
class App extends React.Component<{}, { files: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      files: [],
    };
  }
  //MjYzMzI3MzMxXzQ3ODg0NjAzNzc4Nzc1NzJfMjA5MDM2MjI0MTk4MzM2NTA0OV9uLmpwZWc=
  getFiles(files: any) {
    this.setState({ files: files });
    console.log(files);
  }

  render() {
    return (
      <div>
        <h1 className="text-center">React File to Base64 Converter</h1>

        <div className="text-center mt-25">
          <p className="text-center"> *) Try To Upload Some Image~</p>
          <FileBase64 multiple={true} onDone={this.getFiles.bind(this)} />
        </div>

        <div className="text-center">
          {this.state.files.map((file: any, i: any) => {
            return <img key={i} src={file.base64} />;
          })}
          <img src="" />
        </div>

        {this.state.files.length != 0 ? (
          <div>
            <h3 className="text-center mt-25">Callback Object</h3>
            <div className="pre-container">
              <pre>{JSON.stringify(this.state.files, null, 2)}</pre>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default App;
