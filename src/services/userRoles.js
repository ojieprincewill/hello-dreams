import supabase from '../supabase/client';

/**
 * Update a user's role and permissions
 * @param {string} userId - The user's ID
 * @param {string} role - The new role ('student', 'tutor', 'admin', 'moderator', 'superuser')
 * @param {Object} options - Additional options
 * @param {boolean} options.isAdmin - Whether user should have admin privileges
 * @param {boolean} options.isInstructor - Whether user should have instructor privileges
 * @returns {Promise<Object>} - Result object with success status
 */
export async function updateUserRole(userId, role, options = {}) {
  try {
    const { isAdmin = false, isInstructor = false } = options;

    // Update profile table
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        role: role,
        is_admin: isAdmin,
        is_instructor: isInstructor,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (profileError) {
      throw new Error(`Profile update failed: ${profileError.message}`);
    }

    // Update auth metadata for role changes
    const { error: authError } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: { role: role }
    });
    
    if (authError) {
      throw new Error(`Auth metadata update failed: ${authError.message}`);
    }

    return { success: true, message: 'User role updated successfully' };
  } catch (error) {
    console.error('Error updating user role:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Promote a user to admin
 * @param {string} userId - The user's ID
 * @returns {Promise<Object>} - Result object with success status
 */
export async function promoteToAdmin(userId) {
  return updateUserRole(userId, 'admin', { isAdmin: true, isInstructor: false });
}

/**
 * Promote a user to instructor/tutor
 * @param {string} userId - The user's ID
 * @returns {Promise<Object>} - Result object with success status
 */
export async function promoteToInstructor(userId) {
  return updateUserRole(userId, 'tutor', { isAdmin: false, isInstructor: true });
}

/**
 * Promote a user to superuser
 * @param {string} userId - The user's ID
 * @returns {Promise<Object>} - Result object with success status
 */
export async function promoteToSuperuser(userId) {
  return updateUserRole(userId, 'superuser', { isAdmin: false, isInstructor: false });
}

/**
 * Demote a user to student
 * @param {string} userId - The user's ID
 * @returns {Promise<Object>} - Result object with success status
 */
export async function demoteToStudent(userId) {
  return updateUserRole(userId, 'student', { isAdmin: false, isInstructor: false });
}

/**
 * Get user role information
 * @param {string} userId - The user's ID
 * @returns {Promise<Object>} - User role information
 */
export async function getUserRole(userId) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, role, is_admin, is_instructor, display_name, email')
      .eq('id', userId)
      .single();

    if (error) {
      throw new Error(`Failed to fetch user role: ${error.message}`);
    }

    return {
      success: true,
      data: {
        id: data.id,
        role: data.role || 'student',
        isAdmin: data.is_admin || false,
        isInstructor: data.is_instructor || false,
        displayName: data.display_name,
        email: data.email
      }
    };
  } catch (error) {
    console.error('Error fetching user role:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get all users with their roles
 * @returns {Promise<Object>} - All users with role information
 */
export async function getAllUsersWithRoles() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, role, is_admin, is_instructor, display_name, email, created_at, updated_at')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }

    return {
      success: true,
      data: data || []
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { success: false, error: error.message };
  }
}
