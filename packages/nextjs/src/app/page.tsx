"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { GraphQLClient, gql } from "graphql-request";
const client = new GraphQLClient("https://kq4j7q-4000.csb.app");

/*
Part 1: Fetching Events and Attendees
    1. Define a type User with fields: id of type string, and 
    email of type string
    
    2. Define a type Event with fields: id of type string, title
    of type string, and attendees of type User[]
    
    3. Define a GraphQL query GET_EVENTS that fetches the id, title,
    and attendees.email fields for all events using the "events" query.
    
    4. Fetch the events using the client.request method and store the events in 
    the `events` state variable.
    
    5. Render the events and attendees. For each event, render the
    title and a list of attendees' emails in an unordered list.
    
    For example, we should see: 
    Birthday Party
        - alice@snap.com
    Conference
        - bob@snap.com
        - charlie@snap.com
*/

/*
Part 2: Add Attendees
    1. Write a Graphql mutation to add an attendee using the 
    `addAttendee` mutation.

    2. Add code to capture the new attendee's email from the user
    on the page.

    3. Add a button that, when clicked, submits the email to the backend
    using the mutation from step 1.
*/

const GET_EVENTS = gql``;

export default function Page() {}
