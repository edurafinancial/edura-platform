import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginFields({ form }) {
  return (
    <>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-label text-on-surface-variant text-sm font-medium">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="scholar@edura.edu"
                  className="font-body h-12 rounded-lg border-0 bg-surface-container-lowest ring-1 ring-outline-variant/15 focus-visible:ring-2 focus-visible:ring-primary"
                  {...field}
                />
              </FormControl>
              <FormDescription className="font-body">
                Use the email attached to your academic workspace.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between gap-4">
                <FormLabel className="font-label text-on-surface-variant text-sm font-medium">
                  Password
                </FormLabel>
                <button
                  type="button"
                  className="font-label text-xs font-semibold text-primary transition-colors hover:text-secondary"
                >
                  Forgot password?
                </button>
              </div>
              <FormControl>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••••••"
                  className="font-body h-12 rounded-lg border-0 bg-surface-container-lowest ring-1 ring-outline-variant/15 focus-visible:ring-2 focus-visible:ring-primary"
                  {...field}
                />
              </FormControl>
              <FormDescription className="font-body">
                Enter the password for your existing portal account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="remember"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-3">
              <FormControl>
                <Checkbox
                  id="remember"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                />
              </FormControl>
              <Label
                htmlFor="remember"
                className="font-label text-on-surface-variant text-sm font-medium"
              >
                Remember me
              </Label>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
