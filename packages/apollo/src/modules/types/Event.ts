import { User } from "./User";
export type Event = {
  id: string;
  title: string;
  attendees: User[];
};
