/**
 * Jest Unit Testing
 * @ author - Frank Luo
 * Sources Used: 
 * https://www.testim.io/blog/jest-testing-a-helpful-introductory-tutorial/
 * https://jestjs.io/docs/getting-started
 * https://dev.to/dstrekelj/how-to-write-unit-tests-in-javascript-with-jest-2e83
 * https://www.youtube.com/watch?v=FgnxcUQ5vho 
 */

// Importing necessary dependencies 
const request = require("supertest");
const app = require("./app");

describe("Food Favorites Form", () => {
    // Testing some data
    test("making sure post has proper response", async () => {
        // Some sample data 
        let data = { 
            iceCreamFlavor: "Chocolate",
            pizzaToppings: "Mushroom",
            favoriteFruit: "apple",
            cuisine: "Chinese",
            spiciness: "5"
        };
        await request(app).post("/submitFoodPreferences").send(data).expect(200);

        // Testing with incomplete data
        data.iceCreamFlavor = undefined;
        await request(app).post("/submitFoodPreferences").send(data).expect(422);
    });

    // Testing for html file
    test("get returns index.html", async () => {
        await request(app).get("/").expect(200);
    });

    // Testing to see if POST request sets cookies correctly
    test("post sets cookies", async () => {
        // Some sample data
        let data = { 
            iceCreamFlavor: "Chocolate",
            pizzaToppings: "Mushroom",
            favoriteFruit: "apple",
            cuisine: "Chinese",
            spiciness: "5"
        };

        const response = await request(app).post("/submitFoodPreferences").send(data);
        // Check if any of the set cookies starts with bestcookie=samoas
        const hasCookie = response.headers['set-cookie'].some(cookie => cookie.startsWith('favoriteFruit'));
        expect(hasCookie).toBe(true);
    });

    // Testing for incorrect routes 
    test("non existent route should return 404", async () => {
        await request(app).get("/not_real_route").expect(404);
    });

    // Testing with some different data
    test("post works with different data", async () => {
        let data = { 
            iceCreamFlavor: "Vanilla",
            pizzaToppings: "Cheese",
            favoriteFruit: "banana",
            cuisine: "Indian",
            spiciness: "3"
        };
        await request(app).post("/submitFoodPreferences").send(data).expect(200);
    });

    describe("GET /", () => {
        // Testing HTML content
        // Temporarily comment out line 20 in app.js for this test to work
        test("index.html content response", async () => {
            const response = await request(app).get("/");
            expect(response.status).toBe(200);
            expect(response.type).toBe("text/html");
            expect(response.text).toContain("Food Favorites!");
        });
    });
    
    
});