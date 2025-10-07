export const TOOL_CONFIG = {
  // ...previous tools,
  empire: {
    image: "empire",
    port: 1337,
    link: (host: string) => `http://${host}:1337`
  },
  covenant: {
    image: "covenant",
    port: 7443,
    link: (host: string) => `https://${host}:7443`
  },
  pupy: {
    image: "pupy",
    port: 8443,
    link: (host: string) => `https://${host}:8443`
  },
  veil: {
    image: "veil",
    port: 8888,
    link: (host: string) => `http://${host}:8888`
  },
  theharvester: {
    image: "theharvester",
    port: null,
    link: () => "(command-line only, see logs)"
  }
  // ...etc.
}