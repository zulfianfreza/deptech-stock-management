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
  useDeleteTransaction,
  useGetTransactions,
} from "@/services/hooks/use-transaction.service";
import { TTransaction } from "@/types/transaction.type";
import { useCallback } from "react";
import { toast } from "sonner";
import DialogAction from "./_components/dialog-action";

export default function TransactionPage() {
  const dialogAdd = useDialog();

  const dialogDelete = useDialog<TTransaction>();

  const { data, refetch } = useGetTransactions();

  const deleteTransaction = useDeleteTransaction({
    onSuccess: () => {
      toast.success("Delete successfully");
      dialogDelete.toggle();
      refetch();
    },
  });

  const handleConfirmDelete = useCallback(() => {
    if (dialogDelete.data) {
      deleteTransaction.mutate(dialogDelete.data.id);
    }
  }, [deleteTransaction, dialogDelete]);

  return (
    <div className=" p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className=" text-2xl">Transaction</h1>
        <Button size="sm" onClick={() => dialogAdd.open("add")}>
          Add
        </Button>
      </div>
      <div className=" rounded-lg overflow-hidden border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <div className=" flex gap-2">
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

      <DialogAction open={dialogAdd.isShow} toggle={dialogAdd.toggle} />
      <DialogConfirm
        open={dialogDelete.isShow}
        onDelete={handleConfirmDelete}
        toggle={dialogDelete.toggle}
      />
    </div>
  );
}
