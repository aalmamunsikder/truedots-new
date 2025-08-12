# Supabase Setup Guide for TRUEdots

## 🚀 Getting Started

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization and enter project details
4. Wait for the project to be created

### 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon public** key
3. Create a `.env` file in your project root with:

```bash
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Set Up Database Tables

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Create profiles table for TRUEdots users
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT,
  full_name TEXT,
  birthday DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'non-binary', 'prefer-not-to-say')),
  interested_in TEXT[] CHECK (array_length(interested_in, 1) > 0),
  looking_for TEXT CHECK (looking_for IN ('long-term', 'casual', 'friendship', 'networking')),
  interests TEXT[],
  photos TEXT[],
  profile_completed BOOLEAN DEFAULT FALSE,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create matches table for user connections
CREATE TABLE IF NOT EXISTS matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user1_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  user2_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  matched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user1_id, user2_id)
);

-- Create messages table for chat functionality
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'location')),
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view other profiles for matching" ON profiles
  FOR SELECT USING (auth.uid() != id);

-- Matches policies
CREATE POLICY "Users can view their matches" ON matches
  FOR SELECT USING (auth.uid() IN (user1_id, user2_id));

CREATE POLICY "Users can create matches" ON matches
  FOR INSERT WITH CHECK (auth.uid() IN (user1_id, user2_id));

CREATE POLICY "Users can update their matches" ON matches
  FOR UPDATE USING (auth.uid() IN (user1_id, user2_id));

-- Messages policies
CREATE POLICY "Users can view messages in their matches" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM matches 
      WHERE id = messages.match_id 
      AND auth.uid() IN (user1_id, user2_id)
    )
  );

CREATE POLICY "Users can send messages in their matches" ON messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM matches 
      WHERE id = messages.match_id 
      AND auth.uid() IN (user1_id, user2_id)
    )
  );

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, profile_completed)
  VALUES (NEW.id, NEW.email, FALSE);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_gender ON profiles(gender);
CREATE INDEX IF NOT EXISTS idx_profiles_interested_in ON profiles USING GIN(interested_in);
CREATE INDEX IF NOT EXISTS idx_profiles_looking_for ON profiles(looking_for);
CREATE INDEX IF NOT EXISTS idx_profiles_location ON profiles(location_lat, location_lng);
CREATE INDEX IF NOT EXISTS idx_matches_users ON matches(user1_id, user2_id);
CREATE INDEX IF NOT EXISTS idx_messages_match_id ON messages(match_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Insert some sample interests for the app
INSERT INTO profiles (id, email, interests) VALUES 
  ('00000000-0000-0000-0000-000000000001', 'sample@example.com', ARRAY['Travel', 'Music', 'Cooking', 'Fitness', 'Reading', 'Movies', 'Art', 'Photography', 'Yoga', 'Gaming', 'Dancing', 'Hiking', 'Cooking', 'Photography', 'Writing', 'Painting', 'Swimming', 'Running', 'Cycling', 'Skiing', 'Surfing'])
ON CONFLICT (id) DO NOTHING;

### 4. Configure Authentication

1. Go to **Authentication** → **Settings**
2. Under **Site URL**, add your development URL (e.g., `http://localhost:5173`)
3. Under **Redirect URLs**, add:
   - `http://localhost:5173/dashboard`
   - `http://localhost:5173/login`
   - `http://localhost:5173/signup`

4. **Optional: Configure email templates**:
   - Go to **Authentication** → **Email Templates**
   - Customize the confirmation and recovery email templates
   - Update the sender email address

5. **Enable email confirmations** (recommended for production):
   - Go to **Authentication** → **Settings**
   - Enable "Enable email confirmations"
   - Set confirmation email template

### 5. Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize the confirmation and recovery email templates
3. Update the sender email address

## 🔧 Features Implemented

- ✅ **Email Authentication**: Sign up and sign in with email/password
- ✅ **User Profiles**: Store user data in profiles table
- ✅ **Protected Routes**: Dashboard requires authentication
- ✅ **Auto-redirect**: Logged-in users are redirected appropriately
- ✅ **Sign Out**: Users can sign out from dashboard

## 🚧 Coming Soon

- 🔄 **Social Authentication**: Google, Apple, Facebook
- 🔄 **Password Reset**: Forgot password functionality
- 🔄 **Email Verification**: Confirm email addresses
- 🔄 **Profile Updates**: Edit profile information

## 🧪 Testing Your Setup

### Test Database Connection

After running the SQL commands, you can test if everything is working:

1. **Check if tables were created**:
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('profiles', 'matches', 'messages');
   ```

2. **Verify RLS policies**:
   ```sql
   SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
   FROM pg_policies 
   WHERE schemaname = 'public';
   ```

3. **Test profile creation** (after signing up a user):
   ```sql
   SELECT * FROM profiles LIMIT 5;
   ```

### Test Authentication Flow

1. **Start your development server**: `npm run dev`
2. **Try to sign up** with a new email
3. **Check the profiles table** to see if the user was created
4. **Try to sign in** with the created account
5. **Verify dashboard access** (should redirect if not authenticated)

## 🐛 Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Make sure your `.env` file exists and has the correct values
   - Restart your development server after adding environment variables

2. **"Invalid login credentials"**
   - Check that the user exists in Supabase
   - Verify email/password combination

3. **"Row Level Security policy violation"**
   - Ensure RLS policies are set up correctly
   - Check that the user is authenticated

### Development Tips

- Use the Supabase dashboard to monitor authentication events
- Check the browser console for detailed error messages
- Use the Network tab to see API requests/responses

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
