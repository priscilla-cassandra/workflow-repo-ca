import { expect, describe, it, beforeEach } from "vitest";
import { saveUser, getUsername, clearStorage } from "../../js/utils/storage.js";

describe("Storage functions", () => {
  beforeEach(() => {
    clearStorage();
  });

  describe("getUsername", () => {
    it("returns the name from the user object in storage", () => {
      const user = {
        name: "Jane",
      };
      saveUser(user);

      const name = "Jane";
      const retrievedName = getUsername();

      expect(retrievedName).toBe(name);
    });

    it("returns null when no user exists in storage", () => {
      const username = getUsername();
      expect(username).toBeNull();
    });
  });
});
