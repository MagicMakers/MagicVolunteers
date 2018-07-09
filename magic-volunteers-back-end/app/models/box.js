const mongoose = require( "mongoose" );

const { Schema } = mongoose;

const boxSchema = new Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true,
        },
        address: {
            city: { type: String, required: true },
            county: { type: String, required: true },
            details: { type: String, required: true },
        },
        name: { type: String, required: true },
        details: { type: String, required: true },
        status: {
            type: String,
            required: true,
            enum: [ "available", "assigned", "confirmed", "delivered" ],
        },
        assignedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        isActive: { type: Boolean, required: true },
    },
    {
        timestamps: true,
    },
);

boxSchema.methods.assignVolunteer = function ( id ) {
    this.assignedVolunteer = id;
};

boxSchema.methods.changeStatus = function ( status ) {
    this.status = status;
};

module.exports = mongoose.model( "Box", boxSchema );
