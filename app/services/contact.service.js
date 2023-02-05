const { ObjectId } = require("mongodb");
class ContactService {
    constructor(client) {
        this.Contact = client.db().collection("contacts");
    }

    //hàm kiểm tra dữ liệu đàu vào
    extractConactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        // Remove undefined fields

        // Objects.keys(contact).forEach(
        //     (key) => contact[key] === undefined && delete contact[key]
        // );
        // console.log("qqwww", contact);
        return contact;
    }
    // hàm thêm dữ liệu vào trong bảng
    async create(payload) {
        const contact = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            { $set: { favorite: contact.favorite === true } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }
    // hàm tìm kiếm find để trả về tất cả các mảng
    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }
    // hàm tìm kiếm theo tên
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        })
    }

    // hàm tìm tên theo id
    async findById(id) {
        return await this.Contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    // hàm update theo id
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }
    // Hàm xóa 1 mẫu tập tin theo id
    async delete(id) {
        const result = await this.Contact.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    // Phương thức cho tìm liên hệ yêu thích
    async findFavorite() {
        return await this.find({ favorite: true });
    }

    /// deleteAll
    async deleteAll() {
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = ContactService;