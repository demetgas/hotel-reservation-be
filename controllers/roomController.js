import Room from "../modelsof/Room.js";
import Room from "../modelsof/Room.js";
import { createError } from "../utils/error.js";

//Creating a room
export const createRoom = async (req, res, next) => {
  const RoomId = req.params.RoomId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Room.findByIdAndUpdate(RoomId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};
//Deleting a room
export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    //if its succesfull we will delete the Room
    res.status(200).json("You just deleted the Room.");
    //if not we will have an error
  } catch (e) {
    next(e);
  }
};
//Updating existing Rooms
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body } /*updates*/,
      { new: true } /*returns the updated version */
    );

    //if its succesfull we will get the updated Room

    res.status(200).json(updatedRoom);

    //if not we will have an error
  } catch (e) {
    next(e);
  }
};
//Getting a specific Room
export const getRoom = async (req, res, next) => {
  try {
    const Room = await Room.findById(req.params.id);

    //if its succesfull we will get the Rooms
    res.status(200).json(Room);

    //if not we will have an error
  } catch (e) {
    next(e);
  }
};
//Getting all the Rooms that exist
export const getAllRooms = async (req, res, next) => {
  try {
    const Rooms = await Room.find();

    //if its succesfull we will get the Room
    res.status(200).json(Rooms);

    //if not we will have  an error
  } catch (e) {
    next(e);
  }
};
