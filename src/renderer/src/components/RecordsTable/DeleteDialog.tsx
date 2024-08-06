import { Trash } from "lucide-react";
import { forwardRef, useState } from "react";
import { toast } from "sonner";
import useDatabase from "~/renderer/hooks/useDatabase";
import { RecordDocType } from "~/renderer/lib/Record.model";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type DeleteDialogProps = {
  record: RecordDocType;
};

const DeleteDialog = forwardRef<HTMLButtonElement, DeleteDialogProps>(
  ({ record }, ref) => {
    const { database } = useDatabase();
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
      await database
        .deleteRecord(record.uuid)
        .then(() =>
          toast.success("Record deleted successfully", { richColors: true }),
        );
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button ref={ref} variant="destructive" className="flex h-8 w-full">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently remove your
              data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button type="button" className="order-2">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={handleDelete}
                className="order-1"
              >
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

export default DeleteDialog;
