import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { withPrevData } from '../api/swr-helper'
import Layout from '../components/Layout'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import useSWR from 'swr'
import { baseApi } from '../api/common'
import { baseApi_riot } from '../api/common/index2'

const fetcher = (url: string): Promise<Summoner> => {
  return baseApi_riot.get(url).json()
}
type Summoner = {
  accoundId: string
  profileIconId: number
  revisionDate: number
  name: string
  id: string
  puuid: string
  summonerLevel: number
}

const SearchPage = () => {
  const [text, setText] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    searchWord
      ? encodeURI('lol/summoner/v4/summoners/by-name/' + searchWord)
      : null,
    fetcher
  )
  return (
    <Layout>
      <h3>User info</h3>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading || isValidating}
      />
      <Button
        variant="contained"
        startIcon={<SearchRoundedIcon />}
        onClick={() => {
          setSearchWord(text)
        }}
      >
        検索
      </Button>
      {error && <div>failed to load</div>}
      {isLoading && <div>Loading...</div>}
      {!data && <div></div>}
      {data && (
        <>
          <p>accoundId: {data.accoundId}</p>
          <p>profileIconId: {data.profileIconId}</p>
          <p>revisionDate: {data.revisionDate}</p>
          <p>name: {data.name}</p>
          <p>id: {data.id}</p>
          <p>puuid: {data.puuid}</p>
          <p>summonerLevel: {data.summonerLevel}</p>
        </>
      )}
    </Layout>
  )
}

export default SearchPage
