import { Text, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Link, PersonProps } from "../common/types";
import CommonStyles from "../styles/common";
import PersonStyles from "../styles/personProfile";
import UserModel from "../models/userModel";
import { getCategory, getEvent, getUser } from "../services/dataService";
import DataField from "../components/dataField";
import TextList from "../components/textList";
import LinkList from "../components/linkList";
import DefaultButton from "../components/defaultButton";
import ClickableLink from "../components/clickableLink";

const Person = ({ route, navigation }: PersonProps) => {
  const isFocused = useIsFocused();

  const [user, setUser] = useState<UserModel>();
  const [lastSeenEvent, setLastSceenEvent] = useState<string>("");
  const [mutualFriends, setMutualFriends] = useState<Link[]>();
  const [categories, setCategories] = useState<Link[]>();

  useEffect(() => {
    async function getUserData() {
      let userData = await getUser(route.params.id);
      setUser(userData!);

      let event = await getEvent(userData?.seenLastEvent!);
      setLastSceenEvent(event?.name!);

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

      if (userData && userData.category.length > 0) {
        let categoryList: Link[] = [];

        for (let i = 0; i < userData.category.length; i++) {
          const categoryData = await getCategory(userData.category[i]);
          let category: Link = {
            id: userData.category[i],
            text: categoryData!.name,
          };

          categoryList.push(category);
        }

        setCategories(categoryList);
      }
    }

    getUserData();
  }, [isFocused]);

  return (
    <ScrollView style={CommonStyles.fullWidthScrollView}>
      <View style={PersonStyles.basicInfo}>
        <View>
          <DataField title="Pronouns" text={user?.pronouns} />
          <DataField title="Name" text={user?.name} />
          <DataField title="Nickname" text={user?.nickname} />
          <DataField title="Age" text={user?.age} />
          <DataField title="How do you know them" text={user?.known} />
        </View>

        <View>
          <Image source={require("../../assets/icon.png")} style={{ width: 150, height: 150 }}></Image>
        </View>
      </View>

      <View>
        <Text style={CommonStyles.heading2}>Last saw them</Text>
        <View style={PersonStyles.lastSawThemContainer}>
          <Text style={[CommonStyles.dateDisplayText, PersonStyles.lastSawThemItem]}>{new Date(user?.seenLast!).toLocaleDateString()}</Text>
          <Text style={PersonStyles.lastSawThemItem}>at</Text>
          <ClickableLink
            containerStyle={{ alignSelf: "center" }}
            text={lastSeenEvent}
            onPress={() => navigation.navigate("Event", { id: user?.seenLastEvent! })}
            testID="PersonEventLink"
          />
        </View>
      </View>
      <View>
        <LinkList
          list={mutualFriends}
          linkRoute="Person"
          navigation={navigation}
          title="Mutual Friends"
          messageIfEmpty="You have no mutual friends"
          testIDPrefix="MutualFriendsLink"
        />
        <LinkList
          list={categories}
          linkRoute="Category"
          navigation={navigation}
          title="Caterogies"
          messageIfEmpty="This person has no categories"
          testIDPrefix="CategoryLink"
        />
      </View>
      <DataField title="Last Spoken about" text={user?.lastTalkAbout} />
      <DataField title="What to avoid" text={user?.avoidTalkingAbout} />
      <DataField title="Extra notes" text={user?.notes} />
      <DataField title="Conversation Starters" text={user?.conversationStarters} />
      <DefaultButton text="Edit" onPress={() => navigation.navigate("PersonForm", { previousScreen: "Person", personModel: user })} />
    </ScrollView>
  );
};

export default Person;
