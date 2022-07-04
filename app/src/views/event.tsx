import { Text, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { EventProps } from "../common/types";
import CommonStyles from "../styles/common";
import PersonProfileStyles from "../styles/personProfile";
import { getEvent, getUsers } from "../services/dataService";
import DefaultButton from "../components/defaultButton";
import TextList from "../components/textList";
import EventModel from "../models/eventModel";
import UserModel from "../models/userModel";
import DataField from "../components/dataField";

const Event = ({ route, navigation }: EventProps) => {
  const isFocused = useIsFocused();

  const [event, setEvent] = useState<EventModel>();
  const [attendees, setAttendess] = useState<UserModel[]>();

  useEffect(() => {
    async function getEventData() {
      let eventData = await getEvent(route.params.id);
      setEvent(eventData!);

      let attendees = await getUsers(eventData?.attendees!);
      setAttendess(attendees);
    }
    console.log("User data update");

    getEventData();
  }, [isFocused]);

  return (
    <ScrollView style={CommonStyles.fullWidthScrollView}>
      <View>
        <Image source={require("../../assets/icon.png")} style={{ width: 150, height: 150, alignSelf: "center", margin: 10 }}></Image>
      </View>

      <DataField title="Name" text={event?.name} />
      <DataField title="Date" text={new Date(event?.date!).toLocaleDateString()} />

      <View>
        <TextList list={attendees?.map((item) => item.name)} title="Attendees" messageIfEmpty="No Attendees" />
      </View>
    </ScrollView>
  );
};

export default Event;
