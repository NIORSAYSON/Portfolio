export const GET_ALL_EXPERIENCES = `
  query GetAllExperiences {
    experiences(orderBy: createdAt_ASC, first: 100) {
      id
      title
      subtitle
      date
      description
      logo {
        url
      }
      type
      gwa
      isCollege
      competitons {
        name
        detail
      }
    }
  }
`;
