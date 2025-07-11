import { View, Text, ScrollView, Image } from "react-native";
import { images, icons } from "@/constants";
import TextField from "@/components/TextField";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const OnSignIn = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      console.log("making Request", signInAttempt.status);

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.log("Catch Error", err.errors[0].longMessage);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            width: "100%",
            height: 250,
          }}
        >
          <Image
            source={images.signUpCar}
            style={{
              width: "100%",
              zIndex: 0,
              height: 250,
            }}
          />

          <Text
            style={{
              fontFamily: "Jakarta-Bold",
              fontSize: 28,
              color: "black",
              bottom: 50,
              left: 20,
            }}
          >
            Welcome 👏
          </Text>
        </View>
        <View
          style={{
            padding: 8,
          }}
        >
          <TextField
            label={"Email"}
            placeholder={"Enter your email"}
            secureTextEntry={false}
            icon={icons.email}
            value={form.email}
            onChangeText={(value: string) => {
              setForm({ ...form, email: value });
            }}
          />

          <TextField
            label={"Password"}
            placeholder={"Enter your password"}
            secureTextEntry={true}
            icon={icons.lock}
            value={form.password}
            onChangeText={(value: string) => {
              setForm({ ...form, password: value });
            }}
          />

          <CustomButton onPress={OnSignIn} marginTop={10} title={"Sign In"} />

          <OAuth />
          <Link
            href={"/sign-up"}
            style={{
              marginTop: 10,
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: "silver",
                fontFamily: "Jakarta-Medium",
              }}
            >
              {"Don't have an account?"}
            </Text>
            <Text
              style={{
                color: "darkblue",
                fontSize: 18,
                fontFamily: "Jakarta-Medium",
              }}
            >
              {" "}
              Sign Up{" "}
            </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
