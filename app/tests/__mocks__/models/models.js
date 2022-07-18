export const UsersModel = [
  {
    name: "mockName",
    age: "mockAge",
    nickname: "mockNickname",
    pronouns: "pronounsString",
    known: "knownString",
    seenLast: "1995-12-17T03:24:00",
    seenLastEvent: "seenLastEventString",
    mutualFriends: ["mutualFriend1", "mutualFriend2"],
    category: ["category1", "category2"],
    lastTalkAbout: "lastTalkAboutString",
    avoidTalkingAbout: "avoidTalkingAboutString",
    notes: "notesString",
    conversationStarters: "conversationStartersString",
    id: "idString",
  },
];

export const EventsModel = [
  {
    name: "MockEventName",
    attendees: ["Attendee1"],
    date: "1995-12-17T03:24:00",
    id: "EventId",
  },
];

export const CategoryModel = [
  {
    name: "MockCategoryName",
    people: ["attendee1", "attendee2"],
    notes: "NotesString",
    id: "CategoryId",
  },
];
