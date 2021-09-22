import axios from "axios";
import authorization from "./auth.js";

export const githubV4Api = (userInput) => {
  return axios({
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
                            history {
                              totalCount
                            }
                          }
                        }

                      }
                      
                    }

                  }
                }
              `,
    }),
  });
};
