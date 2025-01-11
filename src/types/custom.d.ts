/// <reference types="vite/client" />

declare module '*.frag' {
    const content: string;
    export default content;
  }
  
  declare module '*.vert' {
    const content: string;
    export default content;
  }
  
  declare module '*.glsl' {
    const content: string;
    export default content;
  }
  
  interface ImportMetaEnv {
    readonly VITE_PRIVY_APP_ID: string;
    // Add other env variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }