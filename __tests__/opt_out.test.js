import request from "supertest";
//Mock test. each call made by api is tested with an expected result, 
//ontop of the balance being checked at the end. 
const BASE_URL = "http://localhost:3000";

describe("User opt_out balance reward", () => {

  let createdUserId;

  it("should create a user with default balance 0 and opt_out false", async () => {
    const res = await request(BASE_URL)
      .post("/doc.inc/users")
      .send({
        first_name: "Reward",
        last_name: "Tester",
        email: "reward@test.com",
        phone_number: "1234567890",
        ssn: "999-99-9999",
        username: "rewarduser",
        password: "password",
        account_number: "ABC123"
      });

    expect(res.statusCode).toBe(200);

    createdUserId = res.body.id;

    expect(res.body.balance).toBe(0);
    expect(res.body.opt_out).toBe(false);
  });

  it("should increase balance by 2 when opt_out becomes true", async () => {
    const updateRes = await request(BASE_URL)
      .put(`/doc.inc/users/${createdUserId}`)
      .send({
        opt_out: true
      });

    expect(updateRes.statusCode).toBe(200);

    // Fetch updated user
    const getRes = await request(BASE_URL)
      .get(`/doc.inc/users/${createdUserId}`);

    expect(getRes.statusCode).toBe(200);

    expect(getRes.body.opt_out).toBe(true);
    expect(getRes.body.balance).toBe(2);
  });


});