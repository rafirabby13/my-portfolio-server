"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const skills_routes_1 = require("./app/modules/skills/skills.routes");
const projects_routes_1 = require("./app/modules/projects/projects.routes");
const user_routes_1 = require("./app/modules/user/user.routes");
const auth_routes_1 = require("./app/modules/auth/auth.routes");
const posts_routes_1 = require("./app/modules/posts/posts.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1/skill", skills_routes_1.skillRouter);
app.use("/api/v1/project", projects_routes_1.projectRouter);
app.use("/api/v1/user", user_routes_1.userRouter);
app.use("/api/v1/auth", auth_routes_1.authRouter);
app.use("/api/v1/post", posts_routes_1.postsRouter);
app.get("/", (req, res) => {
    res.status(200).send({
        message: "Hello to my Portfolio"
    });
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});
app.use((err, req, res, next) => {
    console.error("Global error:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
});
exports.default = app;
