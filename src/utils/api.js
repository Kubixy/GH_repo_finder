import axios from "axios";
import authorization from "./auth.js";

export const getUserAvatar = async (userInput) => {
  let output = null;

  await axios({
    url: "https://api.github.com/graphql",
    method: "POST",
    headers: {
      Authorization: `bearer ${authorization}`,
    },
    data: JSON.stringify({
      query: `
              {
                user(login: "${userInput}") {
                  avatarUrl
                }
              }
              `,
    }),
  }).then((input) => {
    output = input.data.data.user?.avatarUrl;
  });

  return output;
};

export const getUserRepositories = async (userInput, cursor) => {
  let output = [];

  await axios({
    url: "https://api.github.com/graphql",
    method: "POST",
    headers: {
      Authorization: `bearer ${authorization}`,
    },
    data: JSON.stringify({
      query: `
                {
                  user(login: "${userInput}") {
                    repositories(first: 10 ${cursor}) {
                      totalCount

                      edges {
                        cursor
                      }

                      nodes {
                        name
                        url
                        primaryLanguage {
                          name
                        }

                        object(expression:"master") {
                          ... on Commit {
                            
                            history(first: 1) {
                              totalCount
                              nodes {
                                committedDate
                              }
                            }
                          }
                        }

                      }
                      
                    }

                  }
                }
              `,
    }),
  }).then((input) => {
    let data = input.data.data.user?.repositories?.nodes;
    for (let i = 0; i < data.length; i++) {
      output.push({
        Name: data[i].name,
        Language: data[i]?.primaryLanguage?.name
          ? data[i]?.primaryLanguage?.name
          : "",
        "Last Commit": data[
          i
        ]?.object?.history?.nodes[0]?.committedDate?.substring(0, 10)
          ? data[i]?.object?.history?.nodes[0]?.committedDate?.substring(0, 10)
          : "",
        Commits: data[i]?.object?.history?.totalCount
          ? data[i]?.object?.history?.totalCount
          : "",
        url: data[i].url,
      });
    }

    let edges = input.data.data.user?.repositories?.edges;
  });

  return output;
};

export const getUserStats = async (userInput) => {
  let output = { repos: null, follows: null, starred: null };

  await axios({
    url: "https://api.github.com/graphql",
    method: "POST",
    headers: {
      Authorization: `bearer ${authorization}`,
    },
    data: JSON.stringify({
      query: `
              {
                user(login: "${userInput}") {
                  repositories {
                    totalCount
                  }
                  followers {
                    totalCount
                  }
                  starredRepositories {
                    totalCount
                  }
                }
              }
              `,
    }),
  }).then((input) => {
    output = {
      repos: input?.data?.data?.user?.repositories?.totalCount,
      follows: input?.data?.data?.user?.followers?.totalCount,
      starred: input?.data?.data?.user?.starredRepositories?.totalCount,
    };
  });

  return output;
};

// function to get the user's followers
export const getUserFollowers = async (userInput) => {
  let output = [];

  await axios({
    url: "https://api.github.com/graphql",
    method: "POST",
    headers: {
      Authorization: `bearer ${authorization}`,
    },
    data: JSON.stringify({
      query: `
              {
                user(login: "${userInput}") {
                  followers(first: 10) {
                    edges {
                      node {
                        login
                        url
                        repositories {
                          totalCount
                        }
                        followers {
                          totalCount
                        }
                        starredRepositories {
                          totalCount
                        }
                      }
                    }
                  }
                }
              }
              `,
    }),
  }).then((input) => {
    let data = input.data.data.user?.followers?.edges;

    for (let i = 0; i < data.length; i++) {
      output.push({
        User: data[i].node.login,
        Repos: data[i].node.repositories.totalCount,
        Follows: data[i].node.followers.totalCount,
        Starred: data[i].node.starredRepositories.totalCount,
        url: data[i].node.url,
      });
    }
  });

  return output;
};

export const getUserStarredRepos = async (userInput) => {
  let output = [];

  await axios({
    url: "https://api.github.com/graphql",
    method: "POST",
    headers: {
      Authorization: `bearer ${authorization}`,
    },
    data: JSON.stringify({
      query: `
              {
                user(login: "${userInput}") {
                  starredRepositories (first: 10) {
                    nodes {
                      name
                      url
                      forkCount
                      stargazerCount
                    }
                  }
                }
              }
              `,
    }),
  }).then((input) => {
    let data = input.data.data.user?.starredRepositories?.nodes;

    for (let i = 0; i < data.length; i++) {
      output.push({
        Repository: data[i].name,
        Forks: data[i].forkCount,
        Stars: data[i].stargazerCount,
        url: data[i].url,
      });
    }
  });

  return output;
};
