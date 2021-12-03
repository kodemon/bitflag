import { UserAccessProfile } from "./mocks/UserAccessProfile";
import { users } from "./mocks/Users";

describe("Access Profile", () => {
  it("should set first name to friends", () => {
    const profile = UserAccessProfile.for("user-1").set("firstName", "public").set("lastName", "friends");
    expect(profile.access.firstName).toBe(profile.getLevel("public"));
    expect(profile.access.lastName).toBe(profile.getLevel("friends"));
    expect(profile.access.email).toBe(profile.getLevel("private"));
  });

  it("should should filter out inaccessible fields", () => {
    const profile = UserAccessProfile.for("user-1").set("firstName", "public").set("lastName", "friends");
    expect(profile.filter(users["user-1"], "public")).toEqual({ firstName: "John" });
    expect(profile.filter(users["user-1"], "friends")).toEqual({ firstName: "John", lastName: "Doe" });
    expect(profile.filter(users["user-1"], "private")).toEqual(users["user-1"]);
  });
});
