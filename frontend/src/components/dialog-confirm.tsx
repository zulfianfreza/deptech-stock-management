import { EMPTY_FUNCTION } from "@/lib/utils";
import { Dialog, DialogClose, DialogContent, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";

type TProps = {
  open: boolean;
  toggle: () => void;
  onDelete?: () => void;
};

export default function DialogConfirm({
  open,
  toggle,
  onDelete = EMPTY_FUNCTION,
}: TProps) {
  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <h1 className="text-xl font-semibold">Confirm</h1>
          <p className="text-sm">Are you sure want to delete this?</p>
        </div>
        <DialogFooter className=" sm:justify-center flex">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={onDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
