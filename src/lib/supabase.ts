import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a null client if environment variables are missing
let supabase: any = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase environment variables not found. Database functionality will be disabled.');
  // Create a mock client that doesn't break the app
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      update: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      delete: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
    })
  };
}

export { supabase };

// Database Types
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  level: string;
  goals: string;
  timezone?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  service_type: string;
  service_name: string;
  price: number;
  duration: string;
  booking_date: string;
  booking_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_intent_id?: string;
  created_at: string;
  updated_at: string;
}

// User Profile Operations
export const userProfileService = {
  // Create or update user profile
  async createOrUpdateProfile(profileData: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>): Promise<UserProfile> {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', profileData.email)
      .single();

    if (existingUser) {
      // Update existing user
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          name: profileData.name,
          level: profileData.level,
          goals: profileData.goals,
          timezone: profileData.timezone,
          phone: profileData.phone,
          updated_at: new Date().toISOString(),
        })
        .eq('email', profileData.email)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // Create new user
      const { data, error } = await supabase
        .from('user_profiles')
        .insert([
          {
            ...profileData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  },

  // Get user profile by email
  async getProfileByEmail(email: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
    return data;
  },

  // Get all user profiles (for admin)
  async getAllProfiles(): Promise<UserProfile[]> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
};

// Booking Operations
export const bookingService = {
  // Create new booking
  async createBooking(bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          ...bookingData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get bookings for a user
  async getUserBookings(userId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get all bookings (for admin)
  async getAllBookings(): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, user_profiles(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Update booking status
  async updateBookingStatus(bookingId: string, status: Booking['status']): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
