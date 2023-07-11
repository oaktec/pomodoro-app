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

const Settings: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pomodoro: 25,
      "short break": 5,
      "long break": 15,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>): void => {
    console.log(data);
  };

  return (
    <Dialog>
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
            className="space-y-8"
          >
            <TypographyH3>Time (Minutes)</TypographyH3>
            <FormField
              control={form.control}
              name="pomodoro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>pomodoro</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    The duration of the pomodoro timer.
                  </FormDescription>
                  <FormMessage />
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
                  <FormDescription>
                    The duration of the short break timer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="long break"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>long break</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    The duration of the long break timer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
