import getExpiredOtpUsers from "../helpers/db.js";
import User from "../models/User.model.js";


// Function to clean up users with expired OTPs
const cleanupUnverifiedUser = async () => {
  const currentTime = new Date();  // Get the current time
  
  try {
    // Fetch expired OTP users
    const expiredUsers = await getExpiredOtpUsers(currentTime);

    // If expired users are found, clean them up
    for (const user of expiredUsers) {
      // Delete the expired user record
      await User.deleteOne({ _id: user._id });

      console.log(`User with email ${user.email} deleted due to expired OTP.`);
    }
  } catch (error) {
    console.error('Error cleaning up expired OTP users:', error);
  }
};

export default cleanupUnverifiedUser
