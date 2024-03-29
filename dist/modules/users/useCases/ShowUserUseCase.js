"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.ShowUserUseCase = void 0;
const types_1 = __importDefault(require("@shared/container/types"));
const excludeFields_1 = require("@shared/services/excludeFields");
const inversify_1 = require("inversify");
let ShowUserUseCase = class ShowUserUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findById(id);
            if (!user) {
                return { message: "Uncaught user" };
            }
            // WARNING
            // This is a f#ck1ng important line. Don't delete it!
            const treatedUser = (0, excludeFields_1.exclude)(user, "password");
            return treatedUser;
        });
    }
};
ShowUserUseCase = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.default.UsersRepository)),
    __metadata("design:paramtypes", [Object])
], ShowUserUseCase);
exports.ShowUserUseCase = ShowUserUseCase;
//# sourceMappingURL=ShowUserUseCase.js.map