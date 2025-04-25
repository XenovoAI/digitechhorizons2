import ReactPixel from 'react-facebook-pixel';

// Replace this with your actual Meta Pixel ID from Facebook Business Manager
const PIXEL_ID = '123456789012345';

export const initializeMetaPixel = () => {
  const options = {
    autoConfig: true,
    debug: false
  };
  
  ReactPixel.init(PIXEL_ID, undefined, options);
  ReactPixel.pageView();
};

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  ReactPixel.track(eventName, parameters);
};

export const trackCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
  ReactPixel.trackCustom(eventName, parameters);
};

export const trackPageView = () => {
  ReactPixel.pageView();
};

export const trackViewContent = (contentData: {
  content_name: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
}) => {
  ReactPixel.track('ViewContent', contentData);
};

export const trackAddToCart = (productData: {
  content_name: string;
  content_ids: string[];
  content_type: string;
  value: number;
  currency: string;
}) => {
  ReactPixel.track('AddToCart', productData);
};

export const trackPurchase = (purchaseData: {
  value: number;
  currency: string;
  content_ids?: string[];
  content_type?: string;
  content_name?: string;
  num_items?: number;
}) => {
  ReactPixel.track('Purchase', purchaseData);
};