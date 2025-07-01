const CardEvent = {
  CREATE: "card:create",
  COPY: "card:copy",
  REORDER: "card:reorder",
  RENAME: "card:rename",
  DELETE: "card:delete",
  CHANGE_DESCRIPTION: "card:change-description",
} as const;

export { CardEvent };
