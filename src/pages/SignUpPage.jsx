import SignUpForm from "../components/signup/SignUpForm";
import SignUpHeader from "../components/signup/SignUpHeader";
import SignUpHeroPanel from "../components/signup/SignUpHeroPanel";

export default function SignUpPage({
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
    <>
      <SignUpHeader />
      <main className=" min-h-screen lg:grid lg:grid-cols-2">
        <SignUpHeroPanel />
        <section className="bg-surface relative mt-12 flex items-center justify-center p-6 lg:p-12">
          <SignUpForm
            name={name}
            email={email}
            school={school}
            role={role}
            onNameChange={onNameChange}
            onEmailChange={onEmailChange}
            onSchoolChange={onSchoolChange}
            onRoleChange={onRoleChange}
            onSubmit={onSubmit}
            onSwitchMode={onSwitchMode}
          />
          {/* <footer className="font-mono absolute bottom-8 text-xs text-slate-400">
            EDURA-FIN-SYS-V.2.4 // CURATED BY ACADEMIC PANEL
          </footer> */}
        </section>
      </main>
    </>
  );
}
