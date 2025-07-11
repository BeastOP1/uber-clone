import { icons } from "@/constants";
import { Image, Text, View } from "react-native";

const RideItem = ({ ride }) => (
  <View
    style={{
      flex: 1,
      marginHorizontal: 16,
      marginVertical: 8,
      elevation: 5,
      backgroundColor: "white",
      borderCurve: "circular",
      borderRadius: 8,
      padding: 10,
      justifyContent: "space-between",
      rowGap: 16,
    }}
  >
    {/*/*upperside*/}
    <View
      style={{
        flexDirection: "row",
        gap: 16,
      }}
    >
      <Image
        source={{
          uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14.3497&m&apiKey=5300570e28bb401ebe5369240903ae26 `,
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
        }}
      />

      <View
        style={{
          justifyContent: "flex-start",
          flexWrap: "wrap",
          flex: 1,
          gap: 15,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 8,
            alignItems: "center",
          }}
        >
          <Image
            source={icons.to}
            style={{
              height: 20,
              width: 20,
              resizeMode: "contain",
            }}
          />

          <Text
            style={{
              textTransform: "capitalize",
              fontFamily: "Jakarta-Bold",
            }}
            numberOfLines={1}
          >
            {ride.origin_address}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 8,
            alignItems: "center",
          }}
        >
          <Image
            source={icons.point}
            style={{
              height: 20,
              width: 20,
              resizeMode: "contain",
            }}
          />

          <Text
            style={{
              textTransform: "capitalize",
              fontFamily: "Jakarta-Bold",
            }}
            numberOfLines={1}
          >
            {ride.destination_address}
          </Text>
        </View>
      </View>
    </View>
    {/*//lowerside*/}
    <View
      style={{
        backgroundColor: "snow",
        padding: 8,
        borderRadius: 8,
      }}
    >
      {/*//Date & Time*/}
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
          margin: 8,
        }}
      >
        <Text
          style={{
            color: "gray",
            fontFamily: "Jakarta-SemiBold",
            fontSize: 15,
          }}
        >
          Date & Time
        </Text>

        <Text
          style={{
            color: "black",
            fontFamily: "Jakarta-SemiBold",
            fontSize: 15,
          }}
        >
          12 August 2024, 6h 31m
        </Text>
      </View>
      {/*//Driver*/}
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
          margin: 8,
        }}
      >
        <Text
          style={{
            color: "gray",
            fontFamily: "Jakarta-SemiBold",
            fontSize: 15,
          }}
        >
          Driver
        </Text>

        <Text
          style={{
            textTransform: "capitalize",
            color: "black",
            fontFamily: "Jakarta-SemiBold",
            fontSize: 15,
          }}
          numberOfLines={1}
        >
          {ride.driver.first_name} {ride.driver.last_name}
        </Text>
      </View>
      {/*//Car Seats*/}
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
          margin: 8,
        }}
      >
        <Text
          style={{
            color: "gray",
            fontFamily: "Jakarta-SemiBold",
            fontSize: 15,
          }}
        >
          Car Seats
        </Text>

        <Text
          style={{
            color: "black",
            fontFamily: "Jakarta-SemiBold",
            fontSize: 15,
          }}
        >
          {ride.driver.car_seats}
        </Text>
      </View>
      {/*//Payment Status*/}
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
          margin: 8,
        }}
      >
        <Text
          style={{
            color: "gray",
            fontFamily: "Jakarta-SemiBold",
            fontSize: 15,
          }}
        >
          Payment Status
        </Text>

        <Text
          style={{
            color: "lime",
            fontFamily: "Jakarta-SemiBold",
            fontSize: 15,
            textTransform: "capitalize",
          }}
        >
          paid
        </Text>
      </View>
    </View>
  </View>
);

export default RideItem;
