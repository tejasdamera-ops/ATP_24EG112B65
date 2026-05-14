import exp from 'express'
export const ProductApp=exp.Router()

let product = [];



ProductApp.use(exp.json());



ProductApp.post("/products", (req, res) => {
  let obj = req.body;
  product.push(obj);
  res.json({ message: "product added succefully" });
});

ProductApp.get("/products", (req, res) => {
  res.json({ message: "all products are", payload: product });
});

ProductApp.get("/brand", (req, res) => {
  const brandNames = product.map((p) => p.brand);
  res.json({ message: "all the brands are", payload: brandNames });
});

ProductApp.put("/products", (req, res) => {
  let obj = req.body;
  let index = product.findIndex((element) => {
    return obj.productId === element.productId;
  });
  product.splice(index, 1, obj);
  res.json({message:"updated succesfully"})
});



// Read a product by productId
ProductApp.get("/products/:productId", (req, res) => {

  let pid = Number(req.params.productId);

  let productObj = product.find((p) => {
    return p.productId === pid;
  });

  if (productObj === undefined) {
    res.json({ message: "product not found" });
  } 
  else {
    res.json({ message: "product found", payload: productObj });
  }

});



// Delete product by productId
ProductApp.delete("/products/:productId", (req, res) => {

  let pid = Number(req.params.productId);

  let index = product.findIndex((p) => {
    return p.productId === pid;
  });

  if (index === -1) {
    res.json({ message: "product not found" });
  } 
  else {
    product.splice(index, 1);
    res.json({ message: "product deleted successfully" });
  }

});

// Think of Express App vs Router
// 1️⃣ Express App (Main Server)
// const app = exp()

// This is the main server.

// Think of it like a main office building 🏢.

// 2️⃣ Router
// exp.Router()

// A router is like a department inside the building.

// Example departments:

// Server (Main Office)
// │
// ├── User Department (User Router)
// ├── Product Department (Product Router)
// ├── Order Department (Order Router)

// Each department handles its own work.

// Your Code
// export const ProductApp = exp.Router()

// This means:

// 👉 Create a router for product APIs

// Example APIs inside it:

// ProductApp.get("/products")
// ProductApp.post("/products")
// ProductApp.put("/products")

// So ProductApp handles product-related routes only.

// Why we export it

// Because the main server must use this router.

// Example:

// productAPI.js
// export const ProductApp = exp.Router()
// server.js
// import { ProductApp } from "./productAPI.js"

// app.use("/product", ProductApp)

// Now the server says:

// “If request starts with /product, send it to ProductApp router”

// Final Request Flow

// Example request:

// GET http://localhost:4000/product/products

// Flow:

// Client
//   ↓
// server.js
//   ↓
// app.use("/product", ProductApp)
//   ↓
// Product Router
//   ↓
// ProductApp.get("/products")
//   ↓
// Response
// Simple Way to Remember
// Express App = Main Server
// Router      = Route Manager for a module
// Export      = Allow other files to use it