import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";

import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";

const OnBoarding = () => {
  //Like controller
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const islastSlide = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        paddingVertical:
          Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        style={{
          alignSelf: "flex-end",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "Jakarta-Bold",
            color: "black",
            fontSize: 14,
          }}
        >
          Skip
        </Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View
            style={{
              width: 32,
              height: 5,
              margin: 5,
              backgroundColor: "white",
              borderRadius: 3,
            }}
          />
        }
        activeDot={
          <View
            style={{
              width: 30,
              height: 5,
              margin: 5,
              backgroundColor: "darkblue",
              borderRadius: 3,
            }}
          />
        }
        index={activeIndex}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View
            key={item.id}
            style={{
              justifyContent: "center",
              flex: 1,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Image
              source={item.image}
              style={{
                width: "100%",
                height: 300,
                resizeMode: "contain",
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 40,
                  textAlign: "center",
                  marginTop: 10,
                  fontFamily: "Jakarta-Bold",
                }}
              >
                {item.title}
              </Text>
            </View>
            <Text
              style={{
                marginTop: 3,
                marginHorizontal: 40,
                fontSize: 18,
                textAlign: "center",
                fontFamily: "Jakarta-Medium",
              }}
            >
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        onPress={() =>
          islastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
        title={islastSlide ? "Get Started" : "Next"}
        taxVarient="oi"
        bigVarient="ds"
        margin={10}
      />
    </SafeAreaView>
  );
};

export default OnBoarding;
