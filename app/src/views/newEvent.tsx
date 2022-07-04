import { Text, View, ScrollView, Image, Pressable, TextInput } from "react-native";
import React, { useState, useEffect, Dispatch } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useIsFocused } from "@react-navigation/native";
import { NewEventProps } from "../common/types";
import CommonStyles from "../styles/common";
import DefaultButton from "../components/defaultButton";
import EventModel from "../models/eventModel";
import { getAllUsers, removeAllEvents, storeEvent } from "../services/dataService";
import DropDownPicker from "react-native-dropdown-picker";

const NewEvent = ({ route, navigation }: NewEventProps) => {
  const isFocused = useIsFocused();

  const [eventName, setEventName] = useState<string>("");

  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerText, setDatePickerText] = useState("Event Date");

  const [openSelector, setOpenSelector] = useState(false);
  const [selectorValue, setSelectorValue] = useState([]);
  const [selectorItems, setSelectorItems] = useState<ItemSchema[]>([]);

  interface ItemSchema {
    label: string;
    value: string;
  }

  useEffect(() => {
    async function getUserData() {
      const userData = await getAllUsers();

      setSelectorItems(
        userData!.map((user): ItemSchema => {
          return { label: user.name, value: user.id! };
        })
      );
    }
    console.log("User data update");

    getUserData();
  }, [isFocused]);

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
      attendees: selectorValue,
    };

    async function storeData() {
      await storeEvent(event);
      navigation.navigate(route.params?.previousScreen || "Homepage");
    }

    storeData();
  };

  return (
    <View style={CommonStyles.fullWidthView}>
      <View style={{ width: "100%" }}>
        <View>
          <Image source={require("../../assets/icon.png")} style={{ width: 150, height: 150, alignSelf: "center" }}></Image>
        </View>

        <View>
          <TextInput onChangeText={(newText) => setEventName(newText)} placeholder="Event Name" style={CommonStyles.textbox} />
          <Pressable onPress={showDatepicker}>
            <Text style={CommonStyles.dateDisplayText}>{datePickerText}</Text>
          </Pressable>
          {showDatePicker && <DateTimePicker testID="dateTimePicker" value={eventDate} mode="date" onChange={onChange} />}
        </View>

        <DropDownPicker
          mode="BADGE"
          open={openSelector}
          value={selectorValue}
          items={selectorItems}
          setOpen={setOpenSelector}
          setValue={setSelectorValue}
          setItems={setSelectorItems}
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
