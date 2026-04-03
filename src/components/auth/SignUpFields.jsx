import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function RoleOption({ active, icon, title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-4 cursor-pointer rounded-xl border-2 p-4 text-left transition-all sm:flex-col sm:items-start",
        active
          ? "border-primary-container bg-surface-container-lowest shadow-[0_10px_24px_rgba(42,157,143,0.08)]"
          : "border-outline-variant/60 bg-surface-container-lowest hover:border-primary-container/50 sm:bg-surface-container-low sm:hover:bg-surface-container-lowest",
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-105 sm:mb-1 sm:h-10 sm:w-10 sm:rounded-lg",
          active
            ? "bg-primary/12 text-primary sm:bg-primary sm:text-primary-foreground"
            : "bg-surface-container-high text-on-surface-variant sm:bg-primary/10 sm:text-primary",
        )}
      >
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-label text-on-surface text-lg font-bold sm:text-base">
          {title}
        </div>
        <div className="font-body text-on-surface-variant text-sm leading-5">
          {description}
        </div>
      </div>
      <div
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors sm:hidden",
          active
            ? "border-primary-container"
            : "border-outline-variant bg-surface-container-lowest",
        )}
      >
        <div
          className={cn(
            "h-2.5 w-2.5 rounded-full transition-colors",
            active ? "bg-primary-container" : "bg-transparent",
          )}
        />
      </div>
    </button>
  );
}

export default function SignUpFields({ form }) {
  return (
    <>
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="font-label text-on-surface-variant px-1 text-xs font-bold uppercase tracking-widest">
              I am a...
            </FormLabel>
            <FormControl>
              <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
                <RoleOption
                  active={field.value === "student"}
                  icon="school"
                  title="Student"
                  description="I want to learn and track."
                  onClick={() => field.onChange("student")}
                />
                <RoleOption
                  active={field.value === "teacher"}
                  icon="admin_panel_settings"
                  title="Teacher/Admin"
                  description="I manage curriculum."
                  onClick={() => field.onChange("teacher")}
                />
              </div>
            </FormControl>
            <FormDescription className="font-body text-xs">
              Choose the workspace setup that matches your role.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-label text-on-surface-variant text-sm font-medium">
                Full name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Johnathan Doe"
                  className="font-body h-12 rounded-lg border-0 bg-surface-container-lowest ring-1 ring-outline-variant/15 focus-visible:ring-2 focus-visible:ring-primary"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-label text-on-surface-variant text-sm font-medium">
                Email address
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john@university.edu"
                  className="font-body h-12 rounded-lg border-0 bg-surface-container-lowest ring-1 ring-outline-variant/15 focus-visible:ring-2 focus-visible:ring-primary"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between gap-4">
                <FormLabel className="font-label text-on-surface-variant text-sm font-medium">
                  School name
                </FormLabel>
                <span className="font-label text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  Optional
                </span>
              </div>
              <FormControl>
                <Input
                  placeholder="The Academic Institute"
                  className="font-body h-12 rounded-lg border-0 bg-surface-container-lowest ring-1 ring-outline-variant/15 focus-visible:ring-2 focus-visible:ring-primary"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
