const mongoose = require( "mongoose" );

const Project = mongoose.model( "Project" );

const saveProject = project => new Project( project ).save();

const populateProjects = () => {
    const projects = [
        { id: 1, name: "Taberele de vara 2018" },
        { id: 2, name: "MagicBOX" },
        { id: 3, name: "MagicHOME Bucuresti" },
        { id: 4, name: "MagicHOME Cluj" },
    ];

    const promises = projects.map( saveProject );
    return Promise.all( promises );
};

module.exports = {
    populateProjects,
    saveProject,
};
