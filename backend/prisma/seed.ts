import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Classic Black T-Shirt",
        description: "Comfortable cotton t-shirt",
        category: "Casual",
        price: 599,
        imageUrl: "/img/tshirt.jpg"
      },
      {
        name: "Blue Denim Jeans",
        description: "Slim fit denim jeans",
        category: "Casual",
        price: 1499,
        imageUrl: "/img/jeans.jpg"
      },
      {
        name: "Formal White Shirt",
        description: "Perfect for office wear",
        category: "Formal",
        price: 1299,
        imageUrl: "/img/shirt.jpg"
      }
    ]
  });

  const products = await prisma.product.findMany();

  for (const p of products) {
    await prisma.variant.createMany({
      data: [
        { size: "S", stock: 10, productId: p.id },
        { size: "M", stock: 10, productId: p.id },
        { size: "L", stock: 10, productId: p.id }
      ]
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
