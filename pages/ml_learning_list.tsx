import React from 'react'

interface ItemProps {
  title: string
  url: string
}

const _items: ItemProps[] = [
  {

  }
]

const Item = (props: ItemProps) => {
  return (
    <li>
      <a href={props.url} target="_blank" rel="noreferrer">
        {props.title}
      </a>
    </li>
  )
}

export default function MLLearningList() {
  const items = _items.map((item) => <Item {...item} />)
  return (
   <div
        className={`${geistSans.variable} ${geistMono.variable} items-center justify-items-center min-h-screen p-2 sm:p-4 md:p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <h1 className="text-3xl font-bold">ML Learning List</h1>

        <p className="text-2xl">
            A list of papers/articles to study about machine learning.
        </p>

        <ul>
          {items}
        </ul>

    </div>
  )
}
