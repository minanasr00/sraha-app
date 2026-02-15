import { successResponse } from "../../common/index.js";
import { Router } from "express";
import { login, signup } from './user.service.js';

const router = Router();

router.post("/signup", async (req, res, next) => {
  try {
    const user = await signup(req.body);
    return successResponse({
      res,
      statusCode: 201,
      message: "user created successfully",
      data: user,
    });

  } catch (error) {
    next(error);
  }
});


router.post("/login", async (req, res, next) => {
  try {
    const user = await login(req.body);
    return successResponse({
      res,
      statusCode: 200,
      message: "user logged in successfully",
      data: user,
    });

  } catch (error) {
    next(error);
  }
});

export default router;
