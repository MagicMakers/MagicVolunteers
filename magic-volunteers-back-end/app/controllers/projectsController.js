const extractObject = require( "../utilities/index" );
const projectsRepository = require("../repositories/projectsRepository");

const populateAll = async (req, res) => {
    try {
        await projectsRepository.populateProjects();

        res.success("Projects added successfully");
    } catch(err) {
        res.send(err);
    }
};

const add = async (req, res) => {
    const { project } = req;

    try {
        const addedProject = await projectsRepository.saveProject(req.body);

        res.success( extractObject(
            addedProject,
            [ "id", "name" ],
        ) );
    } catch (err) {
        res.send(err);
    }
};

module.exports = {
    populateAll,
    add
};
