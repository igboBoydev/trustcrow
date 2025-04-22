import supertest from "supertest";
import { http } from "../index";

// const app = servers;
describe("API tests", () => {
  describe("Category routes", () => {
    describe("Add category", () => {
      it("it should return 200 if category is added successfully", async () => {
        const option = {
          label: "Vehicles",
          parentId: "",
        };

        const { body, statusCode } = await supertest(http)
          .post("/api/v1/add-category")
          .send(option);

        console.log({ body, statusCode });

        expect(statusCode).toBe(200);
        expect(body.message).toEqual("success");
      });
    });

    describe("remove category", () => {
      it("it should return 200 if category is removed successfully", async () => {
        const { body, statusCode } = await supertest(http).delete(
          "/api/v1/delete-category?category_id=8"
        );

        console.log({ body, statusCode });

        expect(statusCode).toBe(200);
        expect(body.message).toEqual("category removed successfully");
      });
    });

    describe("get category subtree", () => {
      it("it should return 200 if a list of category subtrees are returned successfully", async () => {
        const { body, statusCode } = await supertest(http).get(
          "/api/v1/get-category-subtree?parent_node=9"
        );

        console.log({ body, statusCode });

        expect(statusCode).toBe(200);
        expect(body.message).toEqual("success");
      });
    });

    describe("update subtree category", () => {
      it("it should return 200 if a subtree parent node is updated successfully", async () => {
        const { body, statusCode } = await supertest(http).put(
          "/api/v1/update-category-subtree?parent_node=9&new_parent_node=10&subtree_id=11"
        );

        console.log({ body, statusCode });

        expect(statusCode).toBe(200);
        expect(body.message).toEqual("success");
      });
    });
  });
});
