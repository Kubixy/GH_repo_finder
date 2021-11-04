import axios from "axios";
import authorization from "./auth.js";

export const getUserData = async (userInput) => {
  let output = { userAvatar: null, userData: [] };

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
                    
                    repositories(first: 100) {
                      totalCount

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
    output.userAvatar = input.data.data.user?.avatarUrl;
    let data = input.data.data.user?.repositories?.nodes;

    for (let i = 0; i < data.length; i++) {
      output.userData.push({
        name: data[i].name,
        primaryLanguage: data[i]?.primaryLanguage?.name
          ? data[i]?.primaryLanguage?.name
          : "",
        committedDate: data[
          i
        ]?.object?.history?.nodes[0]?.committedDate?.substring(0, 10)
          ? data[i]?.object?.history?.nodes[0]?.committedDate?.substring(0, 10)
          : "",
        totalCount: data[i]?.object?.history?.totalCount
          ? data[i]?.object?.history?.totalCount
          : "",
        url: data[i].url,
      });
    }
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

// repositories {
//   totalCount
// }

// followers(first: 100) {
//   edges {
//     node {
//       login
//     }
//   }
// }

// starredRepositories {
//   totalCount
//   nodes {
//     name
//     url
//     forkCount
//     stargazerCount
//   }
// }

// user(login: "${userInput}") {
//   followers(first: 10) {
//     edges {
//       node {
//         login
//         avatarUrl
//         repositories {
//           totalCount
//         }
//         followers {
//           totalCount
//         }
//         starredRepositories {
//           totalCount
//         }
//       }
//     }
//   }
// }
