const request = require("supertest");
const app = require("../../app");
const { connectDB, discoonectDB } = require("../../config/mongoose/db");
const { loadPlanetsData } = require("../../models/planets.model");

describe("Launches API", () => {
  beforeAll(async () => {
    await connectDB;
    loadPlanetsData();
  });

  afterAll(async () => {
    await discoonectDB;
    // await mongoose.connection.close()
  });

  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(response.statusCode)
        .toBe(200);
    }, 10000);
  });

  describe("Test POST /launch", () => {
    const completeLaunchDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
      launchDate: "January 4, 2028",
    };
    const launchDataWithoutDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
    };

    const launchDataWithInvalidDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
      launchDate: "zoot",
    };
    test("It should respond with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchDate)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(requestDate).toBe(responseDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
      console.log("RESPONSE COMPLETELAUNCHDATE", response);
    }, 20000);

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    }, 10000);
    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response._body).toStrictEqual({
        error: "Invalid launch date",
      });
    }, 10000);
  });
});
