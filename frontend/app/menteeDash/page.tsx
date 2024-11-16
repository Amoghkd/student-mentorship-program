"use client";
import React, { useState, useEffect } from 'react';

const MenteeDashboard: React.FC = () => {
  const [upcomingMeeting, setUpcomingMeeting] = useState<{
    date: string;
    time: string;
    mentor: string;
  } | null>(null);

  const [mentorFeedback, setMentorFeedback] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the upcoming meeting details
    // API endpoint: GET /api/mentees/upcoming-meeting
    const fetchUpcomingMeeting = async () => {
      try {
        const response = await fetch('/api/mentees/upcoming-meeting');
        const data = await response.json();
        setUpcomingMeeting(data);
      } catch (error) {
        console.error('Error fetching upcoming meeting:', error);
      }
    };
    fetchUpcomingMeeting();

    // Fetch the mentor feedback
    // API endpoint: GET /api/mentees/mentor-feedback
    const fetchMentorFeedback = async () => {
      try {
        const response = await fetch('/api/mentees/mentor-feedback');
        const data = await response.json();
        setMentorFeedback(data.feedback);
      } catch (error) {
        console.error('Error fetching mentor feedback:', error);
      }
    };
    fetchMentorFeedback();
  }, []);

  const handleScheduleMeeting = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const meetingData = {
      mentor: formData.get('mentor') as string,
      date: formData.get('meetingDate') as string,
      time: formData.get('meetingTime') as string,
    };

    try {
      // Schedule a new meeting
      // API endpoint: POST /api/mentees/meetings
      await fetch('/api/mentees/meetings', {
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
      <h1 className="text-4xl font-bold mb-8 text-black text-center">Mentee Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Upcoming Meeting Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-black mb-4">Next Meeting</h2>
          {upcomingMeeting ? (
            <div className="mt-4 text-black">
              <p><strong>Date:</strong> {upcomingMeeting.date}</p>
              <p><strong>Time:</strong> {upcomingMeeting.time}</p>
              <p><strong>Mentor:</strong> {upcomingMeeting.mentor}</p>
            </div>
          ) : (
            <p className="text-gray-600">You don't have any upcoming meetings.</p>
          )}
        </div>

        {/* Mentor Feedback Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-black mb-4">Mentor Feedback</h2>
          {mentorFeedback ? (
            <p className="text-gray-600 mt-4">{mentorFeedback}</p>
          ) : (
            <p className="text-gray-600">No feedback available at this time.</p>
          )}
        </div>

        {/* Schedule Meeting Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-black mb-4">Schedule Meeting</h2>
          <form onSubmit={handleScheduleMeeting}>
            <select
              name="mentor"
              className="mb-4 w-full p-2 border border-gray-300 rounded text-black"
              required
            >
              <option value="" disabled>
                Select Mentor
              </option>
              {/* Populate mentor options from API */}
              <option value="mentor1">Mentor 1</option>
              <option value="mentor2">Mentor 2</option>
            </select>
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

export default MenteeDashboard;