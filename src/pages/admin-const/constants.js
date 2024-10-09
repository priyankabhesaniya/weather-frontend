
export const PAGE_LENGTH = [10, 25, 50, 100];
const sort = {
  Descending: "desc",
  Ascending: "asc",
};
export const FILTER = {
  _page: 1,
  _limit: 10,
  status: "",
  q: "",
  _sort: "id",
  _order: sort.Descending,
};
export const initialState = {
  sortBy: [{ id: "id", desc: true }],
  pageSize: FILTER._limit,
  pageIndex: 0,
};
export const statusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'On Going', label: 'On Going' },
  { value: 'Qued', label: 'Qued' },
  { value: 'Completed', label: 'Completed' },
];
export const projectTypes = [
  { value: '', label: <em>None</em> },
  { value: 'Development', label: 'Development' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Design', label: 'Design' },
  { value: 'Research', label: 'Research' },
];


export const headers = (token)=>{
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
}

export const SHOW_FILTER_STATUS  = [
  {
    value : "in_stock",
    label:"In stock"
  },
  {
    value : "out_stock",
    label:"Out of stock"
  }
]


export const CATEGORY = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Books', value: 'books' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Home & Kitchen', value: 'home_kitchen' },
  { label: 'Beauty & Personal Care', value: 'beauty_personal_care' }
]
