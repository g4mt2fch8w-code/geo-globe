import { motion } from 'framer-motion';

export function Terms() {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 relative z-10 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-3xl glass-card p-8 md:p-12 rounded-[2rem]"
      >
        <h1 className="font-display text-4xl text-gold mb-8 text-center">Terms & Conditions</h1>
        
        <div className="space-y-8 text-fog/80 font-body leading-relaxed">
          <div>
            <h2 className="text-xl text-fog font-medium mb-3">Educational Purpose</h2>
            <p>
              Geo-Globe is an educational tool built for students and aspirants. The maps, coordinates, and borders shown are for representative and learning purposes only and may not reflect exact political boundaries.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-fog font-medium mb-3">Data Accuracy</h2>
            <p>
              Information is dynamically sourced from open APIs like Wikipedia. While we strive for accuracy, users should verify facts with official sources for exam preparation.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-fog font-medium mb-3">Usage</h2>
            <p>
              The platform and its PDF generation tools are provided free of charge for non-commercial, educational use.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
