import { expect, describe, it } from "vitest";
import { isActivePath } from "../../js/utils/userInterface.js";

describe("isActivePath", () => {
  it("returns true when current path matches href exactly", () => {
    const href = "/about";
    const currentPath = "/about";

    const result = isActivePath(href, currentPath);

    expect(result).toBe(true);
  });

  it("returns true for root path (/) when path is /", () => {
    const rootPath = "/";
    const currentPath = "/";

    const result = isActivePath(rootPath, currentPath);

    expect(result).toBe(true);
  });

  it("returns true for root path (/) when path is /index.html", () => {
    const rootPath = "/";
    const currentPath = "/index.html";

    const result = isActivePath(rootPath, currentPath);

    expect(result).toBe(true);
  });

  it("returns true when current path includes the href", () => {
    const href = "/about";
    const currentPath = "/about/employees";

    const result = isActivePath(href, currentPath);

    expect(result).toBe(true);
  });

  it("returns false when paths don't match", () => {
    const href = "/about";
    const currentPath = "/contact";

    const result = isActivePath(href, currentPath);

    expect(result).toBe(false);
  });
});
