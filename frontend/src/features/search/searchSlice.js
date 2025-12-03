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

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

// Fetch available years from the Rails backend API.
export const fetchYears = createAsyncThunk('search/fetchYears', async () => {
  const res = await fetch(`${API_BASE}/years`)
  if (!res.ok) {
    throw new Error('Failed to load years')
  }
  const data = await res.json()
  return data.years || []
})

// Fetch available make/models from the Rails backend API.
export const fetchMakeModels = createAsyncThunk(
  'search/fetchMakeModels',
  async () => {
    const res = await fetch(`${API_BASE}/make_models`)
    if (!res.ok) {
      throw new Error('Failed to load make/models')
    }
    const data = await res.json()
    return data.make_models || []
  },
)

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
    years: [],
    makeModels: [],
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
  yearsStatus: 'idle',
  makeModelsStatus: 'idle',
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
      .addCase(fetchYears.pending, (state) => {
        state.yearsStatus = 'loading'
      })
      .addCase(fetchYears.fulfilled, (state, action) => {
        state.yearsStatus = 'succeeded'
        state.options.years = action.payload
      })
      .addCase(fetchYears.rejected, (state) => {
        state.yearsStatus = 'failed'
      })
      .addCase(fetchMakeModels.pending, (state) => {
        state.makeModelsStatus = 'loading'
      })
      .addCase(fetchMakeModels.fulfilled, (state, action) => {
        state.makeModelsStatus = 'succeeded'
        state.options.makeModels = action.payload
      })
      .addCase(fetchMakeModels.rejected, (state) => {
        state.makeModelsStatus = 'failed'
      })
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
