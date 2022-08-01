import { Request, Response } from "express";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../service/product.service";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const product = await createProduct({ ...body, user: userId });

  return res.send(product);
}

export async function getProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  if (!userId) {
    return res.sendStatus(403);
  }

  const productId = req.params.productId;
  const product = await findProduct({ productId });

  if (!product) return res.sendStatus(404);

  // Check if the user has write permission on the product
  if (product.user.toString() !== userId) return res.sendStatus(403);

  return res.send(product);
}

export async function updateProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  const product = await findProduct({ productId });
  const update = req.body;

  if (!product) return res.sendStatus(404);

  // Check if the user has write permission on the product
  if (product.user.toString() !== userId) return res.sendStatus(403);

  const updatedProduct = await findAndUpdateProduct({ productId }, update, {
    new: true,
  });

  res.send(updatedProduct);
}

export async function deleteProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  const product = await findProduct({ productId });

  if (!product) return res.sendStatus(404);

  // Check if the user has write permission on the product
  if (product.user.toString() !== userId) return res.sendStatus(403);

  const prod = await deleteProduct({ productId });

  return res.send(prod);
}
