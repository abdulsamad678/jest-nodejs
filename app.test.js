const express = require("express");
const supertest = require("supertest");
const router = express.Router();
const mongoose = require("mongoose");
const app = require("./server"); 
const User = require("./model/user"); 
const request = supertest(router); 

describe("GET /api/user/data/", () => {
  it("responds with all users when users exist", async () => {
    // Mocking the User.find method to return a mock user
    const mockUsers = [
      {
        data: {
          success: true,
          allusers: [
            {
              _id: "64be69c0b2c89db7ee988c45",
              email: "samad@gmail.com",
              password:
                "$2b$10$uTV4weiTizGPa1LN1seZu.j8YkCUehVtKJrOFP9IyyLVWXYH6Jo4G",
              createdEvent: [
                "64bf7d3393b73597f28073bb",
                "64bf89fb4a9d9460aea5d939",
                "64bf9fe61cb81577addb36b9",
                "64c8c5aab45f8b83b341fd63",
              ],
              __v: 49,
            },
          ],
        },
      },
    ];

    jest.spyOn(User, "find").mockResolvedValue(mockUsers);

    const response = await supertest(app).get("/api/user/data/");
    console.log("res" + JSON.stringify(response));
    expect(response.status).toBe(200);

    const responseData = JSON.parse(response.text);

    expect(responseData.data).toBeDefined();

    expect(responseData.data.success).toBe(true);

    expect(responseData.data.allusers[0]).toEqual(mockUsers[0]); // Compare with the first element of mockUsers array
  }, 10000);

  it("responds with user not found message when no users exist", async () => {
    jest.spyOn(User, "find").mockResolvedValue([]);

    const response1 = await supertest(app).get("/api/user/data/");
    console.log("response1" + JSON.stringify(response1));

    expect(response1.status).toBe(400); 
    const responseBody = JSON.parse(response1.text);
    expect(responseBody.message).toBe("user not found");
  }, 10000);

  it("responds with a server error message when an error occurs", async () => {
   // let errorMessage = "Database error";
    jest.spyOn(User, "find").mockRejectedValue(new Error());
    //jest.spyOn(User, "find").mockRejectedValue(new Error(errorMessage));
    const response2 = await supertest(app).get("/api/user/data/");
    console.log("response2" + JSON.stringify(response2));
    //console.log("errorMessage:", errorMessage);
    expect(response2.status).toBe(500);
    const responseBody = JSON.parse(response2.text); 
   // expect(responseBody.data.message).toEqual(errorMessage); 
    expect(responseBody.data.message).toBeDefined()
  }, 10000);

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
