declare namespace google {
  export const accounts: {
    id: {
      initialize: (options: {
        client_id: string;
        callback: (response: any) => void;
      }) => void;
      prompt: () => void;
      renderButton: (
        element: HTMLElement,
        options: { theme: string; size: string }
      ) => void;
    };
  };
}
