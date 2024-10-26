"use client";
import { useState, useEffect } from "react";
import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:4000"); // Replace with actual GraphQL server URL

// TypeScript interfaces for Event and User
interface User {
  id: string;
  name: string;
  email: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  attendees: User[];
}

// GraphQL Queries and Mutations
const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      date
      attendees {
        name
        email
      }
    }
  }
`;

const ADD_EVENT = gql`
  mutation AddEvent($title: String!, $date: String!) {
    addEvent(title: $title, date: $date) {
      id
      title
      date
      attendees {
        id
        name
        email
      }
    }
  }
`;

const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;

const ADD_ATTENDEE = gql`
  mutation AddAttendee($eventId: ID!, $name: String!, $email: String!) {
    addAttendee(eventId: $eventId, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export default function Home() {
  // Component state
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [attendeeName, setAttendeeName] = useState<string>("");
  const [attendeeEmail, setAttendeeEmail] = useState<string>("");
  const [selectedEventId, setSelectedEventId] = useState<string>("");

  // Fetch events on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await client.request<{ events: Event[] }>(GET_EVENTS);
      setEvents(data.events);
    };
    fetchData();
  }, []);

  // Function to add a new event
  const addEvent = async () => {
    if (!title || !date) return;
    await client.request(ADD_EVENT, { title, date });
    const data = await client.request<{ events: Event[] }>(GET_EVENTS);
    setEvents(data.events);
    setTitle("");
    setDate("");
  };

  // Function to delete an event
  const deleteEvent = async (id: string) => {
    await client.request(DELETE_EVENT, { id });
    const data = await client.request<{ events: Event[] }>(GET_EVENTS);
    setEvents(data.events);
  };

  // Function to add an attendee to an event
  const addAttendee = async () => {
    if (!attendeeName || !attendeeEmail || !selectedEventId) return;
    await client.request(ADD_ATTENDEE, {
      eventId: selectedEventId,
      name: attendeeName,
      email: attendeeEmail,
    });
    const data = await client.request<{ events: Event[] }>(GET_EVENTS);
    setEvents(data.events);
    setAttendeeName("");
    setAttendeeEmail("");
    setSelectedEventId("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Event List</h1>
        <ul className="mb-6">
          {events.map((event) => (
            <li key={event.id} className="p-2 border-b border-gray-200">
              <div className="flex justify-between">
                <div>
                  <span className="font-semibold">{event.title}</span> -{" "}
                  <span className="text-gray-500">{event.date}</span>
                </div>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
              <ul className="mt-2 ml-4">
                {event.attendees.map((attendee) => (
                  <li key={attendee.id}>
                    <span>{attendee.name}</span> -{" "}
                    <span className="text-gray-500">{attendee.email}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-4">Add Event</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addEvent}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Event
          </button>
        </div>
        <h2 className="text-xl font-semibold mt-8 mb-4">Add Attendee</h2>
        <div className="space-y-4">
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select Event</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Name"
            value={attendeeName}
            onChange={(e) => setAttendeeName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={attendeeEmail}
            onChange={(e) => setAttendeeEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addAttendee}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Attendee
          </button>
        </div>
      </div>
    </div>
  );
}
