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
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { TypographyH3 } from "./ui/typography";

import type { Modes } from "@/App";

const formSchema = z.object({
  focus: z.coerce.number().min(1).max(99),
  "short break": z.coerce.number().min(1).max(99),
  "long break": z.coerce.number().min(1).max(99),
});

export interface SettingsProps {
  modes: Modes;
  setModes: (value: React.SetStateAction<Modes>) => void;
}

const Settings: React.FC<SettingsProps> = ({ modes, setModes }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      focus: modes.focus.duration / 60,
      "short break": modes["short break"].duration / 60,
      "long break": modes["long break"].duration / 60,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>): void => {
    setModes((prevModes) => ({
      ...prevModes,
      focus: {
        ...prevModes.focus,
        duration: data.focus * 60,
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
            <div className="ml-6 mr-6 flex flex-col justify-center gap-2 border-light-gray sm:ml-10 sm:mr-10 sm:flex-row sm:justify-between sm:gap-5">
              <FormField
                control={form.control}
                name="focus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>focus</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
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
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="long break"
                render={({ field }) => (
                  <FormItem className="pb-8">
                    <FormLabel>long break</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Apply</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
