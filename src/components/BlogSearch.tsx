import { useState } from 'react'

import { URLSearchParamsInit } from 'react-router-dom'

import { Stack } from '@mui/material'

interface BlogSearchProps {
  postQuery: string
  latest: boolean
  setSearchParams: (params: URLSearchParamsInit) => void
}

const BlogSearch: React.FC<BlogSearchProps> = ({
  postQuery,
  latest,
  setSearchParams
}) => {
  const [search, setSearch] = useState<string | number>(postQuery)
  const [checked, setChecked] = useState<boolean>(latest)

  const handleSabmit = (event) => {
    event.preventDefault()
    const form = event.target

    const query = form.search.value
    const isLatest = form.latest.checked

    const params: URLSearchParamsInit = {}

    if (query.length) params.post = query
    if (isLatest) params.latest = true as unknown as string

    setSearchParams(params)
  }

  return (
    <Stack>
      <form onSubmit={handleSabmit}>
        <input
          type="search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label style={{ padding: '0 1rem' }}>
          <input
            type="checkbox"
            name="latest"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />{' '}
          New only
        </label>
        <input type="submit" value="Search" />
      </form>
    </Stack>
  )
}

export default BlogSearch
