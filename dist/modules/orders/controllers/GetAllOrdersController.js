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
exports.GetAllOrdersController = void 0;
const inversify_config_1 = __importDefault(require("@shared/container/inversify.config"));
const GetAllOrdersUseCase_1 = require("../useCases/GetAllOrdersUseCase");
class GetAllOrdersController {
    handle(_, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const getAllOrders = inversify_config_1.default.resolve(GetAllOrdersUseCase_1.GetAllOrdersUseCase);
            const orders = yield getAllOrders.execute();
            return response.json(orders);
        });
    }
}
exports.GetAllOrdersController = GetAllOrdersController;
//# sourceMappingURL=GetAllOrdersController.js.map