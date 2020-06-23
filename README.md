# Youtube Challenge

### Task Brainstorming
![Task Brainstorming](src/assets/images/brainstorming.png)

## Features

- 🖌 Simulate Youtube that conatin Search functionality.
- 💡 Search filter using [type] that enable filter with [video/channel/playlist].
- ⌚️ Search filter using [date] that enable filter with [today/this week/this month].
- 📈 Search result can be sorted by [upload time/ relevance/ view count/ rating].
- 🕵🏻‍♂️ infinite loading for search result.
- 👨🏻‍💻 Search result can be video/channel/playlist.
- ✨ there are video, channel and playlist that can be navigated from search result.
- :page_facing_up: show more loading in channel page
- 💃🏻 in video details page, can play the video, see channel info and related videos.
- 🤝 in channel, playlist details page can know their videos and info.
- 🎨 Responsive web app using PURE scss.

## Tech approach

- **Axios** for HTTP request.
- **vue-router** for routing.
- **Vuex** for state management.
- **moment** for date formating.
- **scss** for css preprocessing.
- **vue-infinite-loading** for infinite loading.
- **Jest** for UI testing and snapshots (unfortunta).

## Installation

- **Clone the repo**

  `$ git clone https://github.com/Hendshokir/youtubeChallenge`

- **Install dependencies**

  `$ yarn install`

- **Add your Youtube API key to $API_KEY** please check `.main.js` file to see how.

- **Start the server**

  `$ yarn serve`

- **Lints and fixes files**

  `$ yarn lint`