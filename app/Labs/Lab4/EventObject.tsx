'use client';

import { useState, MouseEvent } from "react";

type EventData = {
  target: string;
};

export default function EventObject() {
  const [event, setEvent] = useState<EventData | null>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const eventData: EventData = {
      target: (e.target as HTMLButtonElement).outerHTML,
    };
    setEvent(eventData);
  };

  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr />
    </div>
  );
}