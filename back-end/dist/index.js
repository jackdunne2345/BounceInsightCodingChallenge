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
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const readline_1 = __importDefault(require("readline"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../front')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../front', 'index.html'));
});
app.post('/getCountryInfo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countryName = req.body.countryName;
        if (!countryName) {
            throw new CustomError('Country name is missing.', 400);
        }
        yield axios_1.default.get(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => {
            if (response.data[0]) {
                const countryData = response.data[0];
                res.json(countryData);
            }
        })
            .catch(error => {
            if (error.response) {
                res.status(error.response.status).json({ error: error.response.data });
            }
            else {
                res.status(500).json({ error: 'An error occurred while fetching country information.' });
            }
        });
    }
    catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json({ error: { status: error.status, message: error.message } });
        }
        else {
            res.status(500).json({ error: 'An error occurred while fetching country information.' });
        }
        console.log(error);
    }
}));
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Press "q" and Enter to close the server: ', (answer) => {
    if (answer === 'q') {
        console.log('Closing the server...');
        server.close(() => {
            console.log('Server has been closed.');
            rl.close();
        });
    }
});
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.name = this.constructor.name;
        this.status = status || 500;
    }
}
