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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./product.entity");
const typeorm_2 = require("typeorm");
const microservices_1 = require("@nestjs/microservices");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
        this.client = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [
                    'amqps://eoghmjcc:dawLE9Hqnmwe3hWzZ1D2pGI9fYqQr23l@shark.rmq.cloudamqp.com/eoghmjcc',
                ],
                queue: 'admin_queue',
            },
        });
    }
    async products() {
        return this.productRepository.find();
    }
    async createProduct(data) {
        this.client.emit('createProduct', data);
        return this.productRepository.save(data);
    }
    async getProduct(id) {
        const options = { where: { id } };
        return this.productRepository.findOne(options);
    }
    async updateProduct(id, data) {
        const updateResult = await this.productRepository.update(id, data);
        if (updateResult.affected && updateResult.affected > 0) {
            const options = { where: { id } };
            const updatedProduct = await this.productRepository.findOne(options);
            return updatedProduct;
        }
        else {
            return null;
        }
    }
    async deleteProduct(id) {
        const deleteResult = await this.productRepository.delete(id);
        if (deleteResult.affected && deleteResult.affected > 0) {
            const deletedProduct = { id };
            return deletedProduct;
        }
        else {
            return null;
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map