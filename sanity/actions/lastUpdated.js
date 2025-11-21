
export const lastUpdatedAction = (prev) => {
  return prev.map((action) => {
    if (action.action === "publish") {
      return {
        ...action,
        onHandle: async (originalOnHandle, context) => {
          const { patch } = context;
          patch.set({ lastUpdated: new Date().toISOString() });
          return originalOnHandle();
        },
      };
    }
    return action;
  });
};
