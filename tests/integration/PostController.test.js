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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app")); // путь к вашему Express приложению
describe('POST /posts', () => {
    it('should create a new post', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/posts')
            .send({ title: 'Test Post', content: 'This is a test post.' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Test Post');
    }));
});
describe('GET /posts/:id', () => {
    it('should get a post by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield (0, supertest_1.default)(app_1.default)
            .post('/posts')
            .send({ title: 'Another Post', content: 'This is another post.' });
        const postId = createResponse.body.id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/posts/${postId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', postId);
        expect(response.body.title).toBe('Another Post');
    }));
});
// Добавьте другие тесты для PUT, DELETE и других маршрутов
