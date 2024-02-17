import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
    name: {type: String, required: true},
    title: {type: String, required: true},
    img: {type: String},
    popularity: {type: Number, required: true},
    votesNumber: { type: Number, default: 0 },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }]
});

const voteSchema = new mongoose.Schema({
    character: {type: mongoose.Schema.Types.ObjectId, ref: 'Character'},
}, { timestamps: true })

const Character = mongoose.model('Character', characterSchema);
const Vote = mongoose.model('Vote', voteSchema);

export {
    Character,
    Vote
}