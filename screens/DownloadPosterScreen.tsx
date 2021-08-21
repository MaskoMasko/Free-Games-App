import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Platform,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import Pusher from "pusher-js/react-native";
import axios from "axios";

export const DownloadPosterScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Make a request for a user with a given ID
  axios
    .get("/user?ID=12345")
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

  // Optionally the request above could also be done as
  axios
    .get("/user", {
      params: {
        ID: 12345,
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });

  // Want to use async/await? Add the async keyword to your outer function/method.
  async function getUser() {
    try {
      const response = await axios.get("/user?ID=12345");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  // Enable pusher logging - don't include this in production

  Pusher.logToConsole = true;

  var pusher = new Pusher("be069965d415f82969e7", {
    cluster: "eu",
  });

  var channel = pusher.subscribe("pTvb4nzZpFCciOdo2YcbwyQNCSi06cJS");
  channel.bind("SendPrivateMessage", function (data: any) {
    console.log(JSON.stringify(data));
  });

  // const pusher = new Pusher("local", {
  //   cluster: "mt1",
  //   authEndpoint: "http://mockapi.ddns.net/",
  //   auth: {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-CSRF-TOKEN": "CSRF-Token",
  //     },
  //   },
  // });
  // let authorizer = (channel: any, options: any) => {
  //   return {
  //     authorize: (socketId: any, callback: any) => {
  //       fetch("/login", {
  //         method: "POST",
  //         headers: new Headers({ "Content-Type": "application/json" }),
  //         body: JSON.stringify({
  //           email: "masko@gmail.com",
  //           password: "password",
  //         }),
  //       })
  //         .then((res) => {
  //           console.log(res);
  //           if (!res.ok) {
  //             throw new Error(`Received ${res.statusCode} from /login`);
  //           }
  //           return res.json();
  //         })
  //         .then((data) => {
  //           console.log(data);
  //           callback(null, data);
  //         })
  //         .catch((err) => {
  //           callback(new Error(`Error calling auth endpoint: ${err}`), {
  //             auth: "",
  //           });
  //         });
  //     },
  //   };
  // };

  // const pusher = new Pusher("local", {
  //   cluster: "mt1",
  //   authorizer: authorizer,
  // });
  const nisto = (email: string, password: string) => {
    console.log(email, password);
  };
  return (
    <ScrollView>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={(e) => setEmail(e)}></TextInput>
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={(e) => setPassword(e)}
        secureTextEntry={true}
      ></TextInput>
      <Button title="submit" onPress={() => nisto(email, password)}></Button>
      {/* <Text>{JSON.stringify(pusher, null, 2)}</Text> */}
    </ScrollView>
  );
};
// const REMOTE_IMAGE_PATH =
//   "https://image.dnevnik.hr/media/images/920x695/Jan2019/61629758.jpg";
// const checkPermission = async () => {
//   if (Platform.OS === "ios") {
//     downloadImage();
//   } else {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: "Storage Permission Required",
//           message: "App needs access to your storage to download Photos",
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log("Storage Permission Granted.");
//         downloadImage();
//       } else {
//         alert("Storage Permission Not Granted");
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   }
// };

// const downloadImage = () => {
//   let date = new Date();
//   let image_URL = REMOTE_IMAGE_PATH;
//   let ext: any = getExtention(image_URL);
//   ext = "." + ext[0];
//   const { config, fs } = RNFetchBlob;
//   let PictureDir = fs.dirs.PictureDir;
//   let options = {
//     fileCache: true,
//     addAndroidDownloads: {
//       useDownloadManager: true,
//       notification: true,
//       path:
//         PictureDir +
//         "/image_" +
//         Math.floor(date.getTime() + date.getSeconds() / 2) +
//         ext,
//       description: "Image",
//     },
//   };
//   config(options)
//     .fetch("GET", image_URL)
//     .then((res) => {
//       console.log("res -> ", JSON.stringify(res));
//       alert("Image Downloaded Successfully.");
//     });
// };

// const getExtention = (filename: string) => {
//   return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
// };

//   return (
//     <View style={styles.container}>
//        //     <View style={{ alignItems: "center" }}>
//   //       <Text style={{ fontSize: 30, textAlign: "center" }}>
//   //         React Native Image Download Example
//   //       </Text>
//   //       <Text
//   //         style={{
//   //           fontSize: 25,
//   //           marginTop: 20,
//   //           marginBottom: 30,
//   //           textAlign: "center",
//   //         }}
//   //       >
//   //         www.aboutreact.com
//   //       </Text>
//   //     </View>
//   //     <Image
//   //       source={{
//   //         uri: REMOTE_IMAGE_PATH,
//   //       }}
//   //       style={{
//   //         width: "100%",
//   //         height: 100,
//   //         resizeMode: "contain",
//   //         margin: 5,
//   //       }}
//   //     />
//   //     <TouchableOpacity style={styles.button} onPress={checkPermission}>
//   //       <Text style={styles.text}>Download Image</Text>
//   //     </TouchableOpacity>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  button: {
    width: "80%",
    padding: 10,
    backgroundColor: "orange",
    margin: 10,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    padding: 5,
  },
});
