import express from "express";

const appRouter = express.Router();

appRouter.use('/user')
appRouter.use('/category')
appRouter.use('/subcategory')
appRouter.use('/brand')
appRouter.use('/product')

export default appRouter;
