import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AutoComplete, { DataSourceType } from './autoComplete'

interface LakerPlayerProps {
  value: string;
  number?: number;
}

interface GithubUserProps {
  url?: string;
  login?: string;
}

const SimpleComplete = () => {
  const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma']
  const lakersWithNumber = [
    { value: 'bradley', number: '28' },
    { value: 'pope', number: '26' },
    { value: 'caruso', number: '25' },
    { value: 'cook', number: '68' },
    { value: 'cousins', number: '56' },
    { value: 'james', number: '42' },
    { value: 'AD', number: '32' },
    { value: 'green', number: '12' },
    { value: 'howard', number: '16' },
    { value: 'kuzma', number: '14' },
    { value: 'McGee', number: '39' },
    { value: 'rando', number: '0' },
  ]

  // const handleFetch = (query: string) => {
  //   return lakers.filter(name => name.includes(query)).map(name => ({ value: name }))
  // }

  // const handleFetch = (query: string) => {
  //   return lakersWithNumber.filter(player => player.value.includes(query))
  // }

  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items)
        const formatItems = items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
        return formatItems
      })
  }

  const renderOption = (item: DataSourceType<GithubUserProps>) => {
    return (
      <>
        <h5>Name: {item.login}</h5>
        <p>url: {item.url}</p>
      </>
    )
  }

  return (
    <AutoComplete
      width="300"
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
    />
  )
}

storiesOf('AutoComplete Component', module)
  .add('AutoComplete', SimpleComplete)