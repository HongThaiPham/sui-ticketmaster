import React from "react";
type Props = {
  params: Promise<{
    id: string;
  }>;
};

const EventDetailPage: React.FC<Props> = async ({ params }) => {
  const { id } = await params;
  return (
    <div>
      <h1>Event Detail Page</h1>
      <p>Event ID: {id}</p>
      {/* You can add more details about the event here */}
      <p>This page will display details for the event with ID: {id}</p>
    </div>
  );
};

export default EventDetailPage;
