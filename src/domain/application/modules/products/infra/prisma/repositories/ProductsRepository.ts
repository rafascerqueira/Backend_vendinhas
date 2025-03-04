import type { ICreateProductDTO } from "domain/application/modules/products/dtos/ICreateProductDTO";
import type { IUpdateProductDTO } from "domain/application/modules/products/dtos/IUpdateProductDTO";
import type { IProductsRepository } from "domain/application/modules/products/repositories/IProductsRepository";
import { PrismaClient, type Product } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class ProductsRepository implements IProductsRepository {
	private repository: PrismaClient;

	constructor() {
		this.repository = new PrismaClient();
	}

	async create(data: ICreateProductDTO): Promise<Product> {
		const { name, description, price } = data;
		const value = Number.parseFloat(price).toFixed(2);

		const product = await this.repository.product.create({
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
	}

	async findById(id: number): Promise<Product | null> {
		const product = await this.repository.product.findUnique({
			where: { id },
			include: {
				price: { select: { value: true }, where: { is_current: true } },
			},
		});

		return product;
	}

	async findByName(name: string): Promise<Product | null> {
		const product = await this.repository.product.findFirst({
			where: { name },
			include: {
				price: { select: { value: true }, where: { is_current: true } },
			},
		});

		return product;
	}

	async getAll(): Promise<Product[]> {
		return await this.repository.product.findMany();
	}

	async update(id: number, data: IUpdateProductDTO): Promise<Product> {
		const { name, description, price } = data;

		if (price) {
			const value = Number.parseFloat(price).toFixed(2);

			const [_, updateProduct] = await this.repository.$transaction([
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
			// biome-ignore lint/style/noUselessElse: <explanation>
		} else {
			return await this.repository.product.update({
				where: { id },
				data: {
					name,
					description,
				},
			});
		}
	}

	async delete(id: number): Promise<Product> {
		const [_, deleteProduct] = await this.repository.$transaction([
			this.repository.price.deleteMany({ where: { product_id: id } }),
			this.repository.product.delete({ where: { id } }),
		]);

		return deleteProduct;
	}
}
