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
// import initializeAuthentication from "./services/firebase";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  User,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
// import firebase from "./services/firebase";
import Menu from "./menu/menu";
import { FireBaseService } from "./services/firebase";
const provider = new GoogleAuthProvider();

FireBaseService.initializeAuthentication();

const App = () => {
  const [user, setUser] = useState<User>({} as User);
  const { colorMode } = useColorMode();

  useEffect(() => {
    let localAccess = localStorage.getItem("access")
    let localName = localStorage.getItem("name")
    let localEmail = localStorage.getItem("email")
    setUser({ ...user, refreshToken: localAccess ?? '', displayName: localName ?? '', email: localEmail ?? '' })
  }, [])


  const clearPassword = () => {
    localStorage.clear();
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    setUser({} as User);
  }

  const loginHandler = async () => {
    const auth = getAuth();
    if (localStorage.getItem("access")) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          clearPassword()
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          localStorage.setItem("access", user.refreshToken ?? '');
          localStorage.setItem("name", user.displayName ?? '');
          localStorage.setItem("email", user.email ?? '');
          setUser(user);
        })
        .catch((err) => {
          clearPassword()
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
            <Button size={"sm"} onPress={loginHandler}>{localStorage.getItem("access") ? "Log out" : "Sign in"}</Button>
          </Box>
        </Flex>
      </Box>
      {
        localStorage.getItem("access") ? <Menu user={user} /> : <div></div>
      }
      {/* <Menu /> */}
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
