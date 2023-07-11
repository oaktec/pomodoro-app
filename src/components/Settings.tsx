import { useState } from "react";

import SettingsLogo from "@/assets/icon-settings.svg";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { TypographyH3 } from "./ui/typography";

const formSchema = z.object({
  pomodoro: z.coerce.number().min(1).max(99),
  "short break": z.coerce.number().min(1).max(99),
  "long break": z.coerce.number().min(1).max(99),
});

export interface SettingsProps {
  setModes: (
    value: React.SetStateAction<{
      pomodoro: {
        label: string;
        duration: number;
        colorName: string;
      };
      "short break": {
        label: string;
        duration: number;
        colorName: string;
      };
      "long break": {
        label: string;
        duration: number;
        colorName: string;
      };
    }>
  ) => void;
}

const Settings: React.FC<SettingsProps> = ({ setModes }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pomodoro: 25,
      "short break": 5,
      "long break": 15,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>): void => {
    setModes((prevModes) => ({
      ...prevModes,
      pomodoro: {
        ...prevModes.pomodoro,
        duration: data.pomodoro * 60,
      },
      "short break": {
        ...prevModes["short break"],
        duration: data["short break"] * 60,
      },
      "long break": {
        ...prevModes["long break"],
        duration: data["long break"] * 60,
      },
    }));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <img src={SettingsLogo} alt="settings" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void form.handleSubmit(onSubmit)(event);
            }}
            className=""
          >
            <TypographyH3 className="mb-[18px]">Time (Minutes)</TypographyH3>
            <div className="ml-6 mr-6 flex flex-col justify-center gap-2 border-light-gray sm:ml-10 sm:mr-10 sm:flex-row sm:justify-between sm:gap-5 sm:border-b">
              <FormField
                control={form.control}
                name="pomodoro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>pomodoro</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="short break"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>short break</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="long break"
                render={({ field }) => (
                  <FormItem className="border-b border-light-gray pb-6 sm:border-none">
                    <FormLabel>long break</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <TypographyH3 className="mb-[10px]">FONT</TypographyH3> */}
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
