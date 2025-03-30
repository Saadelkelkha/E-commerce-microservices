**FastDelivery Microservices** 🚀  

A microservices-based architecture for **FastDelivery**, a startup managing deliveries for multiple e-commerce platforms. The system is built using **MongoDB**, **Node.js**, and **Express**, with four independent microservices:  

### 📌 **Microservices Overview**  
- **🛍️ Product Service**: Manages product catalog.  
- **📦 Order Service**: Handles customer orders.  
- **🚚 Delivery Service**: Manages order shipments.  
- **🔐 Authentication Service**: Manages users (customers & couriers).  

### ⚙️ **Core Features**  
- **MongoDB** models for each microservice  
- **REST API** endpoints for CRUD operations  
- **JWT Authentication** for secure access  
- **Stock & order status updates**  
- **Carrier assignment for deliveries**  

### 📂 **API Endpoints**  

#### **🛍️ Product Service**  
- `POST /produit/ajouter ` → Add a new product
  <img src="img/ajouter_produit.png">
- `GET /produit/:id` → Get product details
  <img src="img/produit.png">
- `PATCH /produit/:id/stock` → Update stock
  <img src="img/edit_stock.png">

#### **📦 Order Service**  
- `POST /commande/ajouter` → Place a new order
  <img src="img/ajouter_commande.png">
- `GET /commande/:id` → Retrieve order details
  <img src="img/commande.png">
- `PATCH /commande/:id/statut` → Update order status
  <img src="img/edit_commande_sstatut.png">

#### **🚚 Delivery Service**  
- `POST /livraison/ajouter` → Assign a carrier & create delivery
  <img src="img/ajouter_produit.png">
- `PUT /livraison/:id` → Update delivery status
  <img src="img/livraison.png">

#### **🔐 Authentication Service**  
- `POST /auth/register` → Register a new user
  <img src="img/register.png">
- `POST /auth/login` → Authenticate & get JWT
  <img src="img/login.png">
- `GET /auth/profil` → Get user details (JWT required)
  <img src="img/profil.png">

### 🛠 **Tech Stack**  
- **Backend**: Node.js, Express  
- **Database**: MongoDB  
- **Authentication**: JWT   

🚀 **Contributions & Feedback Welcome!**
