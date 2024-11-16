"use client";
import React, { useState, useEffect } from 'react';

const Dashboard: React.FC = () => {
  const [upcomingMeeting, setUpcomingMeeting] = useState<{
    date: string;
    time: string;
    location: string;
  } | null>(null);

  useEffect(() => {
    // Fetch the upcoming meeting details
    // API endpoint: GET /api/mentors/upcoming-meeting
    const fetchUpcomingMeeting = async () => {
      try {
        const response = await fetch('/api/mentors/upcoming-meeting');
        const data = await response.json();
        setUpcomingMeeting(data);
      } catch (error) {
        console.error('Error fetching upcoming meeting:', error);
      }
    };
    fetchUpcomingMeeting();
  }, []);

  const handleScheduleMeeting = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const meetingData = {
      title: formData.get('meetingTitle') as string,
      date: formData.get('meetingDate') as string,
      time: formData.get('meetingTime') as string,
      location: formData.get('meetingLocation') as string,
    };

    try {
      // Create a new meeting
      // API endpoint: POST /api/mentors/meetings
      await fetch('/api/mentors/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingData),
      });
      // Reset the form
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error scheduling meeting:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <h1 className="text-4xl font-bold mb-8 text-black text-center">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Reports Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-black mb-4">Reports</h2>
          <p className="text-gray-600">
            View recent performance reports, insights, and progress summaries.
          </p>
          {/* Example: Display a sample report or link */}
          <ul className="mt-4">
            <li className="text-blue-500 underline cursor-pointer">View Last Month's Report</li>
            <li className="text-blue-500 underline cursor-pointer mt-2">See All Reports</li>
          </ul>
        </div>

        {/* Next Meeting Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-black mb-4">Next Meeting</h2>
          {upcomingMeeting ? (
            <div className="mt-4 text-black">
              <p><strong>Date:</strong> {upcomingMeeting.date}</p>
              <p><strong>Time:</strong> {upcomingMeeting.time}</p>
              <p><strong>Location:</strong> {upcomingMeeting.location}</p>
            </div>
          ) : (
            <p className="text-gray-600">You don't have any upcoming meetings.</p>
          )}
        </div>

        {/* Schedule Meeting Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-black mb-4">Schedule Meeting</h2>
          <form onSubmit={handleScheduleMeeting}>
            <input
              type="text"
              name="meetingTitle"
              placeholder="Meeting Title"
              className="mb-4 w-full p-2 border border-gray-300 rounded text-black"
              required
            />
            <input
              type="date"
              name="meetingDate"
              className="mb-4 w-full p-2 border border-gray-300 rounded text-black"
              required
            />
            <input
              type="time"
              name="meetingTime"
              className="mb-4 w-full p-2 border border-gray-300 rounded text-black"
              required
            />
            <input
              type="text"
              name="meetingLocation"
              placeholder="Location"
              className="mb-4 w-full p-2 border border-gray-300 rounded text-black"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded w-full hover:bg-blue-600 transition-colors duration-300"
            >
              Schedule Meeting
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;