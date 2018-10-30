const mongoose = require( "mongoose" );

const { Schema } = mongoose;

const boxSchema = new Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            required: true,
            auto: true,
        },
        address: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
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

boxSchema.methods.assignVolunteer = function assignVolunteer( id ) {
    this.assignedVolunteer = id;
    this.status = "assigned";
};

boxSchema.methods.changeStatus = function changeStatus( status ) {
    this.status = status;
};

boxSchema.methods.update = function update( data ) {
    const {
        name, address, details, isActive,
    } = data;
    this.name = name;
    this.address = address;
    this.details = details;
    this.isActive = isActive;
};

module.exports = mongoose.model( "Box", boxSchema );
