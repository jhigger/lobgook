import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, SendHorizontal, TextSearch } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import useDatabase from "../hooks/useDatabase";
import { RecordDocType } from "../lib/Record.model";
import { capitalize, cn, getLatestApplicationNumber } from "../lib/utils";
import Loader from "./Loader";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { DrawerClose } from "./ui/drawer";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const formSchema = z.object({
  lastName: z.string().min(1).transform(capitalize),
  firstName: z.string().min(1).transform(capitalize),
  middleName: z.string().transform(capitalize).optional(),
  contactNumber: z.string().optional(),
  applicationType: z.enum([
    "registration",
    "reactivation",
    "correction of entries",
    "reactivation with correction",
    "transfer incoming",
    "transfer within",
    "transfer with reactivation",
    "transfer with reactivation and correction",
    "post to Local",
  ]),
  gender: z.enum(["male", "female"]),
  applicationNumber: z.coerce.string().min(1),
  indigenousPeople: z.boolean().optional().default(false),
  seniorCitizen: z.boolean().optional().default(false),
  personWithDisability: z.boolean().optional().default(false),
  sk: z.enum(["no", "15 to 17", "18 to 30"]),
});

export type FormSchemaType = z.infer<typeof formSchema>;

const defaultValues: FormSchemaType = {
  lastName: "",
  firstName: "",
  middleName: "",
  contactNumber: "",
  applicationType: "registration",
  gender: "male",
  applicationNumber: "",
  sk: "no",
  indigenousPeople: false,
  seniorCitizen: false,
  personWithDisability: false,
};

type RecordFormProps = {
  record?: RecordDocType;
  editMode?: boolean;
};

const RecordForm = ({ record, editMode = false }: RecordFormProps) => {
  const { loading, records, database } = useDatabase();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: editMode ? record : defaultValues,
  });

  const onSubmit = async (data: FormSchemaType) => {
    const exists = await database.checkApplicationNumberExists(
      form.getValues("applicationNumber"),
    );
    if (exists) {
      if (
        editMode &&
        record?.applicationNumber === form.getValues("applicationNumber")
      ) {
        return await database
          .updateRecord({
            ...data,
            uuid: record.uuid,
            createdAt: record.createdAt,
            updatedAt: new Date().toISOString(),
          })
          .then(() => {
            toast.success("Record updated successfully", {
              richColors: true,
            });
          })
          .catch(() => {
            toast.error("Failed to update record", {
              richColors: true,
            });
          });
      }
      return form.setError("applicationNumber", {
        message: "Application number already exists",
      });
    }

    await database.addRecord({
      ...data,
      uuid: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    toast("You submitted the following values:", {
      className: "w-fit right-0 bg-green-500",
      description: (
        <pre className="mt-2 min-w-[322px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      closeButton: true,
    });

    form.reset(defaultValues);
    form.clearErrors();
  };

  const setLatestApplicationNumber = async () => {
    form.setValue("applicationNumber", getLatestApplicationNumber(records));
    form.clearErrors("applicationNumber");
  };

  useEffect(() => {
    const [sk, senior] = form.watch(["sk", "seniorCitizen"]);
    if (sk !== "no" && senior) form.setValue("seniorCitizen", false);
  }, [form.watch(["sk", "seniorCitizen"])]);

  return (
    <Card className={cn(editMode && "border-0")}>
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Form</CardTitle>
          <CardDescription>
            {editMode ? "Edit" : "Add"} a record
          </CardDescription>
        </CardHeader>
        {editMode && (
          <CardHeader>
            <DrawerClose asChild>
              <Button variant="outline" size="icon">
                <CircleX />
              </Button>
            </DrawerClose>
          </CardHeader>
        )}
      </div>
      <CardContent>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full grid-cols-3 gap-4"
          >
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="order-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input className="capitalize" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="order-4">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input className="capitalize" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem className="order-7">
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input className="capitalize" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem className="order-10">
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input className="capitalize" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="applicationNumber"
              render={({ field }) => (
                <FormItem className="order-2">
                  <FormLabel>Application Number</FormLabel>
                  <FormControl>
                    <div className="flex w-full items-center gap-x-2">
                      <Input
                        className="capitalize"
                        {...field}
                        type="number"
                        min={0}
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="shrink-0"
                            onClick={setLatestApplicationNumber}
                            disabled={loading}
                          >
                            {loading ? <Loader /> : <TextSearch />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Determine latest application #</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="applicationType"
              render={({ field }) => (
                <FormItem className="order-5">
                  <FormLabel>Application Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="-- Select --" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {formSchema.shape.applicationType.options.map(
                        (option) => (
                          <SelectItem key={option} value={option}>
                            {option.toUpperCase()}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="order-8">
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="-- Select --" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {formSchema.shape.gender.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sk"
              render={({ field }) => (
                <FormItem className="order-11">
                  <FormLabel>SK</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="-- Select --" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {formSchema.shape.sk.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem className="order-3 row-span-3">
              <FormLabel>Options</FormLabel>
              <div className="flex h-full justify-center rounded-md border p-4">
                <div className="flex flex-col justify-around">
                  <FormField
                    control={form.control}
                    name="indigenousPeople"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Indigenous People</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="seniorCitizen"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={form.watch("sk") !== "no"}
                          />
                        </FormControl>
                        <FormLabel>Senior Citizen</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="personWithDisability"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Person With Disability</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </FormItem>
            {editMode ? (
              <DrawerClose className="order-12 mt-8" asChild>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  <SendHorizontal className="mr-2 h-4 w-4" />
                  Update
                </Button>
              </DrawerClose>
            ) : (
              <Button
                type="submit"
                className="order-12 mt-8"
                disabled={form.formState.isSubmitting}
              >
                <SendHorizontal className="mr-2 h-4 w-4" />
                Submit
              </Button>
            )}
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default RecordForm;
