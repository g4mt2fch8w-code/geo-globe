import React from 'react';
import { motion } from 'framer-motion';

const milestones = [
  {
    year: "Interactive Distance",
    title: "Google Earth Style Measurement",
    body: "Measure real-world distances between any two reserves on Earth using the Haversine formula, visualizing the connection with 3D arcs across the topography."
  },
  {
    year: "Live Research",
    title: "Powered by Wikipedia API",
    body: "As you click on reserves, the system fetches live facts directly from Wikipedia, allowing you to compile a detailed PDF lab report on the fly without hardcoded limits."
  },
  {
    year: "UPSC IFoS & Forest Exams Focused",
    title: "Comprehensive IFoS Database",
    body: "Featuring most of the critical Tiger Reserves, National Parks, Elephant Reserves, and Biospheres tested in the UPSC Indian Forest Service examination."
  },
];

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const AnimatedLine = () => {
  return (
    <div className="absolute left-1/2 top-0 -ml-px h-full w-px bg-white/[0.05]">
      <motion.div
        className="absolute left-0 top-0 w-full bg-gradient-to-b from-gold/0 via-gold/80 to-gold/0"
        style={{ height: "20%" }}
        animate={{
          top: ["-20%", "100%"],
        }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export function Timeline() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--canopy)]/20 py-32 md:py-44 border-y border-white/[0.04]">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              Our Journey
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] text-fog">
            A decade of roots{" "}
            <em className="text-gold-gradient not-italic">and growth</em>.
          </h2>
        </Reveal>

        <div className="relative mt-24">
          <AnimatedLine />

          <div className="relative z-10 space-y-16">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}
                  className="flex items-start w-full"
                >
                  <div className="w-1/2 pr-8 text-right flex flex-col justify-start">
                    {isLeft ? (
                      <span className="font-display text-2xl text-[color:var(--gold)] leading-none pt-1">
                        {m.year}
                      </span>
                    ) : (
                      <div className="pt-1">
                        <p className="font-display text-xl text-[color:var(--fog)] leading-snug mb-1">
                          {m.title}
                        </p>
                        <p className="text-sm text-[color:var(--fog)]/60 leading-relaxed">
                          {m.body}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="relative w-8 flex justify-center pt-2">
                    <motion.span
                      className="block h-3.5 w-3.5 rounded-full bg-[color:var(--gold)] shadow-[0_0_16px_2px_rgba(201,161,59,0.5)] border-2 border-[color:var(--ink)]"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.08 + 0.3,
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                    />
                  </div>

                  <div className="w-1/2 pl-8 flex flex-col justify-start">
                    {!isLeft ? (
                      <span className="font-display text-2xl text-[color:var(--gold)] leading-none pt-1">
                        {m.year}
                      </span>
                    ) : (
                      <div className="pt-1">
                        <p className="font-display text-xl text-[color:var(--fog)] leading-snug mb-1">
                          {m.title}
                        </p>
                        <p className="text-sm text-[color:var(--fog)]/60 leading-relaxed">
                          {m.body}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeSpotlight() {
  return (
    <section className="relative py-20 md:py-28 pt-44">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              Conservation at a Glance
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] text-fog">
            Numbers that tell a story of{" "}
            <em className="text-gold-gradient not-italic">hope</em>.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog/60 md:text-lg">
            A completely free, standalone interactive tool designed to help you visualize India's most critical Forests in full 3D. Preparing for the Forest Exams is monumental.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "54", label: "Tiger Reserves", sub: "Fully mapped" },
            { value: "100+", label: "National Parks", sub: "Interactive 3D" },
            { value: "70+", label: "Ramsar Sites", sub: "Wetlands" },
            { value: "Live", label: "Wikipedia", sub: "API Research" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card group rounded-2xl p-6 transition duration-500"
              >
                <div className="font-display text-4xl text-gold text-glow md:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 text-sm font-medium text-fog">
                  {s.label}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-fog/45">
                  {s.sub}
                </div>
                <div className="mt-4 h-px w-0 bg-gradient-to-r from-gold/60 to-transparent transition-all duration-700 group-hover:w-full" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export const DeveloperAbout = () => {
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-emerald/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-emerald/80">
              About the Developer
            </span>
          </div>
        </Reveal>
        
        <Reveal delay={0.15}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] text-fog">
            Omkar Bhople
          </h2>
          <p className="mt-4 text-xl text-gold font-display tracking-wide">Tiger Researcher, Conservationist & Hardcore Wildlifer.</p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 space-y-6">
            <Reveal delay={0.2}>
              <div className="glass-card p-6 rounded-2xl border-l border-gold/30 shadow-emerald">
                <h4 className="text-xs uppercase tracking-widest text-gold mb-2">Wildlife Specialist</h4>
                <p className="text-sm text-fog/80 leading-relaxed">World Record Holder, Tiger Expert, & Researcher</p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="glass-card p-6 rounded-2xl border-l border-emerald/30 shadow-emerald">
                <h4 className="text-xs uppercase tracking-widest text-emerald mb-2">Focus</h4>
                <p className="text-sm text-fog/80 leading-relaxed">AI, Automation, System Design & Software Development</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Reveal delay={0.4}>
                <div className="glass-card p-6 rounded-2xl border-l border-white/10 shadow-emerald h-full">
                  <h4 className="text-xs uppercase tracking-widest text-fog/50 mb-2">Achievements</h4>
                  <p className="text-sm text-fog/80 leading-relaxed">Super Talented Kids Award Holder</p>
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="glass-card p-6 rounded-2xl border-l border-white/10 shadow-emerald h-full">
                  <h4 className="text-xs uppercase tracking-widest text-fog/50 mb-2">Experience</h4>
                  <p className="text-sm text-fog/80 leading-relaxed">Years of field-based initiatives and collaboration with different Forest Departments.</p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="md:col-span-8 prose prose-invert prose-lg max-w-none text-fog/80">
            <Reveal delay={0.3}>
              <h3 className="font-display text-2xl text-gold mt-0">My Journey</h3>
              <p>
                Hey! I'm Omkar Bhople. If there is one thing that defines me, it is curiosity. Whether I am architecting a complex software system, observing tiger behavior in the wild, or finding a smarter way to solve an everyday problem, I thrive on learning by doing.
              </p>
              <p>
                I am currently pursuing my B.Tech while actively building software solutions. My journey has been a unique intersection of two worlds: the high-speed, logical realm of Artificial Intelligence and the patient, disciplined world of wildlife conservation. Through my work and collaborations with Forest Departments, I learned that the best solutions whether for a forest ecosystem or a digital platform require observation, resilience, and a deep understanding of the end goal.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <h3 className="font-display text-2xl text-gold mt-12">The Vision Behind This App</h3>
              <p>
                I built this application to solve a problem I deeply understand: the overwhelming challenge of mastering India's vast conservation network. For students and UPSC IFoS aspirants, studying geographical data from static maps and textbooks is often tedious and inefficient.
              </p>
              <p>
                In the wild, I learned that persistence and precision are non-negotiable. I have brought that same ethos into the development of this app. By mapping critical Tiger Reserves, National Parks, and Ramsar Sites onto a fully interactive 3D globe, my goal was to create a tool where spatial memory is naturally enhanced. This isn’t just software; it is a free, dedicated platform designed to make your learning journey more intuitive, built with the exact same passion I apply to my wildlife field research.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <h3 className="font-display text-2xl text-gold mt-12">Looking Ahead</h3>
              <p>
                I am still learning, still exploring, and still building. My goal is to combine my technical skillset with my lifelong passion for conservation to build products that create real-world value.
              </p>
              <p>
                Every user who interacts with this app becomes part of that journey. Thank you for choosing to use my work; I truly hope it adds value to your life, and I look forward to creating many more meaningful products in the years ahead.
              </p>
              <p className="font-display text-emerald mt-8 text-xl">— Omkar Bhople</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AnimatedDivider = () => {
  return (
    <div className="relative w-full py-12 md:py-20 overflow-hidden flex flex-col items-center justify-center bg-ink">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-ink to-ink" />
      
      {/* Decorative top border */}
      <div className="absolute top-0 w-full flex justify-center">
        <div className="h-[1px] w-3/4 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <div className="w-[200vw] md:w-[150vw] -rotate-2 transform-gpu drop-shadow-[0_0_40px_rgba(16,185,129,0.2)]">
        <div className="flex w-[200%] marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex w-1/2 justify-around items-center gap-12 px-6">
              <span className="text-4xl md:text-7xl font-display text-transparent font-bold" style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.6)', filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.6))' }}>PROTECT</span>
              <span className="text-xl md:text-3xl text-gold drop-shadow-[0_0_15px_rgba(201,161,59,1)]">✦</span>
              <span className="text-4xl md:text-7xl font-display text-emerald font-semibold opacity-100 drop-shadow-[0_0_30px_rgba(16,185,129,1)]">PRESERVE</span>
              <span className="text-xl md:text-3xl text-gold drop-shadow-[0_0_15px_rgba(201,161,59,1)]">✦</span>
              <span className="text-4xl md:text-7xl font-display text-transparent font-bold" style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.6)', filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.6))' }}>RESEARCH</span>
              <span className="text-xl md:text-3xl text-gold drop-shadow-[0_0_15px_rgba(201,161,59,1)]">✦</span>
              <span className="text-4xl md:text-7xl font-display text-emerald font-semibold opacity-100 drop-shadow-[0_0_30px_rgba(16,185,129,1)]">CONSERVE</span>
              <span className="text-xl md:text-3xl text-gold drop-shadow-[0_0_15px_rgba(201,161,59,1)]">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[200vw] md:w-[150vw] rotate-1 mt-6 transform-gpu opacity-90 drop-shadow-[0_0_40px_rgba(201,161,59,0.2)]">
        <div className="flex w-[200%] marquee-track" style={{ animationDirection: 'reverse', animationDuration: '35s' }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex w-1/2 justify-around items-center gap-12 px-6">
              <span className="text-3xl md:text-5xl font-display text-fog opacity-80 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">WILDLIFE</span>
              <span className="w-16 h-[1px] bg-white/40 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
              <span className="text-3xl md:text-5xl font-display text-transparent" style={{ WebkitTextStroke: '2px rgba(201, 161, 59, 0.8)', filter: 'drop-shadow(0 0 15px rgba(201,161,59,0.7))' }}>ECOSYSTEMS</span>
              <span className="w-16 h-[1px] bg-white/40 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
              <span className="text-3xl md:text-5xl font-display text-fog opacity-80 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">HABITATS</span>
              <span className="w-16 h-[1px] bg-white/40 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
              <span className="text-3xl md:text-5xl font-display text-transparent" style={{ WebkitTextStroke: '2px rgba(201, 161, 59, 0.8)', filter: 'drop-shadow(0 0 15px rgba(201,161,59,0.7))' }}>BIODIVERSITY</span>
              <span className="w-16 h-[1px] bg-white/40 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 w-full flex justify-center">
        <div className="h-[1px] w-3/4 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      </div>
    </div>
  );
};

export const About = () => {
  return (
    <div className="w-full min-h-screen bg-ink flex flex-col">
      <HomeSpotlight />
      <AnimatedDivider />
      <Timeline />
      <DeveloperAbout />
    </div>
  );
};
