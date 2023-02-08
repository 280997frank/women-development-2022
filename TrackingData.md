## user click on pages

### pageURLs

```
[
"/share-your-hopes",
"/physical-exhibition",
"/pioneers-of-progress",
"/shapers-of-success",
"/trailblazers-of-tomorrow",
"/about-exhibition"
]
```

### i.e. "Shapers of Success"

```
{
    anonymouseId: {anonymousId},
    sessionId: {sessionId},
    event: "click",
    type: "page",
    data: "shapers-of-success",
    page: {pageUrl},
    timestamps: {new Date()},
}
```

### user share a new message on "Share Your Hopes" page

```
{
    anonymouseId: {anonymousId},
    sessionId: {sessionId},
    event: "click",
    type: "share",
    data: {message} => string,
    page: "/share-your-hopes",
    timestamps: {new Date()},
}
```

### user Image, Video, Audio

```
{
    anonymouseId: {anonymousId},
    sessionId: {sessionId},
    event: "click",
    type: "modal-content",
    data: {data}, => {content: "content", type: "image" | "video" | "audio"}
    page: {pageUrl},
    timestamps: {new Date()},
}
```

### user click to show quiz

```
{
    anonymouseId: {anonymousId},
    sessionId: {sessionId},
    event: "click",
    type: "show-quiz",
    data: {data},
    page: {pageUrl},
    timestamps: {new Date()},
}
```

### user answered a quiz

```
{
    anonymouseId: {anonymousId},
    sessionId: {sessionId},
    event: "click",
    type: "answered-quiz",
    data: {data},
    page: {pageUrl},
    timestamps: {new Date()},
}
```

### get visitorship data

```
{
    anonymouseId: {anonymousId},
    sessionId: {sessionId},
    event: "visitorship",
    type: "visit" | "leave",
    data: anonymousId,
    page: {pageUrl},
    timestamps: {new Date()},
    timeEnter: {new Date()},
    timeExit: {new Date()}
}
```
