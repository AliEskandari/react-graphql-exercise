import { schema, Typesaurus } from "typesaurus";
import {
  Account,
  CouncilEventBase,
  Employee,
  EventAuditLogBase,
  EventBase,
  EventParticipantBase,
  EventRequestor,
  GoogleCalendar,
  GoogleCalendarEvent,
  ParticipantBase,
  User,
  UserGoogleCalendar,
} from "../../schema/types.generated";
import "../firebase-admin";

type Timestamps = {
  createdAt: Required<Typesaurus.ServerDate>;
  updatedAt?: Typesaurus.ServerDate;
};

export const core = schema(($) => ({
  accounts: $.collection<Account & Timestamps>(),
  users: $.collection<User & Timestamps>(),
  events: $.collection<EventBase & Timestamps>(),
  googleCalendarEvents: $.collection<GoogleCalendarEvent & Timestamps>(),
  councilEvents: $.collection<CouncilEventBase & Timestamps>(),
  userGoogleCalendars: $.collection<UserGoogleCalendar & Timestamps>(),
  googleCalendars: $.collection<GoogleCalendar & Timestamps>(),
  eventRequestors: $.collection<EventRequestor & Timestamps>(),
  employees: $.collection<Employee & Timestamps>(),
  eventAuditLogs: $.collection<EventAuditLogBase & Timestamps>(),
  eventParticipants: $.collection<EventParticipantBase & Timestamps>(),
  participants: $.collection<ParticipantBase & Timestamps>(),
}));

export type Schema = Typesaurus.Schema<typeof core>;
