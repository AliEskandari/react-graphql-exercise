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

6. Discussion: Assume there were 1M events. How could we optimize our application to be able to create a pleasant UX.

Answer: Frontend caching, pagination, and lazy-loading / virtualization
