## Part 1

1. Create User and Event type

```ts
type User = {
  id: string;
  email: string;
};

type Event = {
  id: string;
  title: string;
  attendees: User[];
};
```

2. Write Graphql query to get all events

```jsx
const GET_EVENTS = gql`
  query Events {
    events {
      id
      title
      attendees {
        email
      }
    }
  }
`;
```

3. Fetch and store the events in a state variable

```jsx
function Page() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await client.request(GET_EVENTS);
      setEvents(resp.events);
    }
    fetchData();
  }, []);
}
```

4. Display events and attendees in a list

```jsx
function Page() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await client.request(GET_EVENTS);
      setEvents(resp.events);
    }
    fetchData();
  }, []);

  return (
    <div>
      {events.map((event) => {
        const attendees = event.attendees;
        return (
          <div key={event.id}>
            {event.title}
            <div>
              {attendees.map((attendee) => {
                return <li>{attendee.email}</li>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

5. Discussion: What is the "key" prop for? Why does React want you to set it?

Answer: Helps react render efficiently by knowing which nodes are which using the key prop. The key prop helps React efficiently identify which items have changed, been added, or been removed within lists.

Toks: correct

6. Discussion: Assume there were 1M events. How could we optimize our application to be able to create a pleasant UX.

Answer: Frontend caching, pagination, and lazy-loading / virtualization

Toks:

- Knows lazy loading, pagination, react-window, graphql client query optimization

## Part 2: Add Attendees

1. Write Graphql mutation to add an attendee. The mutation requires

```jsx
const ADD_ATTENDEE = gql`
  mutation AddAttendee($email: String!) {
    addAttendee(email: $email) {
      id
    }
  }
`;
```

2. Create a state variable to store the new attendee's email

```tsx
export default function Page() {
  const [email, setEmail] = useState<string>("");
}
```

3. Add an input that allows a user to set the email state variable.

```tsx
export default function Page() {
  const [email, setEmail] = useState<string>("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  return <input value={email} onChange={handleChange} />;
}
```

4. Add a button that, when clicked, will make use client.request to send the mutation with the current email value.

```tsx
export default function Page() {
  const [email, setEmail] = useState<string>("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  async function handleClickSubmit() {
    const resp = await client.request(ADD_ATTENDEE, { email });
  }

  return (
    <>
      <input value={email} onChange={handleChange} />
      <button onClick={handleClickSubmit}>Submit</button>
    </>
  );
}
```

5. Discussion: How can we improve the experience for submitting?

   - Currently, you need to refresh to see the update. How can we improve this?
   - Currently the user can click rapidly and create multiple overlapping requests. How can we handle rapid clicks? Answer: Debouncing, Disabling
   - How can we handle lengthy completion times (10 sec, 10 minutes)? (on FE or BE) Answer: Job Queue, Loading state, Optimistic Rendering
   - Currently there is no feedback if my submission was valid or it went through. How can we prevent invalid inputs and handle errors when submitting (either from user errors or server errors)? Answer: form validation (zod), display error messages in form or in popups.

Toks

- setEvents once mutation is successful, add new attenddee to event in list |
  you can also requery the whole list in case other users are using the app
- Disable button, debounce clicks, throttle number of clicks button can do, validation on backend
  to check if duplicate is being added and ignore
- show progress indicator, show immediate message that its being worked on, optimistic rendering
- frontend validation,

## Part 3: System Design

Design an Event Management website.

Features:

1. Users can signup, login
2. Users can create, update, delete events
3. Users can register for events
4. Users can see who has registered for their events
5. Users can quickly, and easily search all events by title or owner name
6. Users can recover deleted events for 30 days after deletion

Non-functional

4. Low Latency
5. Can handle millions of events

**Design**

1. Database Schema

Users:

- id: string (PK)
- firstName: string
- lastName: string
- email: string
- passsord_hash: string

Events:

- id: string (PK)
- title: string
- startDate: DateTime
- endDate: DateTime
- status: enum (active, deleted)
- createdAt: DateTime
- deletedAt: DateTime
- userId: string (FK - Users)

UserEventRegistrations:

- id: string
- event_id: string (FK)
- user_id: string (FK)

  1.1 Search Database Schema

home-page-events Index:
\_id: string (same as event.id)
event: {
id: string
title: string
}
user: {
id: string
firstName: string
lastName: string
}

2. API

Create event: POST /events { ... event props } => Event
Get all events: GET /events = Event[]
Update event: PUT /events/:id { ... event props } => Event
Delete event: DELETE /events/:id => { deletedId : string }

Signup: POST /auth/signup { email, password }
Login: POST /auth/login { email, passowrd }

Get home page events: POST /home-page-events {
where: {
status: enum,
startDate: DateTime,
endDate: DateTime,
firstName: string,
lastName: string
}
} => HomePageEvents

3. Components

FE -> BE -> DB
------ |
------ -> Queue -> Worker -> (DB, Elasticsearch)
------ -> Elasticsearch

Max

- Knows vertical scaling
- Believes SQL dbs can only scale vertically
- Doesnt know join tables
- Takes guidance well
- Knows about joining tables
- Doesnt know about jobs (thinks webhooks)
- Great clarifying questions for requirements
- Knows about cookies and how auth works
- Aware of CDN: Correct understanding
- Load Balancer: Correct understanding
