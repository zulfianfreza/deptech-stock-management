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
  useDeleteAdmin,
  useGetAdmins,
} from "@/services/hooks/use-admin.service";
import React, { useCallback } from "react";
import { format } from "date-fns";
import useDialog from "@/hooks/use-dialog";
import { TAdmin } from "@/types/admin.type";
import DialogConfirm from "@/components/dialog-confirm";
import { toast } from "sonner";
import DialogAction from "./_components/dialog-action";

export default function AdminPage() {
  const dialogAdd = useDialog();

  const dialogDelete = useDialog<TAdmin>();

  const { data, refetch } = useGetAdmins();

  const deleteAdmin = useDeleteAdmin({
    onSuccess: () => {
      toast.success("Delete successfully");
      dialogDelete.toggle();
      refetch();
    },
  });

  const handleConfirmDelete = useCallback(() => {
    if (dialogDelete.data) {
      deleteAdmin.mutate(dialogDelete.data.id);
    }
  }, [deleteAdmin, dialogDelete]);

  return (
    <div className=" p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className=" text-2xl">Admin</h1>
        <Button size="sm" onClick={() => dialogAdd.open("add")}>
          Add
        </Button>
      </div>
      <div className=" rounded-lg overflow-hidden border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Lastname</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  {format(new Date(item.dob), "dd MMMM yyyy")}
                </TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>
                  <div className=" flex gap-2">
                    {item.firstName !== "Super" && (
                      <Button
                        size="sm"
                        onClick={() => dialogDelete.open("delete", item)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DialogAction open={dialogAdd.isShow} toggle={dialogAdd.toggle} />
      <DialogConfirm
        open={dialogDelete.isShow}
        onDelete={handleConfirmDelete}
        toggle={dialogDelete.toggle}
      />
    </div>
  );
}
