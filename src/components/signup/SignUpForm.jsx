function RoleOption({ active, icon, title, description, onClick }) {
  return (
    <button
      className={[
        "group flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all",
        active
          ? "border-primary-container bg-surface-container-lowest ring-2 ring-primary/5"
          : "border-transparent bg-surface-container-low hover:border-primary-container hover:bg-surface-container-lowest",
      ].join(" ")}
      type="button"
      onClick={onClick}
    >
      <div
        className={[
          "mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-transform group-hover:scale-110",
          active ? "bg-primary  text-white" : "bg-primary/10 text-primary",
        ].join(" ")}
      >
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <span className="font-label text-on-surface font-bold">{title}</span>
      <span className="font-label text-on-surface-variant text-xs">{description}</span>
    </button>
  );
}

function FormField({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  endHint,
}) {
  return (
    <div className="relative group">
      <div className="mb-1.5 flex items-center justify-between px-1">
        <label
          htmlFor={id}
          className="font-label text-on-surface-variant block text-sm font-medium"
        >
          {label}
        </label>
        {endHint ? (
          <span className="text-[10px] font-bold uppercase text-slate-400">
            {endHint}
          </span>
        ) : null}
      </div>
      <input
        id={id}
        className="font-body placeholder:text-slate-400 w-full rounded-lg border-0 bg-surface-container-lowest p-3 ring-1 ring-outline-variant/15 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default function SignUpForm({
  name,
  email,
  school,
  role,
  onNameChange,
  onEmailChange,
  onSchoolChange,
  onRoleChange,
  onSubmit,
  onSwitchMode,
}) {
  return (
    <div className="w-full max-w-lg">
      <div className="mb-10 text-center lg:text-left">
        <h2 className="font-headline text-on-surface mb-2 text-3xl font-bold">
          Create your workspace
        </h2>
        <p className="text-on-surface-variant font-body">
          Join thousands of institutions curating financial literacy.
        </p>
      </div>

      <div className="bg-surface-container-high mb-10 flex w-full rounded-xl p-1">
        <button
          type="button"
          onClick={onSwitchMode}
          className="font-label flex-1 rounded-lg py-2 text-sm font-semibold text-slate-500 transition-all hover:text-on-surface"
        >
          Log In
        </button>
        <button
          type="button"
          className="font-label bg-surface-container-lowest text-primary ring-black/5 flex-1 rounded-lg py-2 text-sm font-semibold shadow-sm ring-1"
        >
          Sign Up
        </button>
      </div>

      <form className="space-y-8" onSubmit={onSubmit}>
        <div className="space-y-4">
          <label className="font-label text-on-surface-variant px-1 text-xs font-bold uppercase tracking-widest">
            I am a...
          </label>
          <div className="grid grid-cols-2 gap-4">
            <RoleOption
              active={role === "student"}
              icon="school"
              title="Student"
              description="I want to learn and track"
              onClick={() => onRoleChange("student")}
            />
            <RoleOption
              active={role === "teacher"}
              icon="admin_panel_settings"
              title="Teacher/Admin"
              description="I manage curriculum"
              onClick={() => onRoleChange("teacher")}
            />
          </div>
        </div>

        <div className="space-y-6">
          <FormField
            id="signup-name"
            label="Full name"
            placeholder="Johnathan Doe"
            value={name}
            onChange={onNameChange}
          />
          <FormField
            id="signup-email"
            label="Email address"
            placeholder="john@university.edu"
            type="email"
            value={email}
            onChange={onEmailChange}
          />
          <FormField
            id="signup-school"
            label="School name"
            placeholder="The Academic Institute"
            value={school}
            onChange={onSchoolChange}
            endHint="Optional"
          />
        </div>

        <div className="pt-4">
          <button
            className="font-headline bg-primary-container text-on-primary-container shadow-primary/10 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold transition-all hover:bg-secondary active:scale-[0.98]"
            type="submit"
          >
            Create Account
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </button>
        </div>

        <p className="text-on-surface-variant font-body text-center text-xs">
          By signing up, you agree to the{" "}
          <a
            className="underline transition-colors hover:text-primary"
            href="#"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            className="underline transition-colors hover:text-primary"
            href="#"
          >
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
}
