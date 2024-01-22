import { create } from "zustand";

interface ImageUrlStore {
  verticalUrls: string[];
  horizontalUrls: string[];
  aboutMeUrls: string[];
  setVerticalUrls(urls: string[]): void;
  setHorizontalUrls(urls: string[]): void;
  setAboutMeUrls(urls: string[]): void;
  addVerticalUrl(url: string): void;
  removeVerticalUrl(url: string): void;
  addHorizontalUrl(url: string): void;
  removeHorizontalUrl(url: string): void;
  addAboutMeUrl(url: string): void;
  removeAboutMeUrl(url: string): void;
}

const useImageUrlStore = create<ImageUrlStore>((set) => ({
  verticalUrls: [],
  horizontalUrls: [],
  aboutMeUrls: [],
  setVerticalUrls: (urls) => set({ verticalUrls: urls }),
  setHorizontalUrls: (urls) => set({ horizontalUrls: urls }),
  setAboutMeUrls: (urls) => set({ aboutMeUrls: urls }),
  addVerticalUrl: (url) =>
    set((state) => ({
      verticalUrls: [url, ...state.verticalUrls],
    })),
  removeVerticalUrl: (url) =>
    set((state) => ({
      verticalUrls: state.verticalUrls.filter((u) => u !== url),
    })),
  addHorizontalUrl: (url) =>
    set((state) => ({
      horizontalUrls: [url, ...state.horizontalUrls],
    })),
  removeHorizontalUrl: (url) =>
    set((state) => ({
      horizontalUrls: state.horizontalUrls.filter((u) => u !== url),
    })),
  addAboutMeUrl: (url) =>
    set((state) => ({
      aboutMeUrls: [url, ...state.aboutMeUrls],
    })),
  removeAboutMeUrl: (url) =>
    set((state) => ({
      aboutMeUrls: state.aboutMeUrls.filter((u) => u !== url),
    })),
}));

export default useImageUrlStore;
