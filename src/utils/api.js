import axios from "axios";
import authorization from "./auth.js";

export const githubV4Api = async (userInput) => {
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

// followers {
//   totalCount
// }
// starredRepositories {
//   totalCount
// }
// repositories {
//   totalCount
// }
