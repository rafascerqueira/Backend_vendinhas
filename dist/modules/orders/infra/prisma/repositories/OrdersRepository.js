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
exports.OrdersRepository = void 0;
const client_1 = require("@prisma/client");
const calculatePurchaseAmount_1 = require("@shared/services/calculatePurchaseAmount");
const formatedQueries_1 = require("@shared/services/formatedQueries");
const inversify_1 = require("inversify");
let OrdersRepository = class OrdersRepository {
    constructor() {
        this.repository = new client_1.PrismaClient();
    }
    create(customer_id, productList) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.repository.order.create({
                data: { customer_id, products: { createMany: { data: productList } } },
            });
            const amount = yield (0, calculatePurchaseAmount_1.calculatePurchaseAmount)({
                repository: this.repository,
                productList,
            });
            return yield this.repository.order.update({
                where: { id: order.id },
                data: { amount },
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.order.findMany();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.order.findUniqueOrThrow({
                where: {
                    id,
                },
                include: {
                    customer: {
                        select: { name: true },
                    },
                    products: {
                        select: {
                            product: {
                                select: {
                                    name: true,
                                    description: true,
                                    price: { select: { value: true }, where: { is_current: true } },
                                },
                            },
                            quantity: true,
                        },
                    },
                },
            });
            const order = (0, formatedQueries_1.formatedOrder)(query);
            return order;
        });
    }
    update(id, productList) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.order.update({
                where: { id },
                data: { products: { deleteMany: {} } },
            });
            const amount = yield (0, calculatePurchaseAmount_1.calculatePurchaseAmount)({
                repository: this.repository,
                productList,
            });
            return yield this.repository.order.update({
                where: { id },
                data: { amount, products: { createMany: { data: productList } } },
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.order.delete({ where: { id } });
        });
    }
};
OrdersRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], OrdersRepository);
exports.OrdersRepository = OrdersRepository;
//# sourceMappingURL=OrdersRepository.js.map