const db = require('../database');

class Device {
    constructor(id, device_name, brand, price){
        this.id = id;
        this.device_name = device_name;
        this.brand = brand;
        this.price = price;
    }

    static async getAllDevices() {
        const query = 'SELECT * FROM devices';
        try {
            const [results] = await db.execute(query);
            return results;
        }catch (err) {
            throw err;
        }
    }

    async addDevice() {
        const {id, device_name, brand, price} = this;
        const query = 'INSERT INTO devices (id, device_name, brand, price) VALUES (?, ?, ?, ?)';
        try {
            await db.execute(query, [id, device_name, brand, price]);
        }catch (err) {
            throw err;
        }
    }

    static async getDeviceById(id) {
        const query = 'SELECT * FROM devices WHERE id = ?';
        try {
            const [results] = await db.execute(query, [id]);
            if (results.length === 0) {
                throw 'Device not found';
            }
            return results[0];
        }catch (err) {
            throw err;
        }
    }

    async updateDevice() {
        const {id, device_name, brand, price} = this;
        const query ='UPDATE devices SET device_name = ?, brand = ?, price = ?, WHERE id = ?';
        try {
            const [results] = await db.execute(query, [id, device_name, brand, price]);
            if (results.affectedRows === 0) {
                throw 'Device not found';
            }
        }catch (err) {
            throw err;
        }
    }

    static async deleteDevice(id) {
        const query = 'DELETE FROM devices WHERE id = ?';
        try {
            const [results] = await db.execute(query, [id]);
            if (results.affectedRows === 0) {
                throw 'Device not found';
            }
        }catch (err) {
            throw err;
        }
    }
    
}

module.exports = Device;