import { Product } from "@prisma/client";
import prisma from "../libs/prisma";
import { ProductDTO } from "./../DTO/product-DTO";

class ProductRepository {
  async post(productDTO: ProductDTO): Promise<Product> {
    const { images, profileId, ...otherProductDto } = productDTO;
    console.log(otherProductDto)
    console.log(profileId)
    console.log(images)

    return await prisma.product.create({
      data: {
        ...otherProductDto,
        profileId: +profileId,
        images: {
          createMany: {
            data: images, // Menambahkan gambar baru
          },
        },
      },
    });
  }

  async getAllProducts(): Promise<Product[]> {
    return await prisma.product.findMany({
      include: {
        images: true,
      },
    });
  }

  async update(productDTO: ProductDTO, productId: number): Promise<Product> {
    const { images, profileId, quantity, ...otherProductDto } = productDTO;

    return await prisma.product.update({
      where: { id: productId },
      data: {
        ...otherProductDto,
        quantity: +quantity,
        images: {
          deleteMany: {},
          createMany: {
            data: images,
          },
        },
      },
    });
  }
  async delete(productId: number): Promise<Product> {
    return await prisma.product.delete({ where: { id: productId } });
  }
}

export default new ProductRepository();
