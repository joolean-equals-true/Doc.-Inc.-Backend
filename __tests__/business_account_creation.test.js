import request from "supertest";
const BASE_URL = "http://localhost:3000";
//last test. does not matter whether it is a mock or stub test.
describe("account_linking.", () => {

  let createdUserId;
  let businessId;
  let businessDivisionId;

  it("should create a user with regular values.", async () => {
    const res = await request(BASE_URL)
      .post("/doc.inc/users")
      .send({
        first_name: "Julian",
        last_name: "Moore",
        email: "julian.moore@test.com",
        phone_number: "1234567890",
        ssn: "999-99-9999",
        username: "rewarduser",
        password: "password",
        account_number: "ABC123"
      });

    expect(res.statusCode).toBe(200);

    createdUserId = res.body.id;

  });


    it("business with normal values", async () => {
    const res = await request(BASE_URL)
      .post("/doc.inc/businesses")
      .send({
        name: "Test Business",
        domain: "testbusiness.com",
      });

    expect(res.statusCode).toBe(200);
    businessId = res.body.id;
  });


  it("should create a business division with normal values.", async () => {
    const res = await request(BASE_URL)
      .post("/doc.inc/business_divisions")
      .send({
        business_id: businessId,
        name: "Test Division",
      });

    expect(res.statusCode).toBe(200);
     businessDivisionId = res.body.id;
  });

  it("should create a business account_linked to the business division.", async () => {
    const res = await request(BASE_URL)
      .post("/doc.inc/business_divisions")
      .send({
        user_id: createdUserId,
        business_division_id: businessDivisionId,
        is_admin: false
      });

    expect(res.statusCode).toBe(200);
  });


});