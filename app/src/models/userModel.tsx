export default interface UserModel {
  id?: string;
  pronouns: string;
  name: string;
  nickname: string;
  age: string;
  known: string;
  seenLast: string;
  seenLastEvent: string;
  mutualFriends: string[];
  category: string[];
  lastTalkAbout: string;
  avoidTalkingAbout: string;
  notes: string;
  conversationStarters: string;
}
