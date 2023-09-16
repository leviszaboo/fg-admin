import { create }from 'zustand';

interface ImageUrlProps {
  verticalUrls: string[];
  horizontalUrls: string[];
  setVerticalUrls(urls: string[]): void;
  setHorizontalUrls(urls: string[]): void;
  addVerticalUrl(url: string): void;
  removeVerticalUrl(url: string): void;
  addHorizontalUrl(url: string): void; 
  removeHorizontalUrl(url: string): void; 
}

const useImageUrlStore = create<ImageUrlProps>((set) => ({
  verticalUrls: [],
  horizontalUrls: [],
  setVerticalUrls: (urls) => set({ verticalUrls: urls }),
  setHorizontalUrls: (urls) => set({ horizontalUrls: urls }),
  addVerticalUrl: (url) => set((state) => ({ 
    verticalUrls: [url, ...state.verticalUrls] 
  })),
  removeVerticalUrl: (url) => set((state) => ({ 
    verticalUrls: state.verticalUrls.filter((u) => u !== url) 
  })),
  addHorizontalUrl: (url) => set((state) => ({ 
    horizontalUrls: [url, ...state.horizontalUrls] 
  })),
  removeHorizontalUrl: (url) => set((state) => ({ 
    horizontalUrls: state.horizontalUrls.filter((u) => u !== url) 
  })),
}));

export default useImageUrlStore;