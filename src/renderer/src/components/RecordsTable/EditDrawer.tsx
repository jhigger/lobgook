import { Edit } from "lucide-react";
import { forwardRef } from "react";
import { RecordDocType } from "~/renderer/lib/Record.model";
import RecordForm from "../RecordForm";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

type EditDrawerProps = {
  record: RecordDocType;
};

const EditDrawer = forwardRef<HTMLButtonElement, EditDrawerProps>(
  ({ record }, ref) => {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button ref={ref} variant="ghost" className="flex h-8 w-full">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80vh]">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Form</DrawerTitle>
            <DrawerDescription>Edit a record</DrawerDescription>
          </DrawerHeader>
          <RecordForm record={record} editMode />
        </DrawerContent>
      </Drawer>
    );
  },
);

export default EditDrawer;
