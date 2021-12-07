import { AccessProfile } from "../../src/Lib/AccessProfile";

/*
 |--------------------------------------------------------------------------------
 | Mocks
 |--------------------------------------------------------------------------------
 */

type UserPrivacy = {
  private: number;
  friends: number;
  public: number;
};

const USER_FLAGS = {
  firstName: 1 << 0,
  lastName: 1 << 1,
  email: 1 << 2
};

export const profiles: Record<string, UserPrivacy> = {
  "user-1": {
    private: 0,
    friends: 0,
    public: 0
  },
  "user-2": {
    private: 0,
    friends: 0,
    public: 0
  }
};

/*
 |--------------------------------------------------------------------------------
 | Access Profile
 |--------------------------------------------------------------------------------
 */

export class UserAccessProfile extends AccessProfile<typeof USER_FLAGS, UserPrivacy> {
  constructor(privacy: UserPrivacy) {
    super(USER_FLAGS, { ...privacy });
  }

  public static for(userId: string) {
    const profile = profiles[userId];
    if (!profile) {
      throw new Error(`UserAccessProfile Violation: User ${userId} has no valid access profile.`);
    }
    return new UserAccessProfile(profile);
  }
}
