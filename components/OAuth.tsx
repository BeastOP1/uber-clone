import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";

const OAuth = () => (
  <View>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15,
        paddingHorizontal: 10,
        gap: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: "silver",
        }}
      />

      <Text
        style={{
          fontFamily: "Jakarta-Bold",
          fontSize: 18,
          textAlign: "center",
        }}
      >
        Or
      </Text>
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: "silver",
        }}
      />
    </View>

    <CustomButton
      iconLeft={icons.google}
      titleColor="black"
      containerColor="white"
      title={"Log in With Google"}
      onPress={() => {}}
    />
  </View>
);

export default OAuth;
