import { createHash } from "crypto";
import { core } from "./core";

export function generateIdFroString(string: string): string {
  return createHash("sha256").update(string).digest("hex");
}

export const compositeKey = {
  eventRequestors: (employeeId: string | number, eventId: string) =>
    core.eventRequestors.id(generateIdFroString(`${employeeId}-${eventId}`)),
  googleCalendarEvents: (googleCalendarId: string, eventId: string) =>
    core.googleCalendarEvents.id(
      generateIdFroString(`${googleCalendarId}-${eventId}`)
    ),
  userGoogleCalendars: (userId: string, googleCalendarId: string) =>
    core.userGoogleCalendars.id(
      generateIdFroString(`${userId}-${googleCalendarId}`)
    ),
  eventParticipant: (eventId: string, participantEmail: string) =>
    core.eventParticipants.id(
      generateIdFroString(`${eventId}-${participantEmail}`)
    ),
};
