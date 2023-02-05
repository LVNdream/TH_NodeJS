
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");



// exports.create = (req, res) => {
//     res.send({ message: "create hanlder" });
// };

// exports.findAll = (req, res) => {
//     res.send({ message: "findAll hanlder" });
// };

// exports.findOne = (req, res) => {
//     res.send({ message: "findOne hanlder" });
// };

// exports.update = (req, res) => {
//     res.send({ message: "update hanlder" });
// };

// exports.delete = (req, res) => {
//     res.send({ message: "delete hanlder" });
// };

// exports.deleteAll = (req, res) => {
//     res.send({ message: "deleteAll hanlder" });
// };

// exports.findAllFavorite = (req, res) => {
//     res.send({ message: "findAllFavorite hanlder" });
// };

exports.create = async (req, res, next) => {

    if (!req.body?.name) {
        return next(new ApiError(400, "Name not be empty"));
    }
    try {

        // console.log(req.body);
        const contactService = new ContactService(MongoDB.client);
        //console.log(req.body);
        const document = await contactService.create(req.body);
        // const document = contactService.extractConactData(req.body);
        console.log(document);

        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while create the contact")
        );
    }
};

exports.findAll = async (req, res, next) => {
    //
    //console.log(req.query);
    let documents = [];
    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        console.log(name);
        if (name) {
            documents = await contactService.findByName(name);
        }
        else {
            documents = await contactService.find({})
        }
    } catch (error) {
        return (next(new ApiError(500, "An error occurred while retrieving contacts")));
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    //console.log(req.params)
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        console.log(document)
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document)
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id = ${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        // console.log(req.body);
        // console.log('ssdsdsdsds');
        // console.log(req.params);
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error updating contact with id = ${re.params.id}`));
    }
};

// Hàm xóa 1 mẫu dữu liệu the id
exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was deleted successfully" })
    } catch (error) {
        return next(new ApiError(500, `Could not delete contact with id = ${req.params.id}`));
    }
};

exports.findAllFavorite = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents)
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while retrieving favorite contacts"
            )
        );
    }
};
exports.deleteAll = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deleteCount = await contactService.deleteAll();
        return res.send({ message: `${deleteCount} contacts were deleted successfully` })
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving favorite contacts"));
    }
};
