import { Suspense, lazy, useMemo, useState } from "react";

import { motion } from "framer-motion";

import data from "../data.json";
import { doSave, loadProgress, loadUser } from "../shared/learning/storage";

const { MODULES, TRACKS } = data;

import { Skeleton } from "@/components/ui/skeleton";
import DashboardBackgroundDecor from "@/components/dashboard/DashboardBackgroundDecor";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DashboardHeaderSection from "@/components/dashboard/DashboardHeaderSection";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardStatsSection from "@/components/dashboard/DashboardStatsSection";
import DashboardTrackSection from "@/components/dashboard/DashboardTrackSection";

const Auth = lazy(() => import("@/components/shared/learning/Auth"));
const Lesson = lazy(() => import("@/components/shared/learning/Lesson"));
const Quiz = lazy(() => import("@/components/shared/learning/Quiz"));

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-surface px-6 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Skeleton className="mb-10 h-32 w-full rounded-xl" />
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
        <Skeleton className="mb-8 h-10 w-48 rounded-lg" />
        <div className="space-y-4 pl-8">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const trackVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      staggerDelay: 0.1,
    },
  },
};

const navLinks = [
  { label: "Dashboard", icon: "dashboard", active: true },
  { label: "Curriculum", icon: "menu_book" },
  { label: "Students", icon: "group" },
  { label: "Analytics", icon: "analytics" },
];

const footerLinks = [
  { label: "Settings", icon: "settings" },
  { label: "Support", icon: "help" },
];

export default function DashboardPage() {
  const [user, setUser] = useState(loadUser);
  const [progress, setProgress] = useState(loadProgress);
  const [screen, setScreen] = useState("dashboard");
  const [curMod, setCurMod] = useState(null);

  const doneIds = useMemo(
    () => Object.keys(progress).filter((k) => progress[k]?.completed),
    [progress],
  );
  const avgScore = useMemo(() => {
    if (doneIds.length === 0) return "-";
    const total = doneIds.reduce(
      (sum, k) => sum + (progress[k]?.score || 0),
      0,
    );
    return `${Math.round(total / doneIds.length)}%`;
  }, [doneIds, progress]);

  const totalModules = useMemo(
    () => MODULES.filter((m) => m.lessons.length > 0).length,
    [],
  );
  const progressPct = totalModules
    ? Math.round((doneIds.length / totalModules) * 100)
    : 0;

  const orderedModules = useMemo(
    () =>
      MODULES.slice().sort((a, b) => {
        if (a.trackId === b.trackId) return a.order - b.order;
        return a.trackId.localeCompare(b.trackId);
      }),
    [],
  );
  const firstAvailableId = useMemo(() => {
    const next = orderedModules.find(
      (m) => m.lessons.length > 0 && !progress[m.id]?.completed,
    );
    return next?.id ?? orderedModules[0]?.id ?? null;
  }, [orderedModules, progress]);
  const modulesByTrack = useMemo(() => {
    return orderedModules.reduce((acc, mod) => {
      if (!acc[mod.trackId]) acc[mod.trackId] = [];
      acc[mod.trackId].push(mod);
      return acc;
    }, {});
  }, [orderedModules]);

  if (!user)
    return (
      <Suspense fallback={<DashboardSkeleton />}>
        <Auth
          onLogin={(u) => {
            setUser(u);
            setScreen("dashboard");
          }}
        />
      </Suspense>
    );

  if (screen === "lesson" && curMod)
    return (
      <Suspense fallback={<DashboardSkeleton />}>
        <Lesson
          mod={curMod}
          onBack={() => {
            setScreen("dashboard");
            setCurMod(null);
          }}
          onQuiz={() => setScreen("quiz")}
        />
      </Suspense>
    );

  if (screen === "quiz" && curMod)
    return (
      <Suspense fallback={<DashboardSkeleton />}>
        <Quiz
          mod={curMod}
          onBack={() => {
            setScreen("dashboard");
            setCurMod(null);
          }}
          onComplete={(score) => {
            const updated = {
              ...progress,
              [curMod.id]: { completed: true, score },
            };
            setProgress(updated);
            doSave(updated);
            setScreen("dashboard");
            setCurMod(null);
          }}
        />
      </Suspense>
    );

  const handleSelect = (mod) => {
    setCurMod(mod);
    setScreen("lesson");
  };

  return (
    <DashboardLayout
      navLinks={navLinks}
      footerLinks={footerLinks}
      onLogout={() => {
        setUser(null);
        localStorage.removeItem("edura-user");
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={sectionVariants}>
          <DashboardHeaderSection userEmail={user.email} />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <DashboardStatsSection
            doneCount={doneIds.length}
            totalModules={totalModules}
            avgScore={avgScore}
            progressPct={progressPct}
          />
        </motion.div>

        {TRACKS.map((track) => {
          const mods = modulesByTrack[track.id] ?? [];
          return (
            <motion.section
              key={track.id}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <DashboardTrackSection
                track={track}
                modules={mods}
                progress={progress}
                firstAvailableId={firstAvailableId}
                onSelect={handleSelect}
              />
            </motion.section>
          );
        })}
      </motion.div>

      <DashboardFooter />
      <DashboardBackgroundDecor />
    </DashboardLayout>
  );
}
