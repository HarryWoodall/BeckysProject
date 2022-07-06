import { Text, View, ScrollView, Image, Pressable, TextInput } from "react-native";
import React, { useState, useEffect, Dispatch } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useIsFocused } from "@react-navigation/native";
import { EventFormProps } from "../common/types";
import CommonStyles from "../styles/common";
import DefaultButton from "../components/defaultButton";
import EventModel from "../models/eventModel";
import { getAllUsers, getUsers, removeAllEvents, storeEvent, updateEvent } from "../services/dataService";
import DropDownPicker from "react-native-dropdown-picker";
import UserModel from "../models/userModel";

const NewEvent = ({ route, navigation }: EventFormProps) => {
  const isFocused = useIsFocused();

  const [eventName, setEventName] = useState<string>("");

  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerText, setDatePickerText] = useState("Event Date");

  const [openAttendeesSelector, setOpenAttendeesSelector] = useState(false);
  const [attendeesValue, setAttendeesValue] = useState<string[]>([]);
  const [attendeesItems, setAttendeesItems] = useState<UserModel[]>([]);

  interface ItemSchema {
    label: string;
    value: string;
  }

  useEffect(() => {
    if (route.params?.eventModel) {
      const event = route.params.eventModel;
      setEventName(event.name);
      setEventDate(new Date(event.date));
      setDatePickerText(new Date(event.date).toLocaleDateString());
    }

    async function getUserData(ids: string[] = []) {
      const userData = await getAllUsers();
      setAttendeesItems(userData!);

      if (ids.length > 0) {
        setAttendeesValue(ids);
      }
    }
    console.log("Event data update");

    getUserData(route.params?.eventModel?.attendees);
  }, [isFocused]);

  useEffect(() => {
    if (attendeesValue.includes("NEW_PERSON")) {
      setAttendeesValue([]);

      navigation.push("PersonForm", { previousScreen: "EventForm" });
    }
  }, [attendeesValue]);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDatePickerText(new Date(currentDate.toString()).toLocaleDateString());
    setEventDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const saveData = () => {
    const event: EventModel = {
      name: eventName,
      date: eventDate.toString(),
      attendees: attendeesValue,
      id: route.params?.eventModel?.id,
    };

    async function storeData() {
      if (route.params?.eventModel) {
        await updateEvent(event, event.id!);
      } else {
        await storeEvent(event);
      }
      // navigation.navigate(route.params?.previousScreen || "Homepage");
      navigation.goBack();
    }

    storeData();
  };

  const mapAttendees = () => {
    let attendees = attendeesItems?.map((item) => {
      return { label: item.name, value: item.id };
    });

    attendees.push({ label: "New Attendee...", value: "NEW_PERSON" });
    return attendees;
  };

  return (
    <View style={CommonStyles.fullWidthView}>
      <View style={{ width: "100%" }}>
        <View>
          <Image source={require("../../assets/icon.png")} style={{ width: 150, height: 150, alignSelf: "center" }}></Image>
        </View>

        <View>
          <TextInput onChangeText={(newText) => setEventName(newText)} placeholder="Event Name" style={CommonStyles.textbox} value={eventName} />
          <Pressable onPress={showDatepicker}>
            <Text style={CommonStyles.dateDisplayText}>{datePickerText}</Text>
          </Pressable>
          {showDatePicker && <DateTimePicker testID="dateTimePicker" value={eventDate} mode="date" onChange={onChange} />}
        </View>

        <DropDownPicker
          mode="BADGE"
          open={openAttendeesSelector}
          value={attendeesValue}
          items={mapAttendees()}
          setOpen={setOpenAttendeesSelector}
          setValue={setAttendeesValue}
          setItems={setAttendeesItems}
          multiple={true}
          placeholder="Attendees"
          containerStyle={CommonStyles.dropDownPicker}
        />

        <DefaultButton text="Save" onPress={saveData} />
        <DefaultButton text="Remove all events" onPress={removeAllEvents} />
      </View>
    </View>
  );
};

export default NewEvent;
