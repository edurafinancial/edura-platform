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
        "group flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all",
        active
          ? "border-primary-container bg-surface-container-lowest ring-2 ring-primary/15"
          : "border-transparent bg-surface-container-low hover:border-primary-container/50 hover:bg-surface-container-lowest",
      )}
    >
      <div
        className={cn(
          "mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-transform group-hover:scale-110",
          active
            ? "bg-primary text-primary-foreground"
            : "bg-primary/10 text-primary",
        )}
      >
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <span className="font-label text-on-surface font-bold">{title}</span>
      <span className="font-label text-on-surface-variant text-xs">
        {description}
      </span>
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
              <div className="grid grid-cols-2 gap-4">
                <RoleOption
                  active={field.value === "student"}
                  icon="school"
                  title="Student"
                  description="I want to learn and track"
                  onClick={() => field.onChange("student")}
                />
                <RoleOption
                  active={field.value === "teacher"}
                  icon="admin_panel_settings"
                  title="Teacher/Admin"
                  description="I manage curriculum"
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
