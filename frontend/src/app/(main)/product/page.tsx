"use client";

import DialogConfirm from "@/components/dialog-confirm";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDialog from "@/hooks/use-dialog";
import {
  useDeleteProduct,
  useGetProducts,
} from "@/services/hooks/use-product.service";
import { TProduct } from "@/types/product.type";
import { useCallback } from "react";
import { toast } from "sonner";
import DialogAction from "./_components/dialog-action";

export default function ProductPage() {
  const dialogAction = useDialog<TProduct>();

  const dialogDelete = useDialog<TProduct>();

  const { data, refetch } = useGetProducts();

  const deleteProduct = useDeleteProduct({
    onSuccess: () => {
      toast.success("Delete successfully");
      dialogDelete.toggle();
      refetch();
    },
  });

  const handleConfirmDelete = useCallback(() => {
    if (dialogDelete.data) {
      deleteProduct.mutate(dialogDelete.data.id);
    }
  }, [deleteProduct, dialogDelete]);

  return (
    <div className=" p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className=" text-2xl">Product</h1>
        <Button size="sm" onClick={() => dialogAction.open("add")}>
          Add
        </Button>
      </div>
      <div className=" rounded-lg overflow-hidden border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.category.name}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>
                  <div className=" flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => dialogAction.open("edit", item)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => dialogDelete.open("delete", item)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DialogAction
        open={dialogAction.isShow}
        toggle={dialogAction.toggle}
        mode={dialogAction.mode}
        data={dialogAction.data}
      />
      <DialogConfirm
        open={dialogDelete.isShow}
        onDelete={handleConfirmDelete}
        toggle={dialogDelete.toggle}
      />
    </div>
  );
}
