"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const user_services_1 = require("./user.services");
const getAllusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_services_1.userService.getAllusers();
        res.status(200).send({ users });
    }
    catch (error) {
        res.send({ message: error });
    }
});
const getASingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        console.log(email);
        const user = yield user_services_1.userService.getASingleUser(email);
        res.status(200).send({ user });
    }
    catch (error) {
        res.send({ message: error });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield user_services_1.userService.createUser(req.body);
        if (result.success) {
            res.status(201).json({
                message: result.message || "User created successfully",
                success: true,
                data: result.data
            });
        }
        else {
            // Determine appropriate status code based on error
            let statusCode = 400;
            if ((_a = result.message) === null || _a === void 0 ? void 0 : _a.includes("already exists")) {
                statusCode = 409; // Conflict
            }
            res.status(statusCode).json({
                message: result.message,
                success: false
            });
        }
    }
    catch (error) {
        console.error("Error in createUser controller:", error);
        res.status(500).json({
            message: error.message || "Failed to create user",
            success: false
        });
    }
});
exports.usersController = {
    getAllusers,
    createUser,
    getASingleUser
};
