export type SubscribeRequest = {
  email?: string;
  firstName?: string;
  lastName?: string;
};

export type SubscribeResponse = {
  successMessage?: string;
  errorMessage?: string;
};
