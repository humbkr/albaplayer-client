import gql from "graphql-tag";
import apolloClient from "./apollo";

const getFullTrackInfo = (trackId) => {
  const fullTrackInfoQuery = gql`
  query fullTrackInfoQuery {
    track(id: ${trackId}) {
      id
      title
      number
      duration
      src
      cover
			album {
        id
        title			
			}
			artist {
			  id
			  name
			}
    }
  }
`;

  // API call.
  return apolloClient.query({ query: fullTrackInfoQuery });
};

export {
  getFullTrackInfo
}
