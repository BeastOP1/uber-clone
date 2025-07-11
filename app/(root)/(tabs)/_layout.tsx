// import { Stack } from "expo-router";

import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { Image, View } from "react-native";

// export default function TabLayout() {
//   return <Stack>
//     <Stack.Screen name="profile" options={{headerShown : false}}/>
//     <Stack.Screen name="chats" options={{headerShown : false}}/>
//     <Stack.Screen name="home" options={{headerShown : false}}/>
//     <Stack.Screen name="rides" options={{headerShown : false}}/>
//   </Stack>;
// };

const TabIcon = ({ focused, source }) => (
  <View
    style={{
      flexDirection: "row",
      alignContent: "center",
      alignItems: "center",
      backgroundColor: focused ? "green" : "",
      display: "flex",
      borderRadius: 30,
    }}
  >
    <View
      style={{
        borderRadius: 30,
        height: 55,
        display: "flex",
        justifyContent: "center",
        width: 55,
        alignItems: "center",
        backgroundColor: `${focused ? "green" : ""}`,
      }}
    >
      <Image
        source={source}
        tintColor={"white"}
        resizeMode="contain"
        style={{
          width: 30,
          height: 30,
        }}
      />
    </View>
  </View>
);

const Layout = () => (
  <Tabs
    initialRouteName="home"
    screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "white",
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#333333",
        borderRadius: 50,
        paddingBottom: 23,
        overflow: "hidden",
        marginHorizontal: 20,
        marginBottom: 30,
        height: 78,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        position: "absolute",
      },
    }}
  >
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.home} />
        ),
      }}
    />

    <Tabs.Screen
      name="rides"
      options={{
        title: "Rides",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.list} />
        ),
      }}
    />

    <Tabs.Screen
      name="chats"
      options={{
        title: "Chats",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.chat} />
        ),
      }}
    />

    <Tabs.Screen
      name="profile"
      options={{
        title: "Profile",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.profile} />
        ),
      }}
    />
  </Tabs>
);

export default Layout;
