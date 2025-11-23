import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const mockInventory = [
  {
    id: 'BRK-2021-CAM',
    year: '2021',
    makeModel: 'Toyota Camry',
    part: 'Brake Pads',
    price: 78,
    availability: 'In stock',
  },
  {
    id: 'OIL-2020-CVC',
    year: '2020',
    makeModel: 'Honda Civic',
    part: 'Oil Filter',
    price: 18,
    availability: 'In stock',
  },
  {
    id: 'ALT-2019-F150',
    year: '2019',
    makeModel: 'Ford F-150',
    part: 'Alternator',
    price: 240,
    availability: '2 left',
  },
  {
    id: 'AIR-2022-ACD',
    year: '2022',
    makeModel: 'Honda Accord',
    part: 'Air Filter',
    price: 24,
    availability: 'In stock',
  },
  {
    id: 'HDL-2023-FSTR',
    year: '2023',
    makeModel: 'Subaru Forester',
    part: 'Headlight Assembly',
    price: 190,
    availability: 'Pre-order',
  },
]

export const searchParts = createAsyncThunk(
  'search/searchParts',
  async (filters) => {
    const { year, makeModel, part } = filters
    await new Promise((resolve) => setTimeout(resolve, 350))

    const results = mockInventory.filter(
      (item) =>
        (!year || item.year === year) &&
        (!makeModel || item.makeModel === makeModel) &&
        (!part || item.part === part),
    )

    return { filters, results }
  },
)

const initialState = {
  filters: {
    year: '',
    makeModel: '',
    part: '',
  },
  options: {
    years: ['2024', '2023', '2022', '2021', '2020', '2019', '2018'],
    makeModels: [
      'Toyota Camry',
      'Toyota Corolla',
      'Honda Accord',
      'Honda Civic',
      'Ford F-150',
      'Subaru Forester',
    ],
    parts: [
      'Brake Pads',
      'Oil Filter',
      'Air Filter',
      'Alternator',
      'Headlight Assembly',
      'Spark Plugs',
    ],
  },
  results: [],
  status: 'idle',
  error: null,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateFilter(state, action) {
      const { key, value } = action.payload
      state.filters[key] = value
    },
    resetResults(state) {
      state.results = []
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchParts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(searchParts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.filters = action.payload.filters
        state.results = action.payload.results
      })
      .addCase(searchParts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error?.message || 'Search failed'
      })
  },
})

export const { updateFilter, resetResults } = searchSlice.actions
export default searchSlice.reducer
