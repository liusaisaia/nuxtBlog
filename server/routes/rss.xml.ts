import RSS from 'rss'

export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: 'VoidZero Blog',
    description: 'The Modern Developer Blog',
    site_url: 'https://example.com', // Replace with actual URL
    feed_url: `https://example.com/rss.xml`,
    language: 'en',
    pubDate: new Date().toUTCString(),
    copyright: `All rights reserved ${new Date().getFullYear()}, VoidZero Blog`,
  })
  
  const docs = await queryCollection(event, 'content')
    .order('date', 'DESC')
    .all()
  
  for (const doc of docs) {
    feed.item({
      title: doc.title ?? '-',
      url: `https://example.com${doc.path}`,
      guid: doc.path,
      date: doc.date,
      description: doc.description,
      categories: doc.tags || []
    })
  }
  
  const feedString = feed.xml({ indent: true })
  setResponseHeader(event, 'Content-Type', 'text/xml')
  return feedString
})
