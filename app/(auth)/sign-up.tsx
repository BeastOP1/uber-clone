import * as React from "react";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import TextField from "@/components/TextField";
import { icons, images } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import Modal, { ReactNativeModal } from "react-native-modal";
import { fetchApi } from "@/lib/fetch";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const [pendingVerification, setPendingVerification] = React.useState({
    status: "default",
    code: "",
    error: "",
  });

  const [showSuccessModal, setshowSuccessModal] = useState(false);
  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification({ ...pendingVerification, status: "pending" });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;
    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: pendingVerification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        // TODO:create a database user

        await fetchApi("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdSessionId,
          }),
        });

        await setActive({ session: signUpAttempt.createdSessionId });
        setPendingVerification({ ...pendingVerification, status: "success" });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setPendingVerification({
          ...pendingVerification,
          error: "Verfication failed.",
          status: "failed",
        });
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setPendingVerification({
        ...pendingVerification,
        error: err.errors[0].longMessage,
        status: "failed",
      });
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
            Create Your Account
          </Text>
        </View>
        <View
          style={{
            padding: 8,
          }}
        >
          <TextField
            label={"Name"}
            placeholder={"Enter your name"}
            secureTextEntry={false}
            icon={icons.person}
            value={form.name}
            onChangeText={(value: string) => {
              setForm({ ...form, name: value });
            }}
          />

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

          <CustomButton
            onPress={onSignUpPress}
            marginTop={10}
            title={"Sign Up"}
          />

          <OAuth />
          <Link
            href={"/sign-in"}
            style={{
              marginTop: 20,
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
              Already have an account?
            </Text>
            <Text
              style={{
                color: "darkblue",
                fontSize: 18,
                fontFamily: "Jakarta-Medium",
              }}
            >
              {" "}
              Log In{" "}
            </Text>
          </Link>
        </View>
        <ReactNativeModal
          onModalHide={() => {
            if (pendingVerification.status === "success") {
              setshowSuccessModal(true);
            }
          }}
          isVisible={pendingVerification.status === "pending"}
        >
          <View
            style={{
              backgroundColor: "white",
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 25,
            }}
          >
            <Text
              style={{
                fontFamily: "Jakarta-ExtraBold",
                marginBottom: 5,
                fontSize: 25,
              }}
            >
              Verification
            </Text>

            <Text
              style={{
                fontFamily: "Jakarta-Regular",
                marginBottom: 10,
                marginLeft: 5,
              }}
            >
              We've sent a Verification code to {form.email}
            </Text>
            <TextField
              label="Code"
              icon={icons.lock}
              placeholder={"12345"}
              value={pendingVerification.code}
              keyboardType="numeric"
              onChangeText={(code: string) =>
                setPendingVerification({ ...pendingVerification, code: code })
              }
            />

            {pendingVerification.error && (
              <Text
                style={{
                  color: "red",
                  fontSize: 18,
                  fontFamily: "Jakarta-Regular",
                  marginTop: 5,
                }}
              >
                {" "}
                {pendingVerification.error}
              </Text>
            )}

            <CustomButton
              title="Verify Email"
              marginTop={5}
              marginBottom={5}
              containerColor="green"
              onPress={onVerifyPress}
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View
            style={{
              minHeight: 300,
              backgroundColor: "white",
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 25,
            }}
          >
            <Image
              source={images.check}
              style={{
                width: 110,
                height: 110,
                margin: 5,
                alignSelf: "center",
              }}
            />

            <Text
              style={{
                color: "black",
                fontFamily: "Jakarta-Bold",
                textAlign: "center",
                fontSize: 25,
              }}
            >
              Verified
            </Text>

            <Text
              style={{
                color: "grey",
                textAlign: "center",
                fontFamily: "Jakarta-Regular",
                fontSize: 16,
              }}
            >
              You have successfully verified your account.
            </Text>

            <CustomButton
              marginTop={20}
              title="Browse Home"
              onPress={() => {
                setshowSuccessModal(false);
                router.push("/(root)/(tabs)/home");
              }}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
