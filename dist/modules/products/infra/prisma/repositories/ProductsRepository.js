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
exports.ProductsRepository = void 0;
const client_1 = require("@prisma/client");
const inversify_1 = require("inversify");
let ProductsRepository = class ProductsRepository {
    constructor() {
        this.repository = new client_1.PrismaClient();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, price } = data;
            const value = parseFloat(price).toFixed(2);
            const product = yield this.repository.product.create({
                data: {
                    name,
                    description,
                    price: {
                        create: { value },
                    },
                },
                include: { price: true },
            });
            return product;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.repository.product.findUnique({
                where: { id },
                include: {
                    price: { select: { value: true }, where: { is_current: true } },
                },
            });
            return product;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.repository.product.findFirst({
                where: { name },
                include: {
                    price: { select: { value: true }, where: { is_current: true } },
                },
            });
            return product;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.product.findMany();
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, price } = data;
            if (price) {
                const value = parseFloat(price).toFixed(2);
                const [_, updateProduct] = yield this.repository.$transaction([
                    this.repository.price.updateMany({
                        where: { product_id: id },
                        data: {
                            is_current: false,
                        },
                    }),
                    this.repository.product.update({
                        where: { id },
                        data: {
                            name,
                            description,
                            price: {
                                create: {
                                    value,
                                },
                            },
                        },
                    }),
                ]);
                return updateProduct;
            }
            else {
                return yield this.repository.product.update({
                    where: { id },
                    data: {
                        name,
                        description,
                    },
                });
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [_, deleteProduct] = yield this.repository.$transaction([
                this.repository.price.deleteMany({ where: { product_id: id } }),
                this.repository.product.delete({ where: { id } }),
            ]);
            return deleteProduct;
        });
    }
};
ProductsRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], ProductsRepository);
exports.ProductsRepository = ProductsRepository;
//# sourceMappingURL=ProductsRepository.js.map