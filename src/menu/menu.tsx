import {
  Box,
  Image,
  Text,
  Link,
  HStack,
  Stack,
  Heading,
  Switch,
  useColorMode,
  View,
  VStack,
  Flex,
  Button,
  Pressable,
  AspectRatio,
  Center,
  Icon,
  Fab,
  CloseIcon,
  MinusIcon,
} from "native-base";
import React, { useState } from "react";
import ReactDOM from "react-dom";

export type MenuList = {
  item: string;
  calorie: number;
  cost: number;
};
const meuList: Array<MenuList> = [
  {
    item: "Pizza",
    calorie: 260,
    cost: 170,
  },
  {
    item: "Burger",
    calorie: 295,
    cost: 150,
  },
  {
    item: "Butter Chicken",
    calorie: 600,
    cost: 210,
  },
  {
    item: "Ice cream ",
    calorie: 207,
    cost: 35,
  },
  {
    item: "Cake",
    calorie: 257,
    cost: 400,
  },
];

const FoodList = {
  Desserts: [
    {
      name: "Apple Pie",
      cost: 229,
      description:
        "An all American slice of comfort, baked with a filling of fresh apples and warm spices served with an amber hued caramel sauce. Contains Egg.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYHrY56HOJSbRelXFxKcAbOwj6fR2POw67Mg&usqp=CAU",
      isBestSeller: true,
      rating: 4.2,
      ratingUserCount: "1,500",
    },
    {
      name: "Walnut Brownie Mousse Jar",
      cost: 209,
      description:
        "A delectable jar of our Belgian chocolate mousse with sinful brownie bits and walnuts to take you to chocolate heaven! 290 grams of decadence packaged in a glass jar sent in a paperbag with a wooden spoon and tissue.",
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/jjbgs0kiab1ackwx7zpk",
      rating: 4.6,
      ratingUserCount: "100",
    },
    {
      name: "Chocolate Panna Cotta Jar",
      cost: 199,
      description:
        "Classic Italian dessert infused with decadent dark chocolate and a brookie crumble at the base",
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/jdbbofvo6qasqci6iqpu",
      rating: 3.8,
      ratingUserCount: "1,230",
    },
    {
      name: "Berry Coconut Panna Cotta Jar",
      cost: 199,
      description:
        "A traditional and delicious Italian dessert, topped with berry compote and a coconut crumble base.",
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/jdbbofvo6qasqci6iqpu",
      //   isBestSeller: true,
      rating: 4.2,
      ratingUserCount: "1,500",
    },
    {
      name: "Choco Orange Mousse Jar",
      cost: 179,
      description:
        "A dark chocolate mousse topped with a subtle combination of dark chocolate and orange ganache with an intense dark chocolate sponge at the base.",
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/mxzlahtvtmucvasvy8s4",
      rating: 4.6,
      ratingUserCount: "100",
    },
  ],
};

const Menu = (props: any) => {
  const { colorMode } = useColorMode();
  const [cartItems, setCartItems] = useState<Array<any>>([]);
  const [isCheckoutShown, setIsCheckoutShown] = useState(false);

  const pushToDB = (order: object) => {
    alert(JSON.stringify(order));
  };

  const addToCart = (title: string, listItem: any, type: string) => {
    const listIndex = cartItems.findIndex(
      (value: any) => value.title === title && value.name === listItem.name
    );
    const cartItemsTemp: any = [...cartItems];
    console.log("listIndex", listIndex);
    if (listIndex >= 0) {
      const currentCount =
        type === "add"
          ? cartItemsTemp[listIndex].count + 1
          : cartItemsTemp[listIndex].count - 1;
      if (currentCount >= 0) cartItemsTemp[listIndex].count = currentCount;
    } else {
      cartItemsTemp.push({
        title: title,
        ...listItem,
        count: 1,
      });
    }
    setCartItems(cartItemsTemp);
    props.setCartItemsHandler(cartItemsTemp);
  };

  const renderFoodComp = (title: any, list: any) => {
    return (
      <View alignItems={"center"}>
        <View width={"full"}>
          <Heading textAlign={"center"} p={1}>
            {title}
          </Heading>
        </View>
        <View flex={1} justifyContent={"center"}>
          <Flex
            //   width={"80%"}
            flexWrap={"wrap"}
            pt={"5"}
            flex={1}
            flexDirection={"row"}
            //   justifyContent={"center"}
          >
            {!!list.length &&
              list.map((listItem: any, index: number) => {
                const cartItemCount = cartItems.filter(
                  (value: any) => value.name === listItem.name
                )?.[0]?.count;
                return (
                  <Box
                    maxWidth={"80"}
                    shadow={"9"}
                    padding={"3"}
                    mb={5}
                    ml={15}
                  >
                    <Box>
                      <AspectRatio w="100%" ratio={5 / 3}>
                        <Image
                          rounded={"2xl"}
                          source={{
                            uri: listItem.image,
                          }}
                        />
                      </AspectRatio>
                      {listItem.isBestSeller && (
                        <Center
                          bg="violet.500"
                          _dark={{
                            bg: "violet.400",
                          }}
                          _text={{
                            color: "warmGray.50",
                            fontWeight: "700",
                            fontSize: "xs",
                          }}
                          position="absolute"
                          bottom="0"
                          px="3"
                          py="1.5"
                        >
                          Best Seller
                        </Center>
                      )}
                    </Box>
                    <Stack pt={3}>
                      <Flex
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                      >
                        <Heading size="md">{listItem.name}</Heading>
                        <Heading size={"md"} color={"green.400"}>
                          ${listItem.cost}
                        </Heading>
                      </Flex>
                      <Text color={"gray.500"} mt={"2"}>
                        {listItem.description}
                      </Text>
                    </Stack>
                    <Flex
                      mt={"3"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Flex>
                        {listItem.rating > 0 && (
                          <View>
                            <Text color={"green.700"}>
                              {listItem.rating}{" "}
                              {`(${listItem.ratingUserCount})`}
                            </Text>
                          </View>
                        )}
                      </Flex>
                      {cartItemCount > 0 ? (
                        <Flex
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Button
                            size={"md"}
                            onPress={() => {
                              addToCart(title, listItem, "minus");
                            }}
                          >
                            <Text color={"white"} fontSize={"sm"}>
                              -
                            </Text>
                          </Button>
                          <Text px={"3"} fontWeight={"bold"} fontSize={"md"}>
                            {cartItemCount}
                          </Text>
                          <Button
                            size={"md"}
                            onPress={() => {
                              addToCart(title, listItem, "add");
                            }}
                          >
                            <Text color={"white"} fontSize={"sm"}>
                              +
                            </Text>
                          </Button>
                        </Flex>
                      ) : (
                        <Button
                          size={"md"}
                          mt={"2"}
                          onPress={() => {
                            addToCart(title, listItem, "add");
                          }}
                        >
                          Add to Cart
                        </Button>
                      )}
                    </Flex>
                  </Box>
                );
              })}
          </Flex>
        </View>
      </View>
    );
  };

  const getCheckoutCost = () => {
    const totalCost = cartItems.reduce((newValue, currentValue) => {
      newValue += currentValue.cost * currentValue.count;
      return newValue;
    }, 0);
    return totalCost;
  };

  return (
    <View>
      <Box width={"100%"} height={"50%"} bgColor={"gray.100"}>
        {" "}
        j
      </Box>
      {/* <Flex  bgColor={'red.500'}> */}
      <View px={"5"} pb={"100"}>
        {Object.entries(FoodList).map((list, index) => {
          return renderFoodComp(list[0], list[1]);
        })}
      </View>
      {/* </Flex> */}
      {!!cartItems.length && (
        <View
          bgColor={"primary.800"}
          borderTopRadius={"3xl"}
          flex={1}
          position="fixed"
          width={"full"}
          bottom={0}
        >
          {isCheckoutShown && !!cartItems.length && (
            <Flex>
              <Flex flexDirection={"row"}>
                <Heading
                  flex={1}
                  color={"white"}
                  p={"3"}
                  size={"md"}
                  textAlign={"center"}
                >
                  Checkout
                </Heading>
                <Text
                  position={"absolute"}
                  right={5}
                  top={4}
                  onPress={() => {
                    setIsCheckoutShown(false);
                  }}
                >
                  <MinusIcon
                    style={{
                      color: "white",
                    }}
                  />
                </Text>
              </Flex>
              <View>
                <Box
                  bgColor={"white"}
                  px={"5"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  py={5}
                >
                  <Text bgColor={"red.500"} fontWeight={"bold"} fontSize={"lg"}>
                    Item
                  </Text>
                  <Box flexDirection={"row"}>
                    <Text mr={"10"} fontWeight={"bold"} fontSize={"lg"}>
                      Quantity
                    </Text>
                    <Text fontWeight={"bold"} fontSize={"lg"}>
                      Cost
                    </Text>
                  </Box>
                </Box>
                {!!cartItems.length && (
                  <>
                    {cartItems.map((cart: any, cartIndex: number) => {
                      return (
                        <Box
                          bgColor={"white"}
                          px={"5"}
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          py={3}
                        >
                          <Text fontSize={"lg"}>{cart.name}</Text>
                          <Box flexDirection={"row"}>
                            <Text mr={"10"} fontSize={"lg"}>
                              {cart.count}
                            </Text>
                            <Text fontSize={"lg"}>${cart.cost}</Text>
                          </Box>
                        </Box>
                      );
                    })}
                    <Box
                      bgColor={"white"}
                      px={"5"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      py={3}
                    >
                      <Text fontSize={"lg"}>{""}</Text>
                      <Box flexDirection={"row"}>
                        <Text mr={"10"} fontSize={"lg"} fontWeight={"bold"}>
                          Total
                        </Text>
                        <Text fontSize={"lg"} fontWeight={"bold"}>
                          $ {getCheckoutCost()}
                        </Text>
                      </Box>
                    </Box>
                    <View bgColor={"red.100"} p={2}>
                      <Text textAlign={"center"}>
                        Click here to Check your Health Status for your good
                        Health
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </Flex>
          )}
          <Button
            padding={5}
            onPress={() => setIsCheckoutShown(!isCheckoutShown)}
            bgColor={"primary.800"}
          >
            {isCheckoutShown ? "Place Order" : "Checkout"}
          </Button>
        </View>
      )}
    </View>
  );

  //   return (
  //     <VStack
  //       //   bg={colorMode === "light" ? "amber.100" : "coolGray.900"}
  //       //   minHeight="100vh"
  //       width={"1/2"}
  //       px={5}
  //       py={5}
  //     >
  //       <HStack borderWidth={1}>
  //         <Box flex={1} p="3" bg="blue.100">
  //           Item
  //         </Box>
  //         <Box flex={1} p="3" bg="blue.100">
  //           Caories
  //         </Box>
  //         <Box flex={1} p="3" bg="blue.100">
  //           Price
  //         </Box>
  //       </HStack>
  //       {meuList.map((menu, index) => {
  //         return (
  //           <Pressable onPress={() => pushToDB(menu)}>
  //             <HStack borderWidth={1}>
  //               <Box flex={1} p="3" bg="warmGray.100">
  //                 {menu.item}
  //               </Box>
  //               <Box flex={1} p="3" bg="warmGray.100">
  //                 {menu.calorie}
  //               </Box>
  //               <Box flex={1} p="3" bg="warmGray.100">
  //                 {"₹ " + menu.cost}
  //               </Box>
  //             </HStack>
  //           </Pressable>
  //         );
  //       })}
  //     </VStack>
  //   );
};

export default Menu;
