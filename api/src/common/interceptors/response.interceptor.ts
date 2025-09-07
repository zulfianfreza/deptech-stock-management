import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        message: this.getMessage(context),
        data: data,
      }))
    );
  }

  private getMessage(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;

    // Customize message based on HTTP method and endpoint
    if (method === "GET") {
      if (url.includes("/auth/login")) return "Login successful";
      if (url.includes("/admin")) return "Admin data retrieved successfully";
      if (url.includes("/category"))
        return "Category data retrieved successfully";
      if (url.includes("/product"))
        return "Product data retrieved successfully";
      if (url.includes("/transaction"))
        return "Transaction data retrieved successfully";
      return "Data retrieved successfully";
    }

    if (method === "POST") {
      if (url.includes("/auth/login")) return "Login successful";
      if (url.includes("/admin")) return "Admin created successfully";
      if (url.includes("/category")) return "Category created successfully";
      if (url.includes("/product")) return "Product created successfully";
      if (url.includes("/transaction"))
        return "Transaction created successfully";
      return "Data created successfully";
    }

    if (method === "PATCH") {
      if (url.includes("/admin")) return "Admin updated successfully";
      if (url.includes("/category")) return "Category updated successfully";
      if (url.includes("/product")) return "Product updated successfully";
      return "Data updated successfully";
    }

    if (method === "DELETE") {
      if (url.includes("/admin")) return "Admin deleted successfully";
      if (url.includes("/category")) return "Category deleted successfully";
      if (url.includes("/product")) return "Product deleted successfully";
      if (url.includes("/transaction"))
        return "Transaction deleted successfully";
      return "Data deleted successfully";
    }

    return "Operation completed successfully";
  }
}
