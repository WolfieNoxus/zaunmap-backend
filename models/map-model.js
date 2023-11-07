const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Map Schema
const mapSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    isPublic: { type: Boolean, default: true },
    sourceType: { type: String, enum: ['SHP/DBF', 'GeoJSON', 'KML', 'Forked'] },
    sourceData: Buffer,
    regions: [{
        name: String,
        customData: Schema.Types.Mixed,
        properties: Schema.Types.Mixed
    }],
    graphics: {
        texts: [{
            content: String,
            font: String,
            position: { x: Number, y: Number }
        }],
        colors: {
            fill: String,
            border: String,
            background: String
        },
        legendDetails: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Map', mapSchema);
