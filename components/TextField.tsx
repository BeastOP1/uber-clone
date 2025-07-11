import { images } from "@/constants";
import { use, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const TextField = ({
  label = "",
  secureTextEntry = false,
  icon = -1,
  ...props
}) => {
  const [isFocused, setFocus] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text
            style={{
              fontFamily: "Jakarta-SemiBold",
              fontSize: 18,
              left: 15,
            }}
          >
            {label}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 30,
              justifyContent: "flex-start",
              borderColor: `${isFocused ? "teal" : "transparent"}`,
              borderWidth: 1,
              backgroundColor: "ghostwhite",
              borderCurve: "circular",
              margin: 15,
            }}
          >
            <Image
              source={icon}
              style={{
                width: 25,
                height: 25,
                marginLeft: 20,
              }}
            />

            <TextInput
              {...props}
              onFocus={() => {
                if (Keyboard.isVisible()) {
                  setFocus(true);
                } else {
                  setFocus(false);
                }
              }}
              style={{
                fontFamily: "Jakarta-SemiBold",
                padding: 20,
                flex: 1,
              }}
              secureTextEntry={secureTextEntry}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default TextField;
