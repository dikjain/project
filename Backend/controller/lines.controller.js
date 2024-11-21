import Lines from "../models/Lines.model.js"; // Corrected the import path to match the file name
import Users from "../models/User.model.js"; // Import Users model to handle user updates

export const createLine = async (req, res) => {
    try {
        const { content, userid } = req.body;
        const line = await Lines.create({ content, createdBy: userid });
        res.status(201).json(line);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getLines = async (req, res) => {
    try {
        const lines = await Lines.find().populate('createdBy', 'username email');
        res.status(200).json(lines);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const likeLine = async (req, res) => {
    try {
        const { lineId, userid } = req.params;
        const line = await Lines.findById(lineId);

        if (!line) {
            return res.status(404).json({ message: "Line not found" });
        }

        if (line.likedBy.includes(userid)) {
            return res.status(400).json({ message: "You have already liked this line" });
        }

        if (line.dislikedBy.includes(userid)) {
            await Lines.findByIdAndUpdate(
                lineId,
                { $inc: { dislikes: -1 }, $pull: { dislikedBy: userid } }
            );
        }

        const updatedLine = await Lines.findByIdAndUpdate(
            lineId,
            { $inc: { likes: 1 }, $addToSet: { likedBy: userid } },
            { new: true }
        ).populate('createdBy', 'username email');

        await Users.findByIdAndUpdate(userid, { $addToSet: { likedLines: lineId }, $pull: { dislikedLines: lineId } });
        res.status(200).json(updatedLine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const dislikeLine = async (req, res) => {
    try {
        const { lineId, userid } = req.params;
        const line = await Lines.findById(lineId);

        if (!line) {
            return res.status(404).json({ message: "Line not found" });
        }

        if (line.dislikedBy.includes(userid)) {
            return res.status(400).json({ message: "You have already disliked this line" });
        }

        if (line.likedBy.includes(userid)) {
            await Lines.findByIdAndUpdate(
                lineId,
                { $inc: { likes: -1 }, $pull: { likedBy: userid } }
            );
        }

        const updatedLine = await Lines.findByIdAndUpdate(
            lineId,
            { $inc: { dislikes: 1 }, $addToSet: { dislikedBy: userid } },
            { new: true }
        ).populate('createdBy', 'username email');

        await Users.findByIdAndUpdate(userid, { $addToSet: { dislikedLines: lineId }, $pull: { likedLines: lineId } });
        res.status(200).json(updatedLine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getLikedLines = async (req, res) => {
    try {
        const { userid } = req.params;
        const lines = await Lines.find({ likedBy: userid }).populate('createdBy', 'username email');
        res.status(200).json(lines);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const myLines = async (req, res) => {
    try {
        const { userid } = req.params;
        const lines = await Lines.find({ createdBy: userid }).populate('createdBy', 'username email');
        res.status(200).json(lines);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteLine = async (req, res) => {
    try {
        const { lineId } = req.params;
        const line = await Lines.findByIdAndDelete(lineId).populate('createdBy', 'username email');
        res.status(200).json(line);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
