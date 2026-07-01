import React from 'react';
import { Joyride, STATUS } from 'react-joyride';
import type { Step } from 'react-joyride';

interface JoyTourProps {
  run: boolean;
  onFinish: () => void;
}

const CustomTooltip = ({
  index,
  step,
  tooltipProps,
  primaryProps,
  backProps,
  skipProps,
  isLastStep,
}: any) => {
  return (
    <div {...tooltipProps} className="bg-black/70 backdrop-blur-xl rounded-2xl border border-white/20 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] max-w-sm font-body text-left">
      <div className="text-gray-200 text-sm leading-relaxed mb-6">{step.content}</div>
      <div className="flex justify-between items-center">
        {!isLastStep ? (
          <button {...skipProps} className="text-xs text-amber-500/80 hover:text-amber-400 uppercase tracking-widest font-bold transition-colors">Skip</button>
        ) : (
          <div /> // Spacer
        )}
        <div className="flex gap-3">
          {index > 0 && (
            <button {...backProps} className="text-xs text-gray-300 hover:text-white px-4 py-2 rounded-xl bg-white/5 border border-white/10 transition-colors">Back</button>
          )}
          <button {...primaryProps} className="text-xs bg-emerald-500/90 hover:bg-emerald-400 text-black font-bold px-5 py-2 rounded-xl transition-colors shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            {isLastStep ? 'Finish Tour' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export const JoyTour: React.FC<JoyTourProps> = ({ run, onFinish }) => {
  const steps: Step[] = [
    {
      target: 'body',
      placement: 'center',
      content: (
        <div>
          <h2 className="text-xl font-bold text-emerald-400 mb-3 tracking-wide">Welcome to Geo-Globe! 🌍</h2>
          <p className="text-gray-300">Let's take a quick tour of the features available in this interactive 3D environment.</p>
        </div>
      )
    },
    {
      target: '.tour-search',
      content: 'Search for any wildlife reserve, national park, or sanctuary in India to fly directly to it.',
      placement: 'bottom',
    },
    {
      target: '.tour-modes',
      content: 'Switch between the Standard view, a Historical Timeline (Project Tiger), and Biogeographic Zones.',
      placement: 'bottom',
    },
    {
      target: '.tour-layers',
      content: 'Overlay rich environmental data like Champion Trees, Watersheds, and Soil maps directly onto the globe.',
      placement: 'bottom',
    },
    {
      target: '.tour-ruler',
      content: 'Use the measurement tool to click points on the globe and calculate real-world distances and estimated areas.',
      placement: 'left',
    },
    {
      target: '.tour-audio',
      content: 'Immerse yourself! Toggle breathtaking ambient audio tailored for the experience.',
      placement: 'left',
    },
    {
      target: 'body',
      placement: 'center',
      content: (
        <div>
          <h2 className="text-xl font-bold text-amber-400 mb-3 tracking-wide">📖 The Interactive Journal</h2>
          <p className="text-gray-300">Click on any green reserve marker on the globe to open its dedicated Journal. You'll instantly see live data, photos, and information fetched directly from Wikipedia!</p>
        </div>
      ),
    }
  ];

  const handleJoyrideCallback = (data: any) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    
    if (finishedStatuses.includes(status)) {
      onFinish();
    }
  };

  const JoyrideComponent: any = Joyride;

  return (
    <JoyrideComponent
      steps={steps}
      run={run}
      continuous={true}
      callback={handleJoyrideCallback}
      tooltipComponent={CustomTooltip}
      floaterProps={{
        disableAnimation: false,
        styles: {
          floater: { filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.5))' }
        }
      }}
      styles={{
        options: {
          zIndex: 10000,
          overlayColor: 'rgba(0, 0, 0, 0.75)',
        }
      }}
    />
  );
};
