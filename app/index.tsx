import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();

  console.log("Auth state:", { isLoaded, isSignedIn });

  // Show loading indicator while Clerk is initializing
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Once loaded, redirect based on auth state
  // if (isSignedIn) {
  //   return <Redirect href="/(root)/(tabs)/home" />;
  // }

  // return <Redirect href="/(auth)/welcome" />;

  return isSignedIn ? (
    <Redirect href="/(root)/(tabs)/home" />
  ) : (
    <Redirect href="/(auth)/welcome" />
  );
}
