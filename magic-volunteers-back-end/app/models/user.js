const bcrypt = require( "bcrypt" );
const mongoose = require( "mongoose" );

const { Schema } = mongoose;

const projectSchema = new Schema( {
    id: { type: Number, required: true },
    name: { type: String, required: true },
} );

const userSchema = new Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            required: true,
            auto: true,
        },
        email: {
            type: String, unique: true, required: true, dropDups: true,
        },
        password: { type: String, required: true },
        name: { type: String, required: true },
        dob: { type: Date, require: true },
        phone: { type: String, required: true },
        address: {
            city: { type: String, required: true },
            county: { type: String, required: true },
            details: { type: String, required: true },
        },
        background: {
            jobExperience: { type: String, required: true },
            hasExperience: { type: Boolean, required: true },
            experienceDetails: { type: String, required: true },
        },
        references: {
            name: { type: String, required: true },
            contactDetails: { type: String, required: true },
            relationship: { type: String, required: true },
        },
        personalDrive: { type: String, required: true },
        subscribedProjects: [ projectSchema ],
        role: { type: String, required: true, enum: [ "volunteer", "coordinator" ] },
        isGDPRCompliant: { type: Boolean, required: true },
    },
    {
        timestamps: true,
    },
);

// eslint-disable-next-line func-names
userSchema.methods.setPass = function( password ) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync( password, saltRounds );
    this.password = hash;
};

module.exports = mongoose.model( "User", userSchema );
module.exports = mongoose.model( "Project", projectSchema );
