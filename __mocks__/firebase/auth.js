export const PhoneAuthProvider = {
  verifyPhoneNumber: jest.fn(async (phoneNumber, recaptchaVerifier) => {
    if (phoneNumber === "validPhoneNumber" && recaptchaVerifier) {
      return "mockVerificationId";
    } else {
      throw new Error("Invalid phone number or missing recaptchaVerifier");
    }
  }),
};

export const getAuth = jest.fn(() => {
  const mockUser = {
    uid: "mockUserId",
    phoneNumber: "validPhoneNumber",
    displayName: "Mock User",
  };

  return {
    currentUser: mockUser,
  };
});

export const signInWithCredential = jest.fn(async (auth, credential) => {
  if (credential && credential.verificationId === "mockVerificationId") {
    auth.currentUser = getAuth().currentUser;
  } else {
    throw new Error("Invalid credential or verificationId");
  }
});

export const auth = {
  currentUser: getAuth().currentUser,
};
