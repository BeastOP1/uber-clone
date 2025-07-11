import { Image, Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({
  title = "button",
  onPress,
  iconLeft = null,
  iconRight = null,
  titleColor = "white",
  containerColor = "darkblue",
  ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      ...props,
    }}
  >
    <View
      style={{
        width: "100%",
        paddingVertical: 18,
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: containerColor,
        borderRadius: 30,
        borderColor: "silver",
        borderWidth: 1,
      }}
    >
      {iconLeft && (
        <Image
          style={{
            height: 20,
            width: 20,
            marginRight: 10,
          }}
          source={iconLeft}
        />
      )}
      <Text
        style={{
          fontFamily: "Jakarta-Bold",
          fontSize: 15,
          color: titleColor,
          letterSpacing: 1,
        }}
      >
        {title}
      </Text>

      {iconRight && (
        <Image
          style={{
            height: 20,
            width: 20,
            marginLeft: 10,
          }}
          source={iconRight}
        />
      )}
    </View>
  </TouchableOpacity>
);

export default CustomButton;
