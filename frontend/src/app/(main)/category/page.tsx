"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteCategory,
  useGetCategories,
} from "@/services/hooks/use-category.service";
import React, { useCallback } from "react";
import { format } from "date-fns";
import useDialog from "@/hooks/use-dialog";
import { TCategory } from "@/types/category.type";
import DialogConfirm from "@/components/dialog-confirm";
import { toast } from "sonner";
import DialogAction from "./_components/dialog-action";

export default function CategoryPage() {
  const dialogAction = useDialog<TCategory>();

  const dialogDelete = useDialog<TCategory>();

  const { data, refetch } = useGetCategories();

  const deleteCategory = useDeleteCategory({
    onSuccess: () => {
      toast.success("Delete successfully");
      dialogDelete.toggle();
      refetch();
    },
  });

  const handleConfirmDelete = useCallback(() => {
    if (dialogDelete.data) {
      deleteCategory.mutate(dialogDelete.data.id);
    }
  }, [deleteCategory, dialogDelete]);

  return (
    <div className=" p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className=" text-2xl">Category</h1>
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
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
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
