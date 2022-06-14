export default interface UserModel {
  id?: string;
  pronouns: string;
  name: string;
  nickname: string;
  age: string;
  known: string;
  seenLast: string;
  mutualFriends: string[];
  category: string | null;
  lastTalkAbout: string;
  avoidTalkingAbout: string;
  notes: string;
}
