import { Router } from "express";
import AuthRouter from "../V1/router/auth-router";
import ProfileRouter from "../V1/router/profile-router";
import ProductRouter from "../V1/router/product-router";
import CartRouter from "../V1/router/cart-router";
import PaymentRouter from "../V1/router/payment-router";
import TransactionRouter from "../V1/router/transaction-router";
import AdminRouter from "../V1/router/admin-router";

const V1Router = Router();

V1Router.use(AuthRouter);
V1Router.use(ProfileRouter);
V1Router.use(ProductRouter);
V1Router.use(CartRouter);
V1Router.use(PaymentRouter);
V1Router.use(TransactionRouter);
V1Router.use(AdminRouter);

export default V1Router;
