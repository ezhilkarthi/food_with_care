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
} from "native-base";
import React from "react";
import ReactDOM from "react-dom";

export type MenuList = {
    item: string
    calorie: number
    cost: number
}
const meuList: Array<MenuList> = [
    {
        item: 'Pizza',
        calorie: 260,
        cost: 170
    },
    {
        item: 'Burger',
        calorie: 295,
        cost: 150
    },
    {
        item: 'Butter Chicken',
        calorie: 600,
        cost: 210
    },
    {
        item: 'Ice cream ',
        calorie: 207,
        cost: 35
    },
    {
        item: 'Cake',
        calorie: 257,
        cost: 400
    },
]

const Menu = () => {
    const { colorMode } = useColorMode();

    const pushToDB = (order:object) => {
        alert(JSON.stringify(order));
    }

    return  <VStack  bg={colorMode === "light" ? "amber.100" : "coolGray.900"}
        minHeight="100vh"
        width={'1/2'}
        px={5}
        py={5}>
        <HStack borderWidth={1}>
                    <Box  flex={1} p="3" bg="blue.100">Item</Box>
                    <Box  flex={1} p="3" bg="blue.100">Caories</Box>
                    <Box  flex={1} p="3" bg="blue.100">Price</Box>          
                </HStack>
        {
            meuList.map((menu, index) => { 
                return <Pressable onPress={() =>pushToDB(menu) }>
                <HStack borderWidth={1}>
                    <Box  flex={1} p="3" bg="warmGray.100">{menu.item}</Box>
                    <Box flex={1} p="3" bg="warmGray.100">{menu.calorie}</Box>
                    <Box flex={1} p="3" bg="warmGray.100">{'₹ '+menu.cost}</Box> 
                </HStack>
                </Pressable>
            } )
        }
        </VStack>
}

export default Menu;