const COPY = {
  login: {
    title: "Login to your portal",
    description: "Manage your tuition, grants, and academic investments.",
  },
  signup: {
    title: "Create your workspace",
    description: "Join thousands of institutions curating financial literacy.",
  },
};

export default function AuthModeIntro({ mode }) {
  const content = COPY[mode] ?? COPY.signup;

  return (
    <div className="mb-8 text-center lg:text-left">
      <h2 className="font-headline text-on-surface mb-2 text-3xl font-bold sm:text-4xl">
        {content.title}
      </h2>
      <p className="text-on-surface-variant font-body text-sm sm:text-base">
        {content.description}
      </p>
    </div>
  );
}
