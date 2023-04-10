import express from "express";
import subCategoryRouter from "../Modules/SubCategory/subcategory.router";
import categoryRouter from "../Modules/Category/category.router";
import productRouter from "../Modules/Product/product.router";
import couponRouter from "../Modules/Coupon/coupon.router";
import reviewRouter from "../Modules/Review/review.router";
import brandRouter from "../Modules/Brand/brand.router";
import userRouter from "../Modules/User/user.router";

const appRouter = express.Router();

appRouter.use("/subcategory", subCategoryRouter);
appRouter.use("/category", categoryRouter);
appRouter.use("/product", productRouter);
appRouter.use("/coupon", couponRouter);
appRouter.use("/review", reviewRouter);
appRouter.use("/brand", brandRouter);
appRouter.use("/user", userRouter);

export default appRouter;
