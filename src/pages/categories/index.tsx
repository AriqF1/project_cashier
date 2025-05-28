import {
  DashboardDescription,
  DashboardHeader,
  DashboardLayout,
  DashboardTitle,
} from "@/components/layouts/DashboardLayout";
import { CategoryCatalogCard } from "@/components/shared/category/CategoryCatalogCard";
import { CategoryForm } from "@/components/shared/category/CategoryForm";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CATEGORIES, type Category } from "@/data/mock";
import { categoryFormSchema, type CategoryFormSchema } from "@/forms/category";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactElement } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { NextPageWithLayout } from "../_app";
import { api } from "@/utils/api";

const CategoriesPage: NextPageWithLayout = () => {
  const [createCategoryDialogOpen, setCreateCategoryDialogOpen] =
    useState(false);
  const [editCategoryDialogOpen, setEditCategoryDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [categoryToEdit, setCategoryToEdit] = useState<string | null>(null);

  const createCategoryForm = useForm<CategoryFormSchema>({
    resolver: zodResolver(categoryFormSchema),
  });

  const editCategoryForm = useForm<CategoryFormSchema>({
    resolver: zodResolver(categoryFormSchema),
  });

  const apiUtils = api.useUtils();
  const { data: categories } = api.category.getCategories.useQuery();

  const { mutate: createCategory } = api.category.createCategory.useMutation({
    onSuccess: async () => {
      await apiUtils.category.getCategories?.invalidate();
      // Reset the form and close the dialog
      alert("Category created successfully");

      // Reset the form
      createCategoryForm.reset();

      // Close the dialog
      setCreateCategoryDialogOpen(false);
    },
  });

  const { mutate: deleteCategory } = api.category.deleteCategory.useMutation({
    onSuccess: async () => {
      await apiUtils.category.getCategories?.invalidate();
      alert("Category deleted successfully");

      // Reset the category to delete
      setCategoryToDelete(null);
    },
  });

  const { mutate: editCategory } = api.category.editCategory.useMutation({
    onSuccess: async () => {
      await apiUtils.category.getCategories?.invalidate();
      alert("Category edited successfully");

      // Reset the form and close the dialog
      editCategoryForm.reset();
      setEditCategoryDialogOpen(false);
    },
  });

  const handleSubmitCreateCategory = (data: CategoryFormSchema) => {
    createCategory(data);
  };

  const handleSubmitEditCategory = (data: CategoryFormSchema) => {
    if (!categoryToEdit) return;
    editCategory({ id: categoryToEdit, name: data.name });
  };

  const handleClickEditCategory = (category: Category) => {
    setEditCategoryDialogOpen(true);

    editCategoryForm.reset({
      name: category.name,
    });
  };

  const handleClickDeleteCategory = (id: string) => {
    setCategoryToDelete(id);
  };

  return (
    <>
      <DashboardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <DashboardTitle>Category Management</DashboardTitle>
            <DashboardDescription>
              Organize your products with custom categories.
            </DashboardDescription>
          </div>

          <AlertDialog
            open={createCategoryDialogOpen}
            onOpenChange={setCreateCategoryDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button>Add New Category</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add New Category</AlertDialogTitle>
              </AlertDialogHeader>
              <Form {...createCategoryForm}>
                <CategoryForm
                  onSubmit={handleSubmitCreateCategory}
                  submitText="Create Category"
                />
              </Form>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  onClick={createCategoryForm.handleSubmit(
                    handleSubmitCreateCategory,
                  )}
                >
                  Create Category
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DashboardHeader>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories && categories.length > 0 ? (
          categories.map(
            (category: { id: string; name: string; productCount: number }) => (
              <CategoryCatalogCard
                key={category.id}
                name={category.name}
                productCount={category.productCount}
                onDelete={() => handleClickDeleteCategory(category.id)}
                onEdit={() => {
                  setCategoryToEdit(category.id);
                  handleClickEditCategory({
                    id: category.id,
                    name: category.name,
                    count: category.productCount,
                  });
                }}
              />
            ),
          )
        ) : (
          <div className="col-span-1">
            <p className="text-muted-foreground">No categories found</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Get started by creating your first category
            </p>
          </div>
        )}
      </div>

      <AlertDialog
        open={editCategoryDialogOpen}
        onOpenChange={setEditCategoryDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Category</AlertDialogTitle>
          </AlertDialogHeader>
          <Form {...editCategoryForm}>
            <CategoryForm
              onSubmit={handleSubmitEditCategory}
              submitText="Edit Category"
            />
          </Form>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={editCategoryForm.handleSubmit(handleSubmitEditCategory)}
            >
              Edit Category
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={!!categoryToDelete}
        onOpenChange={(open) => {
          if (!open) {
            setCategoryToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure you want to delete this category? This action cannot be
            undone.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                if (categoryToDelete) {
                  deleteCategory({ id: categoryToDelete });
                }
              }}
            >
              Confirm Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

CategoriesPage.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CategoriesPage;
