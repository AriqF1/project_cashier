import {
  DashboardDescription,
  DashboardHeader,
  DashboardLayout,
  DashboardTitle,
} from "@/components/layouts/DashboardLayout";
import type { NextPageWithLayout } from "../_app";
import { useState, type ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/data/mock";
import { ProductMenuCard } from "@/components/shared/product/ProductMenuCard";
import { ProductCatalogCard } from "@/components/shared/product/ProductCatalogCard";
import { api } from "@/utils/api";
import { Form, useFormContext } from "react-hook-form";
import type { Product } from "@prisma/client";
import type { ProductFormSchema } from "@/forms/products";

const ProductsPage: NextPageWithLayout = () => {
  const apiUtils = api.useUtils();
  const { data: products } = api.product.getProducts.useQuery();

  const [createProductDialogOpen, setCreateProductDialogOpen] = useState();

  const { mutate: createProduct } = api.product.createProduct.useMutation({
    onSuccess: async () => {
      await apiUtils.product.getProducts?.invalidate();
      // Reset the form and close the dialog
      alert("Product created successfully");
    },
  });

  const form = useFormContext<ProductFormSchema>();

  const handleSubmitCreateProduct = (values: ProductFormSchema) => {
    createProduct({
      name: values.name,
      price: values.price,
      categoryId: values.categoryId,
    });
    form.reset();
    alert("Product created successfully");
  };

  return (
    <>
      <DashboardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <DashboardTitle>Product Management</DashboardTitle>
            <DashboardDescription>
              View, add, edit, and delete products in your inventory.
            </DashboardDescription>
          </div>

          <Button>Add New Product</Button>
        </div>
      </DashboardHeader>
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Product Menu</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(products ?? []).map((product) => (
            <ProductCatalogCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.imageUrl ?? ""}
              category={product.category.name}
            />
          ))}
        </div>
      </div>
    </>
  );
};

ProductsPage.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ProductsPage;
