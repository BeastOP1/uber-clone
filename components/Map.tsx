import { Text, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { useLocationStore } from "@/store";
import { calculateRegion } from "@/lib/map";

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLongitude,
    destinationLatitude,
  } = useLocationStore();

  const region = calculateRegion({
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  });

  return (
    <View className={"flex-1 flex w-full h-full"}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={{
          flex: 1,
        }}
        tintColor={"black"}
        mapType="standard"
        showsPointsOfInterest={false}
        initialRegion={region}
        showsUserLocation={true}
        userInterfaceStyle={"light"}
      />
    </View>
  );
};

export default Map;
