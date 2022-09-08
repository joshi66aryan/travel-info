import express from  "express";
import {createTour, getTours, getTour, getToursByUser, deleteTour, updateTour, toursBySearch, getToursByTag, LikeTour} from "../controllers/tour.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search",toursBySearch);
router.get("/tag/:tag",getToursByTag);
router.get("/",getTours);
router.get("/:id",getTour);

router.delete("/:id",auth, deleteTour);
router.patch("/:id",auth,updateTour);
router.post("/",auth,createTour);
router.get("/userTours/:id",auth,getToursByUser);
router.patch("/like/:id",auth,LikeTour)


export default router;
