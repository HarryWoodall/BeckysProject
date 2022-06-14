import { Text, View, Pressable, Image } from "react-native";
import { HomepageProps } from "../common/types";
import CommonStyles from "../styles/common";
import HomepageStyles from "../styles/homepage";

const HomepageView = ({ navigation }: HomepageProps) => {
  return (
    <View style={CommonStyles.fullWidthView}>
      <Image source={require("../../assets/icon.png")} style={{ width: 200, height: 200 }}></Image>
      <Text>Search Bar placeholder</Text>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "gray" : "black",
          },
          CommonStyles.button,
          HomepageStyles.addNewButton,
        ]}
      >
        <Text style={CommonStyles.buttonText}>Did you meet someone new?</Text>
      </Pressable>
    </View>
  );
};

export default HomepageView;
