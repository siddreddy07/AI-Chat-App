import User from "../models/User.model.js";


// Function to get users with expired OTPs
async function getExpiredOtpUsers(currentTime) {
  try {
    // Query users whose OTPs have expired and are unverified
    const expiredUsers = await User.find({
      otpExpires: { $lt: currentTime },  // Check if otpExpires is less than the current time
      isVerfied: false,  
    });

    return expiredUsers;
  } catch (error) {
    console.error('Error fetching expired OTP users:', error);
    throw error;
  }
}
 export default getExpiredOtpUsers

