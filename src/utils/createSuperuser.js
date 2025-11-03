import { promoteToSuperuser } from '../services/userRoles';

/**
 * Utility function to create the first superuser
 * This should be run by an existing admin or through a secure script
 * 
 * @param {string} userId - The user ID to promote to superuser
 * @returns {Promise<Object>} - Result object with success status
 */
export async function createFirstSuperuser(userId) {
  try {
    console.log(`Promoting user ${userId} to superuser...`);
    
    const result = await promoteToSuperuser(userId);
    
    if (result.success) {
      console.log('✅ User successfully promoted to superuser!');
      console.log('🔐 This user can now edit other users\' roles in the admin dashboard.');
    } else {
      console.error('❌ Failed to promote user to superuser:', result.error);
    }
    
    return result;
  } catch (error) {
    console.error('❌ Error creating superuser:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Instructions for creating the first superuser:
 * 
 * 1. First, create a regular user account through the signup process
 * 2. Note down the user's ID from the Supabase dashboard or database
 * 3. Run this function with the user ID:
 * 
 *    import { createFirstSuperuser } from './src/utils/createSuperuser';
 *    createFirstSuperuser('user-id-here');
 * 
 * 4. Alternatively, you can manually update the database:
 * 
 *    UPDATE profiles SET role = 'superuser', is_admin = false, is_instructor = false 
 *    WHERE id = 'user-id-here';
 * 
 *    UPDATE auth.users SET raw_user_meta_data = jsonb_set(
 *      COALESCE(raw_user_meta_data, '{}'), 
 *      '{role}', 
 *      '"superuser"'
 *    ) WHERE id = 'user-id-here';
 * 
 * 5. The user can then log in and access the User Management section
 *    to promote other users to admin, instructor, or superuser roles.
 */




