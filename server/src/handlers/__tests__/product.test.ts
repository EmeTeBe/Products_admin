import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  it("should display validation errors", async () => {
    const response = await request(server).post("/api/products").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  it("should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Mouse - Testing",
      price: 20,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
  });
});

describe("GET /api/products", () => {
  it("should return 200 OK", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.status).not.toBe(404);
  });
  it("GET a JSON response with all products", async () => {
    const response = await request(server).get("/api/products");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);

    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products/:id", () => {
  it("should retutrn a 404 for a non-existing product", async () => {
    const productId = 9999;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Producto no encontrado");
  });
  it("should check for a valid product ID", async () => {
    const response = await request(server).get("/api/products/abc");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("ID no válido");
  });
  it("get a JSON response for a single product", async () => {
    const response = await request(server).get("/api/products/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.body).not.toHaveProperty("error");
  });
});

describe("PUT /api/products/:id", () => {
  it("should check for a valid product ID", async () => {
    const response = await request(server).put("/api/products/abc").send({
      name: "Monitor - Updated",
      price: 250,
      availability: true,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("ID no válido");
  });
  it("should display validation errors when updating a product", async () => {
    const response = await request(server).put("/api/products/1").send({});
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(4);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });
  it("should validate that the price is higher than 0", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Monitor - Updated",
      price: 0,
      availability: true,
    });
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("Precio no válido");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });
  it("should return a 404 for a non-existing product", async () => {
    const productId = 9999;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Monitor - Updated",
        price: 220,
        availability: true,
      });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });
  it("should updating an existing product", async () => {
    const response = await request(server).put(`/api/products/1`).send({
      name: "Monitor - Updated",
      price: 220,
      availability: true,
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("PATCH /api/products/:id", () => {
  it("should return a 404 for a non-existing product", async () => {
    const productId = 9999;
    const response = await request(server).patch(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });
  it("should update the availability of an existing product", async () => {
    const response = await request(server).patch("/api/products/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(typeof response.body.data.availability).toBe("boolean");

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("error");
  });
});

describe("DELETE /api/products/:id", () => {
  it("should check a valid ID", async () => {
    const response = await request(server).delete("/api/products/abc");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("ID no válido");
  });
  it("should return a 404 for a non-existing product", async () => {
    const productId = 9999;
    const response = await request(server).delete(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");

    expect(response.status).not.toBe(200);
  });
  it("should delete an existing product", async () => {
    const response = await request(server).delete("/api/products/1");
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("Producto Eliminado");

    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(404);
  });
});
