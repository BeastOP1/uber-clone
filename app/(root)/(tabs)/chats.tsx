import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../../global.css";

const Chats = () => {
  return (
    <SafeAreaView>
      <Text className="text-xl font-bold text-blue-500">Chats with Me</Text>

      <Text className={"bg-amber-200 m-2 items-center rounded-2xl"}>Hello</Text>
    </SafeAreaView>
  );
};

export default Chats;
