import supabase from '../supabase/client';

// Debug function to test profile access
export async function testProfileAccess(userId) {
  console.log('Testing profile access for user:', userId);
  
  try {
    // Test 1: Simple select
    const { data: test1, error: error1 } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();
    
    console.log('Test 1 - Simple select:', { data: test1, error: error1 });
    
    // Test 2: Full select
    const { data: test2, error: error2 } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    console.log('Test 2 - Full select:', { data: test2, error: error2 });
    
    return { test1, test2, error1, error2 };
  } catch (error) {
    console.error('Test profile access error:', error);
    throw error;
  }
}

// Create a new user profile
export async function createUserProfile(profileData) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profileData)
      .select()
      .single();
      
    if (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Exception in createUserProfile:', error);
    throw error;
  }
}

// Get user profile by ID
export async function getUserProfile(userId) {
  if (!userId) throw new Error('User ID is required');
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Exception in getUserProfile:', error);
    throw error;
  }
}

// Update user profile
export async function updateUserProfile(profileData) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', profileData.id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Exception in updateUserProfile:', error);
    throw error;
  }
}

// Check if user profile exists
export async function checkProfileExists(userId) {
  if (!userId) return false;
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();
      
    if (error && error.code === 'PGRST116') {
      // No rows returned
      return false;
    }
    
    if (error) {
      console.error('Error checking profile exists:', error);
      throw error;
    }
    return !!data;
  } catch (error) {
    console.error('Exception in checkProfileExists:', error);
    throw error;
  }
}

// Create profile if it doesn't exist
export async function ensureProfileExists(userId, userEmail) {
  try {
    const exists = await checkProfileExists(userId);
    
    if (!exists) {
      const profileData = {
        id: userId,
        email: userEmail,
        display_name: userEmail,
        role: 'student',
        is_instructor: false,
        is_admin: false,
        preferences: {},
        social_links: {}
      };
      
      return await createUserProfile(profileData);
    }
    
    return await getUserProfile(userId);
  } catch (error) {
    console.error('Exception in ensureProfileExists:', error);
    throw error;
  }
} 