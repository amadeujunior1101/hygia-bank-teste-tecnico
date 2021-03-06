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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Post_1 = __importDefault(require("../../../Models/Post"));
var PostValidator_1 = __importDefault(require("../../../Validators/PostValidator"));
exports.default = {
    index: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, post, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.query.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Post_1.default.findOne({ _id: id })
                                .populate("category")
                                .populate("author")];
                    case 2:
                        post = _a.sent();
                        if (post)
                            return [2 /*return*/, res.json(post)];
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.json({ message: "post not exists" })];
                    case 4: return [2 /*return*/, res.json({ message: "error find post" })];
                }
            });
        });
    },
    store: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, subTitle, content, visibility, imageNameUUID, imageNameReal, category, author, post, postsAll, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, title = _a.title, subTitle = _a.subTitle, content = _a.content, visibility = _a.visibility, imageNameUUID = _a.imageNameUUID, imageNameReal = _a.imageNameReal, category = _a.category, author = _a.author;
                        post = {
                            title: title,
                            subTitle: subTitle,
                            content: content,
                            visibility: visibility,
                            imageNameUUID: imageNameUUID,
                            imageNameReal: imageNameReal,
                            category: category,
                            author: author
                        };
                        PostValidator_1.default(post, res);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Post_1.default.create({
                                title: title,
                                subTitle: subTitle,
                                content: content,
                                visibility: visibility,
                                imageNameUUID: imageNameUUID,
                                imageNameReal: imageNameReal,
                                category: category,
                                author: author,
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, Post_1.default.find()];
                    case 3:
                        postsAll = _b.sent();
                        return [2 /*return*/, res.json({ error: false, message: "post created successfully", posts: postsAll })];
                    case 4:
                        error_2 = _b.sent();
                        return [2 /*return*/, res
                                .status(400)
                                .json({ error: true, message: "post created failed" })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    show: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var postAll, headline, featured, special, several;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Post_1.default.find()
                            .populate("category")
                            .populate("author")];
                    case 1:
                        postAll = _a.sent();
                        return [4 /*yield*/, Post_1.default.findOne({ visibility: "headline" })
                                .populate("category")
                                .populate("author")
                                .sort({ _id: -1 })
                            // .limit(1);
                        ];
                    case 2:
                        headline = _a.sent();
                        return [4 /*yield*/, Post_1.default.find({ visibility: "featured" })
                                .populate("category")
                                .populate("author")
                                .sort({ _id: -1 })
                                .limit(3)];
                    case 3:
                        featured = _a.sent();
                        return [4 /*yield*/, Post_1.default.find({ visibility: "special" })
                                .populate("category")
                                .populate("author")
                                .sort({ _id: -1 })
                                .limit(3)];
                    case 4:
                        special = _a.sent();
                        return [4 /*yield*/, Post_1.default.find({ visibility: "several" })
                                .populate("category")
                                .populate("author")
                                .sort({ _id: -1 })
                                .limit(5)];
                    case 5:
                        several = _a.sent();
                        return [2 /*return*/, res.json({
                                error: false,
                                headline: [headline],
                                featured: featured,
                                special: special,
                                several: several,
                                postAll: postAll,
                            })];
                }
            });
        });
    },
    delete: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, author_id, author, posts, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, id = _a.id, author_id = _a.author_id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, Post_1.default.findOne({ author: author_id })];
                    case 2:
                        author = _b.sent();
                        if (!author)
                            return [2 /*return*/, res.json({ msg: "você não pode excluir esse post!" })];
                        return [4 /*yield*/, Post_1.default.deleteMany({ _id: id })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, Post_1.default.find()];
                    case 4:
                        posts = _b.sent();
                        return [2 /*return*/, res
                                .status(200)
                                .json({
                                message: "post deleted successfully",
                                error: false,
                                info: posts,
                            })];
                    case 5:
                        error_3 = _b.sent();
                        return [2 /*return*/, res
                                .status(200)
                                .json({ error: true, message: "post not found" })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
};
