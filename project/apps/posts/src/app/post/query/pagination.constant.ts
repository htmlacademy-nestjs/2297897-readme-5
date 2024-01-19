import { SortDirection } from "@project/libs/shared/types";

export const PAGINATION_DEFAULT_VALUE = {
    POST_COUNT_LIMIT: 10,
    SORT_DIRECTION: SortDirection.Ascending,
    PAGE_COUNT: 1,
} as const;
