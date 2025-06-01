import React from "react";
import EventForm from "./_components/event-form";

const NewEventPage = () => {
  return (
    <main className="grow container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <EventForm />
      </div>
    </main>
  );
};

export default NewEventPage;
