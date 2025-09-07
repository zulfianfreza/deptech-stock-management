"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let ResponseInterceptor = class ResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => ({
            success: true,
            message: this.getMessage(context),
            data: data,
        })));
    }
    getMessage(context) {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url;
        if (method === "GET") {
            if (url.includes("/auth/login"))
                return "Login successful";
            if (url.includes("/admin"))
                return "Admin data retrieved successfully";
            if (url.includes("/category"))
                return "Category data retrieved successfully";
            if (url.includes("/product"))
                return "Product data retrieved successfully";
            if (url.includes("/transaction"))
                return "Transaction data retrieved successfully";
            return "Data retrieved successfully";
        }
        if (method === "POST") {
            if (url.includes("/auth/login"))
                return "Login successful";
            if (url.includes("/admin"))
                return "Admin created successfully";
            if (url.includes("/category"))
                return "Category created successfully";
            if (url.includes("/product"))
                return "Product created successfully";
            if (url.includes("/transaction"))
                return "Transaction created successfully";
            return "Data created successfully";
        }
        if (method === "PATCH") {
            if (url.includes("/admin"))
                return "Admin updated successfully";
            if (url.includes("/category"))
                return "Category updated successfully";
            if (url.includes("/product"))
                return "Product updated successfully";
            return "Data updated successfully";
        }
        if (method === "DELETE") {
            if (url.includes("/admin"))
                return "Admin deleted successfully";
            if (url.includes("/category"))
                return "Category deleted successfully";
            if (url.includes("/product"))
                return "Product deleted successfully";
            if (url.includes("/transaction"))
                return "Transaction deleted successfully";
            return "Data deleted successfully";
        }
        return "Operation completed successfully";
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);
//# sourceMappingURL=response.interceptor.js.map