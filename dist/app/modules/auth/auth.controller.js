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
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("data......", req.body);
        const result = yield auth_service_1.authService.userLogin(req.body);
        if (!result.success) {
            return res.status(401).send({
                success: false,
                message: result.message
            });
        }
        res.status(200).send({
            message: "user logged In Successfully",
            success: true,
            user: result.user
        });
    }
    catch (error) {
        res.status(400).send({
            message: "something went wrong",
            success: false,
            error
        });
    }
});
exports.authController = {
    userLogin
};
