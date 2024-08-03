import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal, TextSearch } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
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
  lastName: z.string().min(1),
  firstName: z.string().min(1),
  middleName: z.string().optional(),
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
  applicationNumber: z.string().min(1),
  indigenousPeople: z.boolean().optional(),
  seniorCitizen: z.boolean().optional(),
  personWithDisability: z.boolean().optional(),
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

const RecordForm = () => {
  const latestApplicationNumber = "69";

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: FormSchemaType) => {
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

  const getLatestApplicationNumber = () => {
    form.setValue("applicationNumber", latestApplicationNumber);
  };

  useEffect(() => {
    const [sk, senior] = form.watch(["sk", "seniorCitizen"]);
    if (sk !== "no" && senior) form.setValue("seniorCitizen", false);
  }, [form.watch(["sk", "seniorCitizen"])]);

  return (
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
                <Input {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
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
                  <Input {...field} />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="shrink-0"
                        onClick={getLatestApplicationNumber}
                      >
                        <TextSearch />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="-- Select --" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {formSchema.shape.applicationType.options.map((option) => (
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
          name="gender"
          render={({ field }) => (
            <FormItem className="order-8">
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <div className="order-3 row-span-3 -mb-8 mt-8 flex justify-center rounded-md border p-4">
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
        <Button type="submit" className="order-12 mt-8">
          <SendHorizonal className="mr-2 h-4 w-4" />
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default RecordForm;
