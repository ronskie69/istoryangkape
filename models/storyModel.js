const mongoose = require('mongoose');

const StoryChema = new mongoose.Schema({
    id: { type:Number },
    title:{ type:String, required: true },
    nickname: { type: String, required: true },
    story: { type: String, required: true },
    senderEmail: { type: String, required: true },
    storyType: { type: String, required: true },
    date: { type: Date, default: new Date().toLocaleDateString(), required: true },
},{timestamps: true });

const Story = mongoose.model('istorya_stories', StoryChema);

module.exports = Story