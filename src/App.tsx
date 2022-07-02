import {
  Box,
  Image,
  Text,
  Link,
  HStack,
  Heading,
  Switch,
  useColorMode,
  View,
  VStack,
  Flex,
  Button,
  Icon,
} from "native-base";
import initializeAuthentication from "./services/firebase";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  User,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import firebase from "./services/firebase";
import Menu from "./menu/menu";
const provider = new GoogleAuthProvider();

initializeAuthentication();

const App = () => {
  const [user, setUser] = useState<User>();
  const { colorMode } = useColorMode();

  const loginHandler = async () => {
    const auth = getAuth();

    if (localStorage.getItem("access")) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          localStorage.clear();
          indexedDB.deleteDatabase("firebaseLocalStorageDb");
          setUser(undefined);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          console.log("user", user);
          localStorage.setItem("access", JSON.stringify(user.refreshToken));
          setUser(user);
        })
        .catch((err) => {
          setUser(undefined);
          localStorage.clear();
        });
    }
  };

  return (
    <View>
      <Box>
        <Flex
          flexDirection={"row"}
          justifyContent="space-between"
          width={"full"}
          paddingX={"5"}
        >
          <Box>
            <Heading color={"black"}>THINKING...</Heading>
          </Box>
          <Box>
            <Button size={"sm"}>Sign In</Button>
          </Box>
        </Flex>
      </Box>
      <Menu />
    </View>
  );

  // return (
  // <Box
  // bg={'white'}
  // minHeight="100vh"
  // px={5}
  // py={5}
  // >
  //   <HStack
  //     alignItems="center"
  //     backgroundColor={"red"}
  //     justifyContent={"space-between"}
  //   >
  //     <View>
  //       <Heading size="lg">THINKING...</Heading>
  //     </View>
  //     <View
  //       flexDirection={"row"}
  //       justifyContent={"space-evenly"}
  //       alignContent={"space-between"}
  //       w="20%"
  //     >
  //       <Button onPress={loginHandler}>
  //         {localStorage.getItem("access") ? "Log out" : "Sign in"}
  //       </Button>
  //     </View>
  //   </HStack>
  //   <Menu />
  // </Box>
  // );
};

export default App;
