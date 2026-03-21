export const GET_ALL_PROJECTS = `
  query GetAllProjects {
    projects(orderBy: displayOrder_ASC, first: 100) {
      id
      slug
      title
      subtitle
      categories
      projectLink
      projectLinkName
      tools
      mockup {
        url
      }
      images {
        url
      }
      description
      duration
      isMobile
      displayOrder
      isFeatured
    }
  }
`;

export const GET_PROJECT_BY_SLUG = `
  query GetProjectBySlug($slug: String!) {
    project(where: { slug: $slug }) {
      id
      slug
      title
      subtitle
      categories
      projectLink
      projectLinkName
      tools
      mockup {
        url
      }
      images {
        url
      }
      description
      duration
      isMobile
      displayOrder
      isFeatured
    }
  }
`;
