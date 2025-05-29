import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { ProductFormSchema } from "@/forms/products";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type Category = {
  id: string;
  name: string;
};

type ProductFormProps = {
  onSubmit: (values: ProductFormSchema) => void;
  categories: Category[];
};

export const ProductForm = ({ onSubmit, categories }: ProductFormProps) => {
  const form = useFormContext<ProductFormSchema>();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files?.length > 0) {
      const file = files[0];

      if (!file) return;
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                name={field.name}
                disabled={field.disabled}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-1">
        <Label>Product Image</Label>

        <Input type="file" accept="image/*" />
      </div>
    </form>
  );
};
