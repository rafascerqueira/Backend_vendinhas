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
exports.UpdateProductController = void 0;
const inversify_config_1 = __importDefault(require("@shared/container/inversify.config"));
const UpdateProductUseCase_1 = require("../useCases/UpdateProductUseCase");
class UpdateProductController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const payload = request.body;
            const updateProduct = inversify_config_1.default.resolve(UpdateProductUseCase_1.UpdateProductUseCase);
            const product = updateProduct.execute(parseInt(id), payload);
            return response.json(product);
        });
    }
}
exports.UpdateProductController = UpdateProductController;
//# sourceMappingURL=UpdateProductController.js.map