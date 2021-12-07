import { UserAccessProfile } from "./mocks/UserAccessProfile";
import { users } from "./mocks/Users";

describe("Access Profile", () => {
  describe("when add method is used", () => {
    it("should add expected flags", () => {
      const profile = getAccessProfile();

      expect(profile.has("private", "firstName")).toBeTruthy();
      expect(profile.has("private", "lastName")).toBeTruthy();
      expect(profile.has("private", "email")).toBeTruthy();

      expect(profile.has("friends", "firstName")).toBeTruthy();
      expect(profile.has("friends", "lastName")).toBeFalsy();
      expect(profile.has("friends", "email")).toBeTruthy();

      expect(profile.has("public", "firstName")).toBeTruthy();
      expect(profile.has("public", "lastName")).toBeFalsy();
      expect(profile.has("public", "email")).toBeFalsy();
    });

    it("should filter expected flags", () => {
      const profile = getAccessProfile();

      expect(profile.filter("private", users["user-1"])).toEqual(users["user-1"]);
      expect(profile.filter("friends", users["user-1"])).toEqual({ id: "user-1", firstName: "John", email: "john@doe.com" });
      expect(profile.filter("public", users["user-1"])).toEqual({ id: "user-1", firstName: "John" });
    });
  });

  describe("when del method is used", () => {
    it("should delete expected flags", () => {
      const profile = getAccessProfile();

      profile.del("friends", ["email"]);

      expect(profile.has("private", "firstName")).toBeTruthy();
      expect(profile.has("private", "lastName")).toBeTruthy();
      expect(profile.has("private", "email")).toBeTruthy();

      expect(profile.has("friends", "firstName")).toBeTruthy();
      expect(profile.has("friends", "lastName")).toBeFalsy();
      expect(profile.has("friends", "email")).toBeFalsy();

      expect(profile.has("public", "firstName")).toBeTruthy();
      expect(profile.has("public", "lastName")).toBeFalsy();
      expect(profile.has("public", "email")).toBeFalsy();
    });

    it("should filter expected flags", () => {
      const profile = getAccessProfile();

      profile.del("friends", ["email"]);

      expect(profile.filter("private", users["user-1"])).toEqual(users["user-1"]);
      expect(profile.filter("friends", users["user-1"])).toEqual({ id: "user-1", firstName: "John" });
      expect(profile.filter("public", users["user-1"])).toEqual({ id: "user-1", firstName: "John" });
    });
  });
});

function getAccessProfile() {
  return UserAccessProfile.for("user-1")
    .add("private", ["firstName", "lastName", "email"])
    .add("friends", ["firstName", "email"])
    .add("public", ["firstName"]);
}
