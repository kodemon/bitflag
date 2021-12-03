import { FLAGS } from "../../src/Constants/Flags";
import { AccessProfile } from "../../src/Lib/AccessProfile";
import type { AccessLevel, AccessRules } from "../../src/Types/AccessProfile";
import type { User } from "./Users";

/*
 |--------------------------------------------------------------------------------
 | Mocks
 |--------------------------------------------------------------------------------
 */

export const profiles: Record<string, AccessRules<User>> = {
  "user-1": {
    id: FLAGS.private,
    firstName: FLAGS.private,
    lastName: FLAGS.private,
    email: FLAGS.private
  },
  "user-2": {
    id: FLAGS.private,
    firstName: FLAGS.private,
    lastName: FLAGS.private,
    email: FLAGS.private
  }
};

/*
 |--------------------------------------------------------------------------------
 | Access Profile
 |--------------------------------------------------------------------------------
 */

export class UserAccessProfile extends AccessProfile<User> {
  public static for(userId: string) {
    const rules = profiles[userId];
    if (!rules) {
      throw new Error(`UserAccessProfile Violation: User ${userId} has no valid access profile.`);
    }
    return new UserAccessProfile(rules);
  }

  public getLevel(level: AccessLevel) {
    switch (level) {
      case "private": {
        return FLAGS.private;
      }
      case "friends": {
        return FLAGS.private | FLAGS.friends;
      }
      case "public": {
        return FLAGS.private | FLAGS.friends | FLAGS.public;
      }
    }
  }
}
