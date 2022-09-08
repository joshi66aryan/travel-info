import express from "express";
import TourModal from "../models/tour.js";
import mongoose from "mongoose";

export const createTour = async(req, res) => {
    const tour = req.body;
    const newTour = new TourModal({
        ...tour,
        creator: req.userId,
        createdAt: new Date().toString()
    });
    try{
        await newTour.save();
        res.status(201).json(newTour);
    } catch(err){
        res.status(404).json({message: "something went wrong "})
    }
}

export const getTours = async(req, res) => {
  const {page} = req.query;
    try {
        const limit = 6;
        const startIndex = (Number(page)-1)*limit
        const total = await TourModal.countDocuments({});
        const tours = await TourModal.find().limit(limit).skip(startIndex);
        res.json({
          data:tours,
          currentPage:Number(page),
          totalTours: total,
          numberofPages: Math.ceil(total/limit),
        });
    } catch(err) {
        res.status(404).json({message: 'something went wrong'})
   
    }
};

export const getTour = async(req, res) => {
    const {id} = req.params;
    try {
        const tour =  await TourModal.findById(id);
        res.status(200).json(tour);
    } catch(err) {
        res.status(404).json({message: 'something went wrong'})
   
    }
};

export const getToursByUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const userTours = await TourModal.find({ creator: id });
    res.status(200).json(userTours);
  };


  export const deleteTour = async (req, res) => {
      try{
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({ message: `No tour exists with ${id}` });
        }
        await TourModal.findByIdAndRemove(id);
        res.json({message: "Tour deleted successfully"})
      } catch(err) {
        res.status(404).json({message: 'something went wrong'})
      }

  };

  export const updateTour = async (req, res) => {
    try{
      const { id } = req.params;
      const {title, description, creator, imageFile, tags} = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No tour exists with ${id}` });
      }
      const updatedTour = {
          creator,
          title,
          description,
          tags,
          imageFile,
          _id: id
      }
      await TourModal.findByIdAndUpdate(id, updatedTour, {new: true});
      res.json(updatedTour);
    } catch(err) {
      res.status(404).json({message: 'something went wrong'})
    }

};

export const toursBySearch = async(req, res) => {
  const {query} = req.query;
   try {
      const title = new RegExp(query,"i");
      const tours =  await TourModal.find({title});
      res.status(200).json(tours);
  } catch(err) {
      res.status(404).json({message: 'something went wrong'})
  }
};

export const getToursByTag = async(req, res) => {
  const {tag} = req.params;
  console.log(tag)
   try {
      const tours = await TourModal.find({tags: {$in: tag}});
      res.json(tours);
  } catch(err) {
      res.status(404).json({message: 'something went wrong'})
  }
};

export const LikeTour = async (req,res) => {
  try{
    const {id} = req.params;
    if(!req.userId){
      return res.json({message: "user is not authenticated"})
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exists with ${id}` });
    }
    const tour = await TourModal.findById(id);
    const index = tour.likes.findIndex((id) => id === String(req.userId));
    if(index === -1){
      tour.likes.push(req.userId)
    } else {
      tour.likes = tour.likes.filter((id) => id !== String(req.userId))
    }
  
    const updatedTour = await TourModal.findByIdAndUpdate(id, tour, {new: true});
    res.status(200).json(updatedTour);
  } catch(err){
    res.status(404).json({message: err.message});
  }
}

