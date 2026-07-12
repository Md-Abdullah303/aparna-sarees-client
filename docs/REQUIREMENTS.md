# Aparna Sarees — Full Project Requirements Document

| Field | Value |
|-------|-------|
| **Status** | In Progress |
| **Last Updated** | 2026-07-12 |
| **Author** | MD Abdulla |
| **Repository** | `aparna-sarees-client` (Frontend) |

> **Note for AI assistants:** This is the authoritative requirements document for the Aparna Sarees project. Always consult this file before implementing features, pages, or architectural decisions. The backend is a separate service/repository.

---

## 1. Project Overview

| Field | Details |
|-------|---------|
| **Project Name** | Aparna Sarees |
| **Project Type** | E-Commerce Web Application (User-based) |
| **Description** | Aparna Sarees is a full-stack e-commerce platform where users can browse, search, and order sarees online. The platform supports three distinct roles — **User**, **Seller**, and **Admin** — each with specific access levels and capabilities. The platform will feature a beautiful, professional design with theme toggling support. |

---

## 2. Tech Stack

### Frontend (This Repository)

| Technology | Purpose |
|------------|---------|
| Next.js (TypeScript) | Frontend framework — **TS only, no JS** |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | UI component library |
| Better Auth | Authentication |
| Motion (Framer Motion) | Animations & transitions |
| MongoDB | Database connection (via env) |

### Backend (Separate Service)

| Technology | Purpose |
|------------|---------|
| Node.js + Express (TypeScript) | Backend REST API — **TS only, no JS** |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variable management |
| MongoDB | Primary database |

> Additional libraries/tools may be added as the project evolves.

---

## 3. Design System

### Color Scheme

| Color | Usage |
|-------|-------|
| **Primary Color** | Main brand color (buttons, links, highlights) |
| **Secondary Color** | Supporting UI elements |
| **Tertiary/Accent Color** | Backgrounds, badges, decorative elements |

### Theme

- **Light / Dark Mode Toggle** — Users can switch themes; preference saved in `localStorage` or user settings

### Design Principles

- Beautiful, modern, and professional look
- Responsive design (mobile-first)
- Consistent spacing, typography, and color usage throughout
- Component library: shadcn/ui + Tailwind CSS
- Smooth animations via Motion (Framer Motion)

---

## 4. User Roles

### 👤 User (General Customer)

**Without Login:**
- Browse, search, and filter sarees
- View saree detail pages

**After Login:**
- Add items to cart
- Make payments via SSLCommerz
- Access personal dashboard
- Cart tab visible in Navbar
- Submit reviews on purchased sarees

### 🏪 Seller

**Without Login:**
- Browse, search, and filter sarees
- View saree detail pages
- Cannot place orders

**After Login:**
- Access full Seller Dashboard
- Add, manage, edit, delete own products
- View reviews on own products

### 🛡️ Admin

- Must be logged in at all times
- Upon login → redirected directly to Admin Dashboard
- Full control over users, products, and reviews

---

## 5. Pages & Sections

### 5.1 Homepage

- [ ] Navbar
- [ ] Hero Section — attractive banner/slider
- [ ] Top Sarees Section — featured/trending sarees
- [ ] Top Sellers Section — highlight top-performing sellers
- [ ] Customer Reviews / Comments Section
- [ ] Footer

### 5.2 Browse Sarees Page

- [ ] Navbar
- [ ] Search Bar
- [ ] Filtering Options — price range, category, color, availability, rating
- [ ] Saree Grid — 4 columns layout

Each card includes:
- Product Image
- Name
- Short Description
- Price
- Star Rating
- Availability badge (Available / Out of Stock)
- "Show Details" button

- [ ] Footer

### 5.3 Saree Details Page

- [ ] Navbar
- [ ] Full product details:
  - Image gallery
  - Name & full description
  - Price
  - Star Rating
  - Availability status
  - Seller info
- [ ] Add to Cart button (requires login)
- [ ] Reviews Section — visible at the bottom of the page
  - After purchase, logged-in user can submit a review (star rating + comment)
  - All approved reviews displayed publicly
- [ ] Footer

### 5.4 Authentication Pages

- [ ] Login Page
- [ ] Register Page (role selection: User / Seller)

---

## 6. Dashboard Pages

### 6.1 👤 User Dashboard

| Page | Description |
|------|-------------|
| **Dashboard Home** | Overview of user's full details — name, email, total orders, total spent, recent activity |
| **Update Profile** | User can update personal information — name, email, phone, address, profile photo |
| **Your Sarees** | Table view of all purchased sarees — saree info, price, order date, and payment status (Paid / Unpaid) |
| **Your Reviews** | All reviews submitted by this user — which product, rating, comment, date |

### 6.2 🏪 Seller Dashboard

| Page | Description |
|------|-------------|
| **Dashboard Home** | Overview of seller's details — name, total products listed, total sales, earnings summary |
| **Update Profile** | Seller can update personal/shop information — name, email, shop name, contact, profile photo |
| **Add Product** | Form to list a new saree for sale. Fields include: saree name, description, price, category, fabric type, color, size/measurements, available quantity, images (upload), and any additional tags |
| **Manage Sarees** | Table/list of all sarees posted by this seller with options to: Edit, Delete, View Details |
| **Show Reviews** | All reviews received on seller's products — product name, reviewer, rating, comment, date |

### 6.3 🛡️ Admin Dashboard

| Page | Description |
|------|-------------|
| **Dashboard Home** | Full platform overview — total users, total sellers, total products, total orders, revenue stats |
| **Update Profile** | Admin can update own personal information |
| **Manage All Users** | View all registered users (Users & Sellers). Actions: Delete user, Change role (User ↔ Seller ↔ Admin) |
| **Manage All Reviews** | View all reviews across all products — product name, reviewer, rating, comment. Analytics: which product has the most reviews, most purchases, top-rated sarees, etc. |

---

## 7. Review System

- Only logged-in **Users** who have **purchased** a saree can submit a review
- Review form includes: Star Rating (1–5) + Written Comment
- Reviews are displayed on the Saree Details Page below product info
- Admin can view and manage all reviews from the Admin Dashboard
- Sellers can view reviews on their own products from the Seller Dashboard
- Users can view their own submitted reviews from the User Dashboard

---

## 8. Payment Integration

| Item | Details |
|------|---------|
| **Gateway** | SSLCommerz |
| **Trigger** | Payment triggered from cart / checkout (logged-in Users only) |
| **Success** | After successful payment → order status updated to **Paid** |
| **Failure** | Failed payment → order status remains **Unpaid** |
| **History** | Payment history visible in User Dashboard under Your Sarees |
| **Restriction** | Seller and Admin accounts **cannot** make purchases |

---

## 9. Role-Based Access & Permissions

| Feature | Guest | User (Logged In) | Seller (Logged In) | Admin |
|---------|:-----:|:----------------:|:------------------:|:-----:|
| Browse Sarees | ✅ | ✅ | ✅ | ✅ |
| Search & Filter | ✅ | ✅ | ✅ | ✅ |
| View Details Page | ✅ | ✅ | ✅ | ✅ |
| Add to Cart | ❌ (redirect to login) | ✅ | ❌ | ❌ |
| Place Order / Payment | ❌ | ✅ | ❌ | ❌ |
| Submit Review | ❌ | ✅ (purchased only) | ❌ | ❌ |
| Cart Tab in Navbar | ❌ | ✅ | ❌ | ❌ |
| User Dashboard | ❌ | ✅ | ❌ | ❌ |
| Seller Dashboard | ❌ | ❌ | ✅ | ❌ |
| Admin Dashboard | ❌ | ❌ | ❌ | ✅ |
| Add/Manage Products | ❌ | ❌ | ✅ | ✅ |
| Manage All Users | ❌ | ❌ | ❌ | ✅ |

---

## 10. Navigation (Navbar Behavior)

| Navbar Item | Guest | User | Seller | Admin |
|-------------|:-----:|:----:|:------:|:-----:|
| Home | ✅ | ✅ | ✅ | ✅ |
| Browse Sarees | ✅ | ✅ | ✅ | ✅ |
| Login / Register | ✅ | ❌ | ❌ | ❌ |
| Cart Tab | ❌ | ✅ | ❌ | ❌ |
| Theme Toggle | ✅ | ✅ | ✅ | ✅ |
| Dashboard Link | ❌ | ✅ | ✅ | ✅ |

---

## 11. Add Product Form Fields (Seller)

When a Seller adds a new saree, the form should include:

- [ ] Saree Name
- [ ] Description (rich text or textarea)
- [ ] Price (BDT)
- [ ] Category (e.g. Silk, Cotton, Jamdani, Muslin, etc.)
- [ ] Fabric Type
- [ ] Color
- [ ] Size / Measurements
- [ ] Available Quantity (stock count)
- [ ] Images (multiple image upload)
- [ ] Tags / Keywords
- [ ] Availability Toggle (Available / Out of Stock)

---

## 12. Notes & Technical Guidelines

- **TypeScript only** — no plain JavaScript anywhere in the codebase
- Frontend and Backend are **separate repositories/services**
- Authentication handled by **Better Auth** on the frontend
- All role checks must be enforced on **both frontend and backend**
- Payment gateway: **SSLCommerz**
- UI Components: **shadcn/ui** with **Tailwind CSS**
- Animations: **Motion (Framer Motion)**
- Theme: Light/Dark mode toggle — persistent preference
- Color system: 3 colors — Primary, Secondary, Tertiary/Accent
- Design must be professional and visually polished
- **CRITICAL AI INSTRUCTION:** After every particular step is complete, the AI must commit the changes to Git and push to GitHub for other AIs to have access to the latest code.

---

## 13. Future Features (To Be Added)

- [ ] Additional functionalities TBD by client
- [ ] More pages/sections as requirements grow
- [ ] Wishlist feature
- [ ] Order tracking
- [ ] Seller analytics (sales charts, revenue graphs)
- [ ] Push/email notifications
- [ ] Final PDF export after all requirements are confirmed

---

## Document History

This is a **living document**. More features and details will be added as the project evolves. A final PDF will be generated once all requirements are finalized.
