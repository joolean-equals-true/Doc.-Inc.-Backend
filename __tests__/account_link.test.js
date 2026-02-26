import request from "supertest";
//This is a stub test. Only the account_link API call has an expected result of 200.
const BASE_URL = "http://localhost:3000";

describe("account_linking.", () => {

  let createdUserId;
  let createdUserId2;

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

    createdUserId = res.body.id;

  });


    it("should create a second user with normal values", async () => {
    const res = await request(BASE_URL)
      .post("/doc.inc/users")
      .send({
        first_name: "Jacob",
        last_name: "Stevens",
        email: "stevens@test.com",
        phone_number: "1234567890",
        ssn: "999-99-9999",
        username: "rewarduser",
        password: "password",
        account_number: "ABC123"
      });

    createdUserId2 = res.body.id;
  });
  it("should create a valid link between both accounts.", async () => {
    const res = await request(BASE_URL)
      .post("/doc.inc/account_links")
      .send({
        original_account_id: createdUserId,
        linked_account_id: createdUserId2
      });

    expect(res.statusCode).toBe(200);
  });


});