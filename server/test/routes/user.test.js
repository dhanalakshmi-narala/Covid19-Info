const app = require("../../src/app");
const request = require("supertest").agent(app.listen());

const { truncateTable } = require("./helper");

describe("/signUp", () => {
  const users = [
    {
      name: "Dhanalakshmi",
      username: "dhana",
      password: "dhana123",
      confirm_password: "dhana123",
      email: "dhanalakshmi.narala@gmail.com",
    },
    {
      name: "Sailaja",
      username: "sailu",
      password: "sailu123",
      confirm_password: "sailu12",
      email: "sailu@gmail.com",
    },
  ];

  beforeEach(() => {
    truncateTable("users");
  });

  it("should signUp for user1", async () => {
    const res = await request.post("/signUp").send(users[0]);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: "Success",
      message: "User successfully signed up",
    });
  });

  it("should signUp for user2", async () => {
    const res = await request.post("/signUp").send(users[1]);
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      status: "Failure",
      error: "Password and confirm password are not equal",
    });
  });
});
