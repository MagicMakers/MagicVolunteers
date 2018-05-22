const mongoose = require( "mongoose" );

const Project = mongoose.model( "Project" );

const populateProjects = async () => {
    var projects = [
        {id : 1, name: "Taberele de vara 2018"},
        {id : 2, name: "MagicBOX"},
        {id : 3, name: "MagicHOME Bucuresti"},
        {id : 4, name: "MagicHOME Cluj"},
    ];

    for(var project of projects) {
        saveProject(project);
    }
};

const saveProject = async (data) => {
    const project = new Project(data);

    return project.save();
};

module.exports = {
    populateProjects,
    saveProject
};
