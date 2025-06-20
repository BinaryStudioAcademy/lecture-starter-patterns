export const theme = {
  colors: {
    // Neutral colors - Darker, more substantial grays
    N0: '#FFFFFF',    // Pure white
    N20: '#E2E8F0',   // Medium-light gray with more presence
    N30: '#CBD5E1',   // Noticeably darker gray for better definition
    N400A: 'rgba(71, 85, 105, 0.4)', // Darker gray with stronger alpha
    N900: '#1E293B',  // Deep slate gray for strong contrast
    
    // Red colors
    R75: '#FECACA',   // Saturated light red/pink
    R100: '#EF4444',  // Bold, vibrant red
  },
};

export type Theme = typeof theme;

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      N0: string;
      N20: string;
      N30: string;
      N400A: string;
      N900: string;
      R75: string;
      R100: string;
    };
  }
}
