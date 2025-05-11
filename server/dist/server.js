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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const prisma_1 = __importDefault(require("./lib/prisma"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/todos", todoRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Server çalışıyor 🚀");
});
const PORT = process.env.PORT || 5000;
// Initialize server with database connection
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma_1.default.$connect();
            console.log('✅ Database connected successfully');
            app.listen(PORT, () => {
                console.log(`✅ Server is running on port ${PORT}`);
            });
        }
        catch (error) {
            console.error('❌ Database connection error:', error);
            process.exit(1);
        }
    });
}
startServer();
// Handle graceful shutdown
process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$disconnect();
    process.exit(0);
}));
