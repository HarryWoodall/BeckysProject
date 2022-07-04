import { Text, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Link, PersonProfileProps } from "../common/types";
import CommonStyles from "../styles/common";
import PersonProfileStyles from "../styles/personProfile";
import UserModel from "../models/userModel";
import { getUser } from "../services/dataService";
import DataField from "../components/dataField";
import TextList from "../components/textList";
import LinkList from "../components/linkList";

const PersonProfile = ({ route, navigation }: PersonProfileProps) => {
  const isFocused = useIsFocused();

  const [user, setUser] = useState<UserModel>();
  const [mutualFriends, setMutualFriends] = useState<Link[]>();
  const [categories, setCategories] = useState<Link[]>();

  useEffect(() => {
    async function getUserData() {
      let userData = await getUser(route.params.id);
      setUser(userData!);

      if (userData && userData.mutualFriends.length > 0) {
        let friendList: Link[] = [];

        for (let i = 0; i < userData.mutualFriends.length; i++) {
          const friendData = await getUser(userData.mutualFriends[i]);
          let friend: Link = {
            id: userData.mutualFriends[i],
            text: friendData!.name,
          };

          friendList.push(friend);
        }

        setMutualFriends(friendList);
      }
    }

    getUserData();
  }, [isFocused]);

  return (
    <ScrollView style={CommonStyles.fullWidthScrollView}>
      <View style={PersonProfileStyles.basicInfo}>
        <View>
          <DataField title="Name" text={user?.name} />
          <DataField title="Age" text={user?.age} />
          <DataField title="How do you know them" text={user?.known} />
        </View>

        <View>
          <Image source={require("../../assets/icon.png")} style={{ width: 150, height: 150 }}></Image>
        </View>
      </View>

      <View>
        <Text style={CommonStyles.heading2}>Last saw them</Text>
        <View style={PersonProfileStyles.lastSawThemContainer}>
          <Text style={[CommonStyles.dateDisplayText, PersonProfileStyles.lastSawThemItem]}>{new Date(user?.seenLast!).toLocaleDateString()}</Text>
          <Text style={PersonProfileStyles.lastSawThemItem}>at</Text>
          <Text style={PersonProfileStyles.lastSawThemItem}>LOCATION_PLACEHOLDER</Text>
        </View>
      </View>
      <View>
        <LinkList list={mutualFriends} linkRoute="PersonProfile" navigation={navigation} title="Mutual Friends" messageIfEmpty="You have no mutual friends" />
        <TextList list={user?.category} title="Caterogies" messageIfEmpty="This person has no categories" />
      </View>
      <DataField title="Last Spoken about" text={user?.lastTalkAbout} />
      <DataField title="What to avoid" text={user?.avoidTalkingAbout} />
      <DataField title="Extra notes" text={user?.notes} />
      <DataField title="Conversation Starters" text="CONVERSATION_STARTER_PLACEHOLDER" />
    </ScrollView>
  );
};

export default PersonProfile;
