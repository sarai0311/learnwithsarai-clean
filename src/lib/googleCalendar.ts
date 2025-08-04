// Types
export interface TimeSlot {
  time: string;
  available: boolean;
  reason?: 'busy' | 'weekend' | 'outside-hours';
}

export interface DayAvailability {
  date: string;
  slots: TimeSlot[];
}

export interface AvailabilityData {
  availability: Record<string, DayAvailability>;
}

// Google Calendar Service
export const googleCalendarService = {
  // Get availability for the next N days
  async getAvailability(days: number = 14, userTimezone: string = 'Atlantic/Canary'): Promise<AvailabilityData> {
    try {
      const response = await fetch('/api/calendar/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          days,
          timezone: 'Atlantic/Canary', // Server timezone (where Sarai is)
          userTimezone: userTimezone    // User's timezone for display
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch availability: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching calendar availability:', error);
      throw error;
    }
  },

  // Create a calendar event
  async createCalendarEvent(eventData: {
    date: string;
    time: string;
    title: string;
    description?: string;
    attendeeEmail: string;
    attendeeName: string;
    durationMinutes?: number;
  }): Promise<{ success: boolean; eventId?: string; hangoutLink?: string; error?: string }> {
    try {
      const startDateTime = createEventDateTime(eventData.date, eventData.time);
      const durationMinutes = eventData.durationMinutes || 60; // Default to 1 hour if not specified
      const endDateTime = createEventDateTime(eventData.date, eventData.time, durationMinutes);

      const response = await fetch('/api/calendar/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: eventData.title,
          description: eventData.description || '',
          startDateTime,
          endDateTime,
          attendeeEmail: eventData.attendeeEmail,
          attendeeName: eventData.attendeeName,
          timezone: 'Atlantic/Canary'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to create calendar event: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
};

// Helper function to create ISO datetime string
export const createEventDateTime = (date: string, time: string, durationMinutes: number = 0): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const eventDate = new Date(date);
  eventDate.setHours(hours, minutes + durationMinutes, 0, 0);
  return eventDate.toISOString();
}; 